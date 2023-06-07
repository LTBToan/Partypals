module.exports = {
    put: {
      tags: ["Category"],
      summary: "update information of Category",
      parameters: [
        {
          in: "path",
          name: "categoryID",
          description: "categoryID",
          schema: {
            type: "String",
            format: "objectId",
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
                categoryName: "New Product updated",
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