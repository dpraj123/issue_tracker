"use client";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}
const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(itemCount / pageSize);

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };
  if (pageCount <= 1) return null;
  return (
    <Flex className=" items-center justify-center gap-2">
      <Text className=" font-semibold">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <RxDoubleArrowLeft />
      </Button>
      <Button
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <BiChevronLeft />
      </Button>
      <Button
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <BiChevronRight />
      </Button>
      <Button
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <RxDoubleArrowRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
