module.exports = {
  get: {
    tags: ["Calendar"],
    summary: "get Calendar",
    parameters: [
      {
        in: "path",
        name: "userId",
        security: [{ BearerAuth: [] }],
        description: "User ID",
        schema: {
          type: "string",
          format: "ObjectId",
        },
      },
    ],
    responses: {
      200: {
        description: "Success",
      },
    },
    description: "Requires authentication with a bearer token.",
  },
};
