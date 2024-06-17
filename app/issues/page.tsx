import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusBadge from "../components/IssueStatusBadge";

const IssuesPage = async () => {
  const issueList = await prisma.issue.findMany();
  return (
    <div className="p-5 space-y-4 mx-auto">
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issueList?.map((issue) => (
            <Table.Row key={issue?.id}>
              <Table.RowHeaderCell>
                {issue?.title}{" "}
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue?.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue?.status} />
              </Table.Cell>
              <Table.Cell>{issue?.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
