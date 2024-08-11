import mongoose from "mongoose";

import { UserModel } from "./schemaModel/schemaModel.js";

const { Schema } = mongoose;
const userSchema = new Schema(UserModel());

const User = mongoose.model("User", userSchema);

export default User;
