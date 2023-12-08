import { bgForIssue } from "@/lib/utils/tabs";
import { timeFormat } from "@/lib/utils/timeFormat";
import { Badge, Card, Stack } from "react-bootstrap";
import ReactMarkDown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import { BsIncognito } from "react-icons/bs";
import moment from "moment";
import CustomTooltip from "../Custom/CustomTooltip";

const IssueDetails = ({ data, isOwner }) => {
  const toolTipData = {
    email: data.email,
    name: data.createdBy?.name,
    isOwner: data.email === data.team.owner.email,
    origin: data?.domain?.origin,
    title: data?.domain?.title,
  };
  return (
    <Stack gap={4} className="mt-3">
      <Stack>
        <Stack direction="horizontal">
          <h4>
            <b>{data.title}</b>
          </h4>
          <CustomTooltip data={toolTipData}>
            {data.createdBy ? (
              <Image
                alt="pic"
                width={35}
                height={35}
                className="rounded-circle ms-auto me-1"
                src={data.createdBy.image}
              />
            ) : (
              <BsIncognito size={24} className="ms-auto me-2" />
            )}
          </CustomTooltip>
        </Stack>
        <Stack direction="horizontal" gap={2}>
          <Badge pill bg={bgForIssue(data.status)}>
            {data.status}
          </Badge>{" "}
          <span className="small d-flex flex-row gap-1 flex-wrap">
            <span>{timeFormat(data.createdAt)} </span>
            <Link
              href={`/${isOwner ? "teams" : "joined-teams"}/${
                data.team._id
              }/issues`}
              className="text-primary"
            >
              ({data.team.title} Team)
            </Link>
          </span>
        </Stack>
      </Stack>
      <Card className="px-3 py-2 mb-5">
        <ReactMarkDown>{data.description}</ReactMarkDown>
        <small className="text-secondary ms-auto">
          last updated: {moment(data.updatedAt).fromNow()}
        </small>
      </Card>
    </Stack>
  );
};

export default IssueDetails;
