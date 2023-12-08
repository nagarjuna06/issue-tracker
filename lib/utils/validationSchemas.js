import * as yup from "yup";

export const inviteSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid Email Address!")
    .matches("^[a-zA-Z0-9._]+@gmail.com$", "Must be a Gmail!")
    .required("Email is required!"),
});

export const teamSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is Required!")
    .max(25, "Title  cannot exceed 25 characters!"),
  bg: yup
    .string()
    .required("BG is Required!")
    .max(150, "description cannot exceed 150 characters!"),
  description: yup.string(),
});

export const issueSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is Required!")
    .max(50, "Title cannot exceed 50 characters!"),
  description: yup.string().required("Description is Required!"),
});

export const issueSchemaForApi = yup.object().shape({
  title: yup
    .string()
    .required("Title is Required!")
    .max(50, "Title cannot exceed 50 characters!")
    .trim("trim the title")
    .strict(),
  description: yup.string().required("Description is Required!"),
  email: yup.string().email().required("Email is required!"),
});

export const deleteTeamSchema = yup.object().shape({
  team: yup.string().required("Team is required!"),
});

export const apiKeySchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is Required!")
    .max(20, "Name cannot exceed 20 characters!"),
  origin: yup
    .string()
    .required("Invalid Origin: URL must not be empty!")
    .matches(
      "https?://.+",
      " Please enter a valid URL starting with http:// or https://"
    ),
});
