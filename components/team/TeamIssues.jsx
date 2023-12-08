import { Container, Table, Badge } from "react-bootstrap";
import IssueForm from "../popups/IssueForm";
import { timeFormat } from "@/lib/utils/timeFormat";
import { bgForIssue, columns, tabsList, teamTypes } from "@/lib/utils/tabs";
import FilterIssuesStatus from "./FilterIssues";
import { BsArrowUp } from "react-icons/bs";
import IssuesPagination from "./IssuesPagination";
import Link from "next/link";
import BugImage from "../empty/BugImage";
import { getServerSession } from "next-auth";
import { isCurrentSearch, setSearchParams } from "@/lib/utils/utils";

const TeamIssues = async ({
  searchParams,
  params,
  bg,
  data = { issues: [], issueCount: 0, page: 1 },
  teamOwner,
  type = tabsList.ISSUES,
}) => {
  const session = await getServerSession();
  const { teamId, teamType } = params;
  const getCreatedBy = (anonymous = false, id = "", email = "") => {
    if (anonymous) {
      return "Anonymous";
    } else if (
      (params.teamType === teamTypes.TEAMS && id == teamOwner) ||
      (params.teamType === teamTypes.JOINED_TEAMS &&
        email == session.user.email)
    ) {
      return "You";
    } else if (params.teamType === teamTypes.JOINED_TEAMS && id == teamOwner) {
      return "Admin";
    } else {
      return "Team Member";
    }
  };

  return (
    <Container fluid>
      {type === tabsList.ISSUES && (
        <Container className="d-flex justify-content-between">
          <FilterIssuesStatus />
          <IssueForm bg={bg} />
        </Container>
      )}
      {data.issues.length ? (
        <Table className="mt-2 text-nowrap" hover responsive>
          <thead>
            <tr>
              {columns.map((item, index) => (
                <th key={index}>
                  <Link
                    href={{
                      query: setSearchParams(searchParams, item.value),
                    }}
                  >
                    {item.label}
                    {isCurrentSearch(searchParams, item.value) && <BsArrowUp />}
                  </Link>
                </th>
              ))}
              {type != tabsList.CREATED_ISSUES && <th>Created By</th>}
            </tr>
          </thead>
          <tbody>
            {data.issues.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link href={`/${teamType}/${teamId}/issues/${item._id}`}>
                    {item.title}
                  </Link>
                </td>
                <td>
                  <Badge pill bg={bgForIssue(item.status)}>
                    {item.status}
                  </Badge>
                </td>
                <td>{timeFormat(item.createdAt)}</td>
                {type != tabsList.CREATED_ISSUES && (
                  <td>
                    {getCreatedBy(item.anonymous, item.createdBy, item.email)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <BugImage caption="No Issues" height={75} />
      )}
      <IssuesPagination issueCount={data.issueCount} currentPage={data.page} />
    </Container>
  );
};

export default TeamIssues;
