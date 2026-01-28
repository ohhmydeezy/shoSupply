import { db } from "../config/db.js";
import bcrypt from "bcryptjs";
import type { UserType } from "../models/user.model.js";

export const createUser = async (userData: UserType) => {
  const newUser: any = { ...userData, createdAt: new Date() };

  if (userData.password) {
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(userData.password, salt);
  } else {
    delete newUser.password;
  }

  return await db.collection("users").insertOne(newUser);
};