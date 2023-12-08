"use client";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const CustomTooltip = ({ children, data }) => {
  const customPopover = (
    <Popover>
      <Popover.Header as="h4">
        Created By:{" "}
        {data.isOwner ? "Admin" : !!data.name ? "Team Member" : "Anonymous"}
      </Popover.Header>
      <Popover.Body>
        <center>
          <b>{data?.name}</b>
          <p>{data?.email}</p>
          {data.title ? <b>Api Key: &#39;{data.title}&#39; </b> : null}
          <p>
            <i>{data.origin ? "Origin:" + data.origin : ""}</i>
          </p>
        </center>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger={["hover", "focus"]}
      placement="bottom"
      overlay={customPopover}
    >
      {children}
    </OverlayTrigger>
  );
};

export default CustomTooltip;
