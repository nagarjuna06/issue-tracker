"use client";
import { Modal } from "react-bootstrap";
import { MdDeleteOutline } from "react-icons/md";
import CustomButton from "../Custom/CustomButton";
import { useState } from "react";
import { customFetch } from "@/lib/utils/api-call";
import { useParams, useRouter } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";
import { issueStates } from "@/lib/utils/tabs";

const ConfirmDelete = ({ email = "", type = "", status = "", apiKey = "" }) => {
  const types = { ISSUE: "issue", API_KEY: "api-key" };
  const { teamId, issueId } = useParams();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  const handleDelete = async () => {
    setLoading(true);
    let response;
    switch (type) {
      case types.ISSUE:
        response = await customFetch(
          `/teams/${teamId}/issue/${issueId}`,
          "DELETE"
        );
        break;
      case types.API_KEY:
        response = await customFetch(`/teams/${teamId}/api-key`, "DELETE", {
          apiKey,
        });
        break;
      default:
        response = await customFetch(`/teams/${teamId}/invite`, "DELETE", {
          email,
        });
    }

    setLoading(false);
    if (response.status == 200) {
      setShow(false);
      if (type == types.ISSUE) {
        router.push(`/teams/${teamId}/issues`);
      }
      router.refresh();
    }
  };
  const renderDeleteType = () => {
    switch (type) {
      case types.ISSUE:
        return "issue";
      case types.API_KEY:
        return "api key";
      default:
        return "Member";
    }
  };
  if (status === issueStates.INPROGRESS || status === issueStates.REVIEW) {
    return null;
  }
  return (
    <>
      {(email || type == types.API_KEY) && (
        <MdDeleteOutline role="button" size={22} onClick={handleShow} />
      )}
      {type == types.ISSUE && (
        <CustomButton variant="danger" onClick={handleShow}>
          <FaRegTrashAlt /> Delete Issue
        </CustomButton>
      )}
      <Modal onHide={handleClose} show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this {renderDeleteType()}?
          <b>{email}</b>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton variant="secondary" onClick={handleClose}>
            Close
          </CustomButton>
          <CustomButton
            variant="danger"
            loading={loading}
            onClick={handleDelete}
          >
            Delete
          </CustomButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmDelete;
