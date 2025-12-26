const swaggerJsdoc = require("swagger-jsdoc");
const config = require("../config/config");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mental Wellness API",
      version: "1.0.0",
      description: "API documentation for Mental Wellness app",
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api`,
      },
    ],
  },
  apis: [], // agar chaaho to JSDoc comments add karke yahan include karo
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
