import mongoose from "mongoose";

import { UserModel } from "./schemaModel/schemaModel.js";

const collectionName = "RegistryUser";

const { Schema } = mongoose;
const userSchema = new Schema(UserModel());

const RegistryUser = mongoose.model(collectionName, userSchema);

export default RegistryUser;
