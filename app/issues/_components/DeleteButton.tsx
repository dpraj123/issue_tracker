"use client";

import React, { useState } from "react";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Spinner } from "@/app/components";
const DeleteButton = ({ issueId }: { issueId: number }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const deleteIssue = async () => {
    try {
      setIsDeleting(true);
      if (issueId) {
        await axios.delete("/api/issues/" + issueId);
        router.push("/issues");
        router.refresh();
      }
    } catch (error) {
      console.error("Something Went Wrong: ", error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" disabled={isDeleting}>
          <MdDelete size={18} />
          Delete Issue {isDeleting && <Spinner />}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Delete This Issue</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? This Issue will no longer be accessible and any existing
          Data will be cleared.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={deleteIssue}>
              Confirm
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteButton;
