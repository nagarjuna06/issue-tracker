import { getTabData, getTeamData } from "@/lib/utils/teamMethods";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "@/components/team/Sidebar";
import TeamMembers from "@/components/team/TeamMembers";
import TeamHome from "@/components/team/TeamHome";
import TeamIssues from "@/components/team/TeamIssues";
import SidePopup from "@/components/popups/SidePopup";
import { tabsList } from "@/lib/utils/tabs";
import ApiIntegration from "@/components/team/ApiIntegration";
import teamModel from "@/lib/models/teamModel";

const TeamPage = async ({ params, searchParams }) => {
  const session = await getServerSession();
  const { teamId, teamType, tab } = params;

  const team = await getTeamData(teamType, teamId, session.user.email);

  const data = await getTabData(params, searchParams, session.user.email);

  const renderTab = () => {
    switch (tab) {
      case tabsList.HOME:
        return (
          <TeamHome
            params={params}
            bg={team.bg}
            stats={data.stats}
            latestIssues={data.latestIssues}
          />
        );

      case tabsList.ISSUES:
        return (
          <TeamIssues
            params={params}
            searchParams={searchParams}
            bg={team.bg}
            teamOwner={team.owner}
            data={data}
          />
        );

      case tabsList.CREATED_ISSUES:
        return (
          <TeamIssues
            params={params}
            searchParams={searchParams}
            bg={team.bg}
            teamOwner={team.owner}
            data={data}
            type="created-issues"
          />
        );

      case tabsList.ASSIGNED_ISSUES:
        return (
          <TeamIssues
            params={params}
            searchParams={searchParams}
            bg={team.bg}
            teamOwner={team.owner}
            data={data}
            type={tabsList.ASSIGNED_ISSUES}
          />
        );

      case tabsList.REVIEW_ISSUES:
        return (
          <TeamIssues
            params={params}
            searchParams={searchParams}
            bg={team.bg}
            teamOwner={team.owner}
            data={data}
            type={tabsList.REVIEW_ISSUES}
          />
        );
      case tabsList.MEMBERS:
        return (
          <TeamMembers
            userEmail={session.user.email}
            params={params}
            bg={team.bg}
            members={data.members}
          />
        );

      case tabsList.API_INTEGRATION:
        return (
          <ApiIntegration
            searchParams={searchParams}
            bg={team.bg}
            data={data}
          />
        );

      default:
        return notFound();
    }
  };
  if (data && team) {
    return (
      <Container fluid>
        <Row>
          <Sidebar bg={team.bg} />
          <Col lg={9} sm={12}>
            <h3 className="py-2">
              <SidePopup bg={team.bg} active={tab} teamType={teamType} />
              <span>{team.title} Team</span>
            </h3>
            {renderTab()}
          </Col>
        </Row>
      </Container>
    );
  }
  return notFound();
};

export const generateMetadata = async ({ params: { teamId } }) => {
  const team = await teamModel.findOne(
    { _id: teamId },
    { title: 1, description: 1 }
  );
  if (team) {
    return {
      title: team.title,
      description: team.description,
    };
  }
};

export default TeamPage;
