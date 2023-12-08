import { getServerSession } from "next-auth";
import getTeamsData from "@/lib/utils/teamsMethods";
import { Container } from "react-bootstrap";
import { notFound } from "next/navigation";
import BugImage from "@/components/empty/BugImage";
import TeamListItem from "@/components/teams/teamListItem";
import TeamForm from "@/components/popups/teamForm";
import { teamTypes } from "@/lib/utils/tabs";

const TeamsPage = async ({ params: { teamType } }) => {
  const session = await getServerSession();
  const teams = await getTeamsData(teamType, session.user.email);
  if (teams) {
    return (
      <Container className="mt-2">
        <Container className="d-flex justify-content-between align-items-center">
          <h3>{teamType == "teams" ? "Teams" : "Joined Teams"}</h3>
          {teamType == "teams" && <TeamForm type="new" />}
        </Container>
        {teams.length ? (
          <Container className="d-flex gap-4 flex-wrap mt-4 justify-content-center justify-content-lg-start">
            {teams.map((item, index) => (
              <TeamListItem teamType={teamType} key={index} team={item} />
            ))}
          </Container>
        ) : (
          <BugImage
            caption={
              teamType == "teams"
                ? "You have not created any teams yet.Start by Creating one"
                : "You join through invitations of your team Admin"
            }
          />
        )}
      </Container>
    );
  }
  return notFound();
};
export const generateMetadata = ({ params: { teamType } }) => {
  const type = teamType == teamTypes.TEAMS ? "Teams" : "Joined Teams";
  return {
    title: type,
  };
};

export default TeamsPage;
