module.exports = {
    get: {
      tags: ["Contact"],
      summary: "get Contact",
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