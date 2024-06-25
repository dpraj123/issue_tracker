"use client";
import { Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";
const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
  });
  if (error) return null;
  return (
    <Select.Root
      defaultValue={issue?.assignedToUserId || ""}
      size="2"
      onValueChange={(userId) => {
        axios.patch("/api/issues/" + issue.id, {
          assignedToUserId: userId,
        });
      }}
    >
      <Select.Trigger placeholder="Assignee Issue" />
      <Select.Content>
        {users?.map((user) => (
          <Select.Item key={user?.id} value={`${user?.id}`}>
            {user?.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
