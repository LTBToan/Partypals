module.exports = {
    post: {
      tags: ["Category"],
      summary: "create Category",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                category: {
                  type: "object",
                  properties: {
                    categoryName: {
                      type: "string",
                    },
                  },
                },
              },
            },
            example: {
              category: {
                categoryName: "New Product",
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