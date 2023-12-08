"use client";
import { teamSchema } from "@/lib/utils/validationSchemas";
import { customFetch } from "@/lib/utils/api-call";
import { Formik } from "formik";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdEdit, MdOutlinePeople } from "react-icons/md";
import CustomButton from "../Custom/CustomButton";
import { useRouter } from "next/navigation";

const TeamForm = ({
  type = "new",
  initialValues = { title: "", description: "", bg: "#FFA500" },
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();

  const submitting = async (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);

    if (type == "new") {
      const response = await customFetch("/teams", "POST", values);
      if (response.status == 201) {
        router.refresh();
        setShow(false);
      } else if (response.status == 409) {
        setSubmitting(false);
        setErrors(response.data);
      }
    } else {
      const response = await customFetch(
        `/teams/${initialValues._id}`,
        "PUT",
        values
      );
      if (response.status == 200) {
        router.refresh();
        setShow(false);
      } else if (response.status == 409) {
        setSubmitting(false);
        setErrors(response.data);
      }
    }
  };

  return (
    <>
      {type == "new" ? (
        <CustomButton variant="primary" onClick={handleShow}>
          <MdOutlinePeople size={20} /> New
        </CustomButton>
      ) : (
        <MdEdit role="button" size={23} onClick={handleShow} />
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {type == "new" ? "Create a Team" : "Update a Team"}
          </Modal.Title>
        </Modal.Header>
        <Formik
          validationSchema={teamSchema}
          initialValues={initialValues}
          onSubmit={submitting}
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
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={values.title}
                    placeholder="Enter the Team Name"
                    onChange={handleChange}
                    isInvalid={!!errors.title}
                    isValid={touched.title && !errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Select the Background Color</Form.Label>
                  <Form.Control
                    name="bg"
                    value={values.bg}
                    type="color"
                    title="choose your color"
                    onChange={handleChange}
                    isInvalid={!!errors.bg}
                    isValid={touched.bg && !errors.bg}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    value={values.description}
                    name="description"
                    as="textarea"
                    rows={4}
                    placeholder="Enter Description(Optional)"
                    onChange={handleChange}
                    isInvalid={!!errors.description}
                    isValid={touched.description && !errors.description}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>

                <CustomButton
                  loading={isSubmitting}
                  type="submit"
                  variant="primary"
                >
                  {type == "new" ? "Create" : "Update"}
                </CustomButton>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default TeamForm;
