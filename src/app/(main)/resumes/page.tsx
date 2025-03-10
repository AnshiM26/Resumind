import { PlusSquare } from "lucide-react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import ResumeItem from "./ResumeItem";
import { EmptyState } from "@/components/EmptyState";

export const metadata: Metadata = {
  title: "Your resumes",
};
export default async function Page() {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }
  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDataInclude,
    }),
    prisma.resume.count({
      where: {
        userId,
      },
    }),
  ]);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/editor">
          <PlusSquare className="size-5" />
          New Resume
        </Link>
      </Button>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Your resumes</h1>
      </div>
      {totalCount > 0 ? (
        <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
          {resumes.map((resume) => (
            <ResumeItem key={resume.id} resume={resume} />
          ))}
        </div>
      ) : (
        <div className="col-span-full flex h-96 items-center justify-center">
          <EmptyState
            title="No Resumes found"
            description="Please create a resume to view"
          />
        </div>
      )}
    </main>
  );
}
