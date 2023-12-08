"use client";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import CustomButton from "../Custom/CustomButton";
import { Formik } from "formik";
import { deleteTeamSchema } from "@/lib/utils/validationSchemas";
import { useRouter } from "next/navigation";
import { customFetch } from "@/lib/utils/api-call";

const DeleteAction = ({ teamName = "", _id = "" }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();

  const onsubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    await customFetch(`/teams/${_id}`, "DELETE");
    setSubmitting(false);
    router.refresh();
    setShow(false);
  };
  return (
    <>
      <MdDelete role="button" size={23} onClick={handleShow} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Team</Modal.Title>
        </Modal.Header>
        <Formik
          validationSchema={deleteTeamSchema}
          onSubmit={onsubmit}
          initialValues={{ team: "" }}
        >
          {({ handleSubmit, values, handleChange, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                Type &ldquo;{teamName}&ldquo; to delete the Team
                <Form.Control
                  className="mt-3"
                  name="team"
                  onChange={handleChange}
                  autoComplete="off"
                  value={values.team}
                  autoFocus
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <CustomButton
                  variant="danger"
                  type="submit"
                  loading={isSubmitting}
                  disabled={teamName != values.team}
                >
                  Delete
                </CustomButton>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default DeleteAction;
