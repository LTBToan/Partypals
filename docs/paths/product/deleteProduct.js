module.exports = {
  delete: {
    tags: ["Product"],
    summary: "delete product",
    parameters: [
      {
        in: "path",
        name: "productID",
        description: "productID",
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
              product: {
                type: "object",
                properties: {
                  accountID: {
                    type: "string",
                    format: "objectId",
                  },
                },
              },
            },
          },
          example: {
            product: {
              accountID: "id",
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