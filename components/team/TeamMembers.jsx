import { Container, Table, Badge } from "react-bootstrap";
import InviteForm from "../popups/InviteForm";
import ConfirmDelete from "../popups/confirmDelete";
import BugImage from "../empty/BugImage";
import { timeFormat } from "@/lib/utils/timeFormat";
import Image from "next/image";
import { teamTypes } from "@/lib/utils/tabs";

const TeamMembers = ({ params, bg = "", members = [], userEmail = "" }) => {
  const { teamType } = params;
  return (
    <Container>
      {teamType == teamTypes.TEAMS && <InviteForm bg={bg} />}
      {members.length ? (
        <Table responsive className="text-nowrap mt-2 text-sm-md" hover>
          <thead>
            <tr>
              <th>Display Name</th>
              <th>Email</th>
              {teamType == teamTypes.TEAMS && (
                <>
                  <th>Created</th>
                  <th>Last Login</th>
                </>
              )}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {members.map((row, index) => (
              <tr key={index} className="p-1">
                <td>
                  {row.status == "ACCEPTED" ? (
                    <>
                      <Image
                        alt="member"
                        src={row.user.image}
                        width={30}
                        height={30}
                        className="rounded-circle me-1"
                      />
                      <span>{row.user.name}</span>
                    </>
                  ) : (
                    <Badge pill bg="warning">
                      PENDING INVITE
                    </Badge>
                  )}
                </td>
                <td>{row.email || "-"}</td>
                {teamType == teamTypes.TEAMS ? (
                  <>
                    <td>{timeFormat(row.created)}</td>
                    <td>{timeFormat(row.lastLogin)}</td>
                    <td>
                      <ConfirmDelete email={row.email} />
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      {index === 0 && "Admin"}
                      {row.email === userEmail ? "You" : ""}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <BugImage
          caption="Click on the invite button to invite your team members"
          height={75}
        />
      )}
    </Container>
  );
};

export default TeamMembers;
