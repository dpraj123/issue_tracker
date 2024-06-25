import { Status } from "@prisma/client";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const statuses: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex className="gap-4 flex-wrap">
      {statuses.map((item) => (
        <Card key={item.label} className="w-44 h-20 mx-auto sm:mx-0 ">
          <Flex className=" flex-col items-center">
            <Link
              className=" text-nowrap text-xl"
              href={`/issues?status=${item?.status}`}
            >
              {item?.label}
            </Link>
            <Text className=" text-xl font-semibold">{item?.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
