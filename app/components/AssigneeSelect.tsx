"use client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";
const AssigneeSelect = () => {
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
    <Select.Root size="2">
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
