import { Schema, model, models } from "mongoose";
const { ObjectId } = Schema;

const teamSchema = Schema({}, { timestamps: true });

export default models.Team || model("Team", teamSchema);
