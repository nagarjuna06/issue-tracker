"use client";
import { useState } from "react";
import { Button, Stack, Form, Modal } from "react-bootstrap";
import { MdPersonAdd } from "react-icons/md";
import CustomButton from "../Custom/CustomButton";
import { Formik } from "formik";
import { inviteSchema } from "@/lib/utils/validationSchemas";
import { customFetch } from "@/lib/utils/api-call";
import { useParams, useRouter } from "next/navigation";

const InviteForm = ({ bg = "" }) => {
  const { teamId } = useParams();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const submitting = async (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);
    const response = await customFetch(
      `/teams/${teamId}/invite`,
      "POST",
      values
    );
    if (response.status == 200) {
      router.refresh();
      setShow(false);
    } else if (response.status == 409) {
      setErrors(response.data);
    }
  };
  return (
    <>
      <Stack direction="horizontal">
        <CustomButton bg={bg} onClick={handleShow} className="ms-auto">
          <MdPersonAdd size={20} /> Invite
        </CustomButton>
      </Stack>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Invite a Member</Modal.Title>
        </Modal.Header>
        <Formik
          onSubmit={submitting}
          validationSchema={inviteSchema}
          initialValues={{ email: "" }}
        >
          {({
            handleSubmit,
            isSubmitting,
            handleChange,
            values,
            errors,
            touched,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Enter  user email address"
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    isValid={touched.email && !errors.email}
                    value={values.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <CustomButton
                  bg={bg}
                  type="submit"
                  style={{ width: "5rem" }}
                  loading={isSubmitting}
                >
                  Invite
                </CustomButton>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default InviteForm;
