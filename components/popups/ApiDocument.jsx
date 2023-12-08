"use client";

import { Modal, Card } from "react-bootstrap";
import CustomButton from "../Custom/CustomButton";
import { useEffect, useState } from "react";
import { CgFileDocument } from "react-icons/cg";

const ApiDocument = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.origin);
  }, []);

  return (
    <>
      <CustomButton variant="outline" className="border" onClick={handleShow}>
        <CgFileDocument />
        Documentation
      </CustomButton>
      <Modal fullscreen show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Api Documentation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Simple Integration</h5>
          <p>
            Issue Tracker provides api to integrate in your application the
            issues will be created by the anonymous users report in your
            application.
          </p>

          <b>Location:</b>
          <p>
            The API is available at <b>{url}/api/issue</b> Responses are sent as
            JSON.
          </p>

          <b>HTTP Method:</b>
          <p>POST - Creating a Issue</p>

          <b>Authorization</b>
          <p>Api-Key: &#34;API-KEY&#34;</p>
          <br />
          <b>Request:</b>
          <br />
          <Card className="my-2">
            <code style={{ fontSize: 18 }}>
              <pre>
                {`
    const data ={
        title:"Issue Title",
        description:"issue description",
        email:"example@email.com"
    }

    const response = await fetch('${url}/api/issue',{
        method:"POST",
        headers:{
            "Api-Key":"API-KEY",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    const data = await response.json();
    console.log(data);
        `}
              </pre>
            </code>
          </Card>
          <b>Response:</b>
          <Card className="my-2">
            <code style={{ fontSize: 18 }}>
              <pre>
                {`
    {
        "_id":"Issue_id",
        "title":"issue title",
        "description":"issue description",
        "email":"example@email.com",
        "createdAt":"time",
        "updatedAt":"time"
    }
        `}
              </pre>
            </code>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ApiDocument;
