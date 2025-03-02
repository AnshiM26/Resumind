"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import JobCards from "@/components/JobCards";
import { EmptyState } from "@/components/EmptyState";

interface Job {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo: string | null;
  employer_website: string;
  job_apply_link: string;
  job_posted_at: string;
  job_city: string;
  job_country: string;
}

export default function JobSearch() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);

  async function getResponse() {
    try {
      const res = await fetch(
        `/api/generate/jobs?title=${jobTitle}&location=${location}`,
        {
          method: "GET",
        },
      );
      const data = await res.json();
      console.log("This is data:", data);
      if (data.error) {
        console.log("Error fetching jobs:", data.error);
      } else {
        setJobs(data.jobs);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="mt-6 w-full max-w-3xl">
        <h1 className="rounded-lg py-4 text-center text-3xl font-bold">
          Job Alerts
        </h1>
      </div>

      <div className="mt-5 flex flex-row gap-6">
        <Input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button
          onClick={getResponse}
          className="rounded-lg bg-blue-500 px-6 py-3 transition hover:bg-blue-600"
        >
          <Search />
        </Button>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.length > 0 ? (
          jobs.map((job: Job) => (
            <JobCards
              key={job.job_id}
              CompanyName={job.employer_name || "Unknown"}
              CompanyWebsite={job.employer_website || "#"}
              ApplyLink={job.job_apply_link || "#"}
              PostedAt={job.job_posted_at || "N/A"}
              city={job.job_city || "N/A"}
              country={job.job_country || "N/A"}
            />
          ))
        ) : (
          <div className="col-span-full flex h-96 items-center justify-center">
            <EmptyState
              title="No jobs found"
              description="Enter the appropriate job title and location to get started"
            />
          </div>
        )}
      </div>
    </div>
  );
}
