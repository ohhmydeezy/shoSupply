import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { swaggerSetup } from './middleware/swagger.js';
import { db } from '../config/db.js';
import { auth } from '../utils/auth.js';
import { userSchema } from 'better-auth';
import {createUser} from '../controllers/authController.js'

const app = new Hono()

swaggerSetup(app)

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.get("/teachers", async (c) => {
  try {
    const teachers = db.collection("teachers").find().toArray()
    return c.json(teachers)
  } catch(err) {
    return c.json({err: "failed to fetch"}, 500)
  }
})



app.post("/register", async (c) => {
  const body = await c.req.json();

  const validation = userSchema.safeParse(body);
  if (!validation.success) {
    return c.json({ errors: validation.error.format() }, 400);
  }

  try {
    const result = await createUser(validation.data);
    return c.json({ message: "User created", id: result.insertedId }, 201);
  } catch (err) {
    return c.json({ error: "Email already exists" }, 409);
  }
});



serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
