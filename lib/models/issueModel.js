import { Schema, model, models } from "mongoose";

const issueSchema = Schema(
  {},
  {
    timestamps: true,
  }
);

export default models.Issue || model("Issue", issueSchema);
