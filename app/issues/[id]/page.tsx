import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import Markdown from "react-markdown";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Link from "next/link";
import DeleteButton from "../_components/DeleteButton";
import AssigneeSelect from "@/app/components/AssigneeSelect";
interface Props {
  params: { id: string };
}
const IssueDetaisPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    notFound();
  }
  return (
    <div className="p-4 space-y-4 space-x-4">
      <Heading className=" capitalize">{issue?.title}</Heading>
      <Flex gap="3" className="flex-wrap">
        <IssueStatusBadge status={issue?.status} />
        <Text>{issue?.createdAt?.toDateString()}</Text>
      </Flex>
      <Card className="prose p-4">
        <Markdown>{issue?.description}</Markdown>
      </Card>
      <AssigneeSelect />
      <Button>
        <Link
          href={`/issues/${issue?.id}/edit`}
          className="flex gap-1 flex-nowrap"
        >
          <HiOutlinePencilAlt size={18} />
          Edit Issue
        </Link>
      </Button>
      <DeleteButton issueId={issue?.id} />
    </div>
  );
};

export default IssueDetaisPage;
