import prisma from "@/prisma/client";
import { Button, Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import Link from "next/link";
import React from "react";
import IssueStatusBadge from "../components/IssueStatusBadge";
import IssueStatusFilter from "./IssueStatusFilter";
import { Issue, Status } from "@prisma/client";
import { FaArrowUp } from "react-icons/fa";
interface props {
  searchParams: { status: Status; orderBy: keyof Issue };
}
const columnHeader: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];
const IssuesPage = async ({ searchParams }: props) => {
  const status = Object.values(Status).includes(searchParams?.status)
    ? searchParams.status
    : undefined;
  const orderBy = columnHeader
    .map((header) => header.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const issueList = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy,
  });
  return (
    <div className="p-5 space-y-4 mx-auto">
      <Flex justify={"between"}>
        <IssueStatusFilter />
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </Flex>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columnHeader.map((header) => (
              <Table.ColumnHeaderCell
                key={header.label}
                className={`${header?.className}`}
              >
                <NextLink
                  href={{ query: { ...searchParams, orderBy: header.value } }}
                >
                  {header?.label}
                </NextLink>
                {header.value === searchParams.orderBy && <FaArrowUp />}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issueList?.map((issue) => (
            <Table.Row key={issue?.id}>
              <Table.RowHeaderCell>
                <Link
                  href={`/issues/${issue?.id}`}
                  className=" hover:text-blue-500 hover:underline capitalize"
                >
                  {issue?.title}
                </Link>
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
