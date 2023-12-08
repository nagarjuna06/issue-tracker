import { Schema, model, models } from "mongoose";

const userSchema = Schema({}, { timestamps: true });

export default models.User || model("User", userSchema);
