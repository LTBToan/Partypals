module.exports = {
    post: {
      tags: ["Contact"],
      summary: "Post Contact",
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
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "title",
                },
                description: {
                  type: "string",
                  example: "description",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Success",
        },
      },
    },
  };
  