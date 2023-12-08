"use client";
import Link from "next/link";
import { Card } from "react-bootstrap";
import { MdRemoveRedEye } from "react-icons/md";
import TeamForm from "../popups/teamForm";
import DeleteAction from "../popups/deleteAction";
import moment from "moment";

const TeamListItem = ({ team, teamType }) => {
  const {
    title = "",
    description = "",
    updatedAt = "",
    _id = "",
    bg = "",
  } = team;
  return (
    <Card style={{ width: "18rem", height: "15rem", backgroundColor: bg }}>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description ? description : "no content"}</Card.Text>
        </div>
        <div className="d-flex justify-content-between mt-1">
          <p className="small">{moment(updatedAt).fromNow()}</p>
          <div className="d-flex gap-3">
            <Link href={`${teamType}/${_id}/home`}>
              <MdRemoveRedEye role="button" size={23} />
            </Link>
            {teamType == "teams" ? (
              <>
                <TeamForm
                  type="update"
                  initialValues={{ title, description, _id, bg }}
                />
                <DeleteAction _id={_id} teamName={title} />
              </>
            ) : null}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TeamListItem;
