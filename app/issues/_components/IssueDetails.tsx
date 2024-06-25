import React from "react";
import { Flex, Heading, Text, Card, Button } from "@radix-ui/themes";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Link from "next/link";
import Markdown from "react-markdown";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import AssigneeSelect from "../_components/AssigneeSelect";
import DeleteButton from "../_components/DeleteButton";
import { Issue } from "@prisma/client";

interface IssueDetailsProps {
  issue: Issue;
}
const IssueDetails = ({ issue }: IssueDetailsProps) => {
  return (
    <div className="p-4 space-y-4 space-x-4">
      <Heading className="capitalize">{issue.title}</Heading>
      <Flex gap="3" className="flex-wrap">
        <IssueStatusBadge status={issue.status} />
        <Text>{new Date(issue.createdAt).toDateString()}</Text>
      </Flex>
      <Card className="prose p-4">
        <Markdown>{issue.description}</Markdown>
      </Card>
      <AssigneeSelect issue={issue} />
      <Button asChild>
        <Link
          href={`/issues/${issue.id}/edit`}
          className="flex gap-1 flex-nowrap"
        >
          <HiOutlinePencilAlt size={18} />
          Edit Issue
        </Link>
      </Button>
      <DeleteButton issueId={issue.id} />
    </div>
  );
};

export default IssueDetails;
