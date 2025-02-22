import {
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";

export async function generateSummary(input: GenerateSummaryInput) {
  //TODO: block for non-premium users

  const { jobTitle, workExperiences, skills } =
    generateSummarySchema.parse(input);

  const prompt = `You are a job resume generator AI. Your task is to write a professional introduction summary for a resume. You are provided with some information about the user. Only return the summary without any extra explanations.

    Given data:
    Job title: ${jobTitle || "N/A"}

    Work experience:
    ${workExperiences
      ?.map(
        (exp) => `
        Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}

        Description: ${exp.description || "N/A"}
        `,
      )
      .join("\n\n")}

    skills:${skills}
    `;

  const response = await fetch("/api/generate/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: prompt }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate AI content");
  }

  const data = await response.json();
  return data.output;
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput,
) {
  //TODO: Block for non premium users

  const { description } = generateWorkExperienceSchema.parse(input);

  const prompt = `You are a job resume generator AI. Your response must adhere to the following structure. You can omit fields if they can't be infered from the provided data, but don't add any new ones. 
    Format to be followed:
    Job title: <job title>
    Company: <company name>
    Start date: <format: YYYY-MM-DD> (only if provided)
    End date: <format YYYY-MM-DD> (only if provided)
    Description: <an optimized description in bullet point (dont use '*' use bullets) format, might be infered from the job title>

    Provide the work experience entries (follow format above) from this description:
    ${description}
    `;
  const response = await fetch("/api/generate/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: prompt }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate AI content");
  }

  const data = await response.json();
  const workexp= data.output;
  console.log(workexp)
  return {position: workexp.match(/Job title: (.*)/)?.[1] || "",
    company: workexp.match(/Company: (.*)/)?.[1] || "",
    description: (workexp.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
    startDate: workexp.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: workexp.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1], } satisfies WorkExperience
}
