"use client";
import { Formik } from "formik";
import { Modal, Form, Stack } from "react-bootstrap";
import CustomButton from "../Custom/CustomButton";
import { useState } from "react";
import { apiKeySchema } from "@/lib/utils/validationSchemas";
import { MdEdit, MdKey, MdWarning } from "react-icons/md";
import { useParams, useRouter } from "next/navigation";
import { customFetch } from "@/lib/utils/api-call";

const ApiKeyForm = ({
  type = "new",
  initialValues = { title: "", origin: "" },
  bg,
  apiKey = "",
}) => {
  const { teamId } = useParams();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const submitting = async (values, { setSubmitting }) => {
    setSubmitting(true);
    let method = "POST";
    if (type != "new") {
      values.apiKey = apiKey;
      method = "PUT";
    }
    const response = await customFetch(
      `/teams/${teamId}/api-key`,
      method,
      values
    );
    if (response.status == 200 || response.status == 201) {
      setSubmitting(false);
      setShow(false);
      router.refresh();
    }
  };
  return (
    <>
      {type == "new" ? (
        <CustomButton onClick={handleShow} bg={bg} className="ms-auto">
          <MdKey />
          New
        </CustomButton>
      ) : (
        <MdEdit size={20} onClick={handleShow} role="button" />
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {type == "new" ? "Create" : "Update"} a Api Key
          </Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={apiKeySchema}
          onSubmit={submitting}
        >
          {({
            handleSubmit,
            handleChange,
            isSubmitting,
            values,
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Modal.Body>
                <Stack gap={3}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      value={values.title}
                      name="title"
                      placeholder="Name"
                      onChange={handleChange}
                      isInvalid={!!errors.title}
                      isValid={touched.title && !errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Authorized JavaScript Origin</Form.Label>
                    <Form.Control
                      value={values.origin}
                      name="origin"
                      placeholder="URL"
                      onChange={handleChange}
                      isInvalid={!!errors.origin}
                      isValid={touched.origin && !errors.origin}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.origin}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Text className="text-warning">
                      <MdWarning /> Only above origin has allowed for api
                      request, remaining api tester (like postman,rest
                      client,etc,.) and other origins not allowed.
                    </Form.Text>
                  </Form.Group>
                </Stack>
              </Modal.Body>
              <Modal.Footer>
                <CustomButton variant="secondary" onClick={handleClose}>
                  Close
                </CustomButton>
                <CustomButton bg={bg} loading={isSubmitting} type="submit">
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

export default ApiKeyForm;
