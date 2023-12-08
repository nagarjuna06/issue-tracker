import { bgForIssue } from "@/lib/utils/tabs";
import { Table, Badge, Container } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import BugImage from "../empty/BugImage";
import { BsIncognito } from "react-icons/bs";
const LatestIssues = ({ data, params }) => {
  const { teamId, teamType } = params;
  return (
    <Container className="p-3 rounded border" fluid>
      <h5>
        <b>Latest Issues</b>
      </h5>
      <Table responsive hover>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="">
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
              <td>
                {item.createdBy ? (
                  <Image
                    width={30}
                    height={30}
                    alt="pic"
                    src={item.createdBy.image}
                    className="rounded-circle"
                  />
                ) : (
                  <BsIncognito size={23} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {data.length == 0 && <BugImage caption="no-issues" height={50} />}
    </Container>
  );
};

export default LatestIssues;
