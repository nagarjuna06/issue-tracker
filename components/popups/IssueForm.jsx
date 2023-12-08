"use client";
import { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import CustomButton from "../Custom/CustomButton";
import { AiFillBug } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { Field, Formik } from "formik";
import { issueSchema } from "@/lib/utils/validationSchemas";
import "easymde/dist/easymde.min.css";
import { customFetch } from "@/lib/utils/api-call";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const IssueForm = ({
  type = "new",
  bg,
  initialValues = { title: "", description: "" },
}) => {
  const router = useRouter();
  const { teamId, issueId } = useParams();
  const [show, setShow] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  useEffect(() => {
    setDarkMode(
      document.documentElement.getAttribute("data-bs-theme") == "dark"
    );
  }, [show]);
  const onsubmit = async (values, { setSubmitting }) => {
    let response;
    if (type === "new") {
      response = await customFetch(`/teams/${teamId}/issue`, "POST", values);
    } else {
      response = await customFetch(
        `teams/${teamId}/issue/${issueId}`,
        "PUT",
        values
      );
    }
    if (response.status == 201 || response.status == 200) {
      setShow(false);
      router.refresh();
    }
    setSubmitting(false);
  };
  return (
    <>
      {type === "new" ? (
        <CustomButton bg={bg} onClick={handleShow}>
          <AiFillBug /> New
        </CustomButton>
      ) : (
        <CustomButton bg={bg} onClick={handleShow}>
          <FaRegEdit /> Edit Issue
        </CustomButton>
      )}
      <Modal onHide={handleClose} show={show} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            {type == "new" ? "Create" : "Update"} a Issue
          </Modal.Title>
        </Modal.Header>
        <Formik
          onSubmit={onsubmit}
          validationSchema={issueSchema}
          initialValues={initialValues}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="title"
                    value={values.title}
                    placeholder="Title"
                    isInvalid={!!errors.title}
                    isValid={touched.title && !errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
                <Field name="description">
                  {({ form, field }) => (
                    <div className={darkMode ? "dark-mode" : ""}>
                      <SimpleMDE
                        value={values.description}
                        onChange={(value) =>
                          form.setFieldValue(field.name, value)
                        }
                        placeholder="Description"
                      />
                    </div>
                  )}
                </Field>
                <p className="text-danger">{errors.description}</p>
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

export default IssueForm;
