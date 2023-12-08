"use client";
import { useEffect, useState } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const CopyApiKey = ({ apiKey = "" }) => {
  const [copy, setCopy] = useState(false);
  const renderTooltip = (props) => (
    <Tooltip {...props}>
      {copy ? "Copied!" : "Click to Copy the Api Key"}
    </Tooltip>
  );
  useEffect(() => {
    if (copy) {
      navigator.clipboard.writeText(apiKey);
    }
  }, [copy]);
  const handleCopy = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };
  return (
    <OverlayTrigger placement="right" overlay={renderTooltip}>
      <span role="button" onClick={handleCopy}>
        {apiKey}
      </span>
    </OverlayTrigger>
  );
};

export default CopyApiKey;
