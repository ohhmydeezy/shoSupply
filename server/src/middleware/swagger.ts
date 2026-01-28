import { swaggerUI } from "@hono/swagger-ui";
import { Hono } from "hono";

export const swaggerSetup = (app: Hono) => {
  // A basic OpenAPI document
  const openApiDoc = {
    openapi: "3.0.0", // This is the required version field
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for your service",
    },
    paths: {
      // Add your API paths here
      "/teachers": {
        get: {
          summary: "Teachers List",
          responses: {
            "200": {
              description: "OK",
            },
          },
        },
      },
      // Add more endpoints as needed
    },
  };

  // Serve the OpenAPI document
  app.get("/doc", (c) => c.json(openApiDoc));

  // Use the middleware to serve Swagger UI at /ui
  app.get("/ui", swaggerUI({ url: "/doc" }));
}