import React from "react";
import { notFound } from "next/navigation";
import { Issue } from "@prisma/client"; // Ensure you have the type imported
import { fetchIssueById } from "@/app/utils/fetchIssue";
import IssueDetails from "../_components/IssueDetails";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue: Issue | null = await fetchIssueById(params.id);
  if (!issue) {
    notFound();
  }
  return <IssueDetails issue={issue} />;
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssueById(params.id);

  return {
    title: issue?.title || "Issue Details",
    description: issue ? `Details of issue ${issue.id}` : "Issue not found",
  };
}

export default IssueDetailsPage;
