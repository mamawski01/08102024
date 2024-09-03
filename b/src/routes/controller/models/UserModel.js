import mongoose from "mongoose";

import { UserModel } from "./schemaModel/schemaModel.js";

const { Schema } = mongoose;
const userSchema = new Schema(UserModel());

const RegistryUser = mongoose.model("RegistryUser", userSchema);

export default RegistryUser;
