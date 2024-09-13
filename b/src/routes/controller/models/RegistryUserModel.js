import mongoose from "mongoose";

import { UserModel } from "./schemaModel/schemaModel.js";

const collectionName = "RegistryUser";

const { Schema } = mongoose;
const schema = new Schema(UserModel());

const RegistryUserModel = mongoose.model(collectionName, schema);

export default RegistryUserModel;
