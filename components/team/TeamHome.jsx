import IssueChart from "../charts/IssueChart";
import { Container } from "react-bootstrap";
import LatestIssues from "./LatestIssues";

const TeamHome = ({ bg, stats, latestIssues, params }) => {
  return (
    <Container className="mt-3 d-flex flex-column flex-lg-row gap-3" fluid>
      <IssueChart bg={bg} stats={stats} />
      <LatestIssues data={latestIssues} params={params} />
    </Container>
  );
};

export default TeamHome;
