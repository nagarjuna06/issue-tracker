import Join from "@/components/joined-teams/join";
import { getJoinTeam } from "@/lib/utils/teamMethods";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const Page = async ({ params: { teamId, teamType } }) => {
  const session = await getServerSession();

  const team = await getJoinTeam(teamType, teamId, session.user.email);

  if (team) return <Join team={team} />;

  return notFound();
};

export default Page;
