import LatestIssues from "./issues/_components/LatestIssues";
import IssueSummary from "./issues/_components/IssueSummary";
import prisma from "@/prisma/client";
import IssuesBarChart from "./issues/_components/IssuesBarChart";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="2" p="5">
      <Flex direction="column" gap="2">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssuesBarChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
