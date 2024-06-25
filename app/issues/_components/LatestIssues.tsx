import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Avatar, Card, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const LatestIssues = async () => {
  const latesIssues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Card className="w-full h-full ">
      <Table.Root>
        <Table.Body>
          {latesIssues?.map((issue) => (
            <Table.Row key={issue?.id}>
              <Table.Cell className="flex gap-2 justify-between h-ful">
                <Link href={`/issues/${issue.id}`}>{issue?.title}</Link>
                <IssueStatusBadge status={issue?.status} />
                <Avatar
                  size="1"
                  src={issue?.assignedToUser?.image!}
                  fallback="?"
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
