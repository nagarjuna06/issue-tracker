import { getIssueData } from "@/lib/utils/teamMethods";
import { Container, Row, Col, Stack } from "react-bootstrap";
import { notFound } from "next/navigation";
import IssueDetails from "@/components/issues/IssueDetails";
import IssueForm from "@/components/popups/IssueForm";
import ConfirmDelete from "@/components/popups/confirmDelete";
import { getServerSession } from "next-auth";
import AssignIssue, {
  AssignByTeamMember,
} from "@/components/issues/AssignIssue";
import { issueStates } from "@/lib/utils/tabs";
import issueModel from "@/lib/models/issueModel";

const IssuePage = async ({ params }) => {
  const session = await getServerSession();
  const data = await getIssueData(params);
  if (data) {
    const initialValues = {
      title: data.title,
      description: data.description,
    };
    const isOwner = data.team.owner.email === session.user.email;
    const isCreatedBy = data.email === session.user.email;

    const users = data.team?.members?.reduce((result, each) => {
      if (each.user) {
        if (each.user._id != data?.createdBy?._id) result.push(each.user);
      }
      return result;
    }, []);
    const getUser = users.find((user) => user.email == session.user.email);
    return (
      <Container>
        <Row>
          <Col lg={10}>
            <IssueDetails data={data} isOwner={isOwner} />
          </Col>
          <Col lg={2} className="mt-lg-5">
            <Stack gap={3} className="mt-lg-5">
              {isOwner ? (
                <AssignIssue
                  users={users}
                  active={data.assignedUser}
                  status={data.status}
                />
              ) : (
                <AssignByTeamMember
                  active={data.assignedUser}
                  you={getUser}
                  email={data.email}
                  status={data.status}
                />
              )}
              {(isOwner || isCreatedBy) && data.status != issueStates.CLOSED ? (
                <>
                  <IssueForm
                    type="edit"
                    bg={data.team.bg}
                    initialValues={initialValues}
                  />
                </>
              ) : null}
              {isOwner && <ConfirmDelete type="issue" status={data.status} />}
            </Stack>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return notFound();
  }
};

export const generateMetadata = async ({ params: { issueId } }) => {
  const issue = await issueModel.findOne({ _id: issueId }, { title: 1 });
  if (issue) {
    return {
      title: issue.title,
      description: "Details of issue " + issueId,
    };
  }
};

export default IssuePage;
