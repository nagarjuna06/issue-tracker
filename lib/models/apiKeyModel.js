import { Schema, model, models } from "mongoose";

const apiKeySchema = Schema({}, { timestamps: true });

export default models.ApiKey || model("ApiKey", apiKeySchema);
