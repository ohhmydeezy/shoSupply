import type { ObjectId } from "mongodb"
import { z } from "zod"


const UserSchema = z.object({
    name: z.string().min(2),
    email: z.string(),
    password: z.string().min(6)
})

export type UserType = {
  id?: string;
  name: string;
  email: string;
  password?: string; 
  emailVerified?: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
};