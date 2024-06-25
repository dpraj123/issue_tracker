import prisma from "@/prisma/client";

export const fetchIssueById = async (id: string) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  return issue;
};
