module.exports = {
  post: {
    tags: ["variation"],
    summary: "create variation",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              variation: {
                type: "object",
                properties: {
                  image: {
                    type: "string",
                  },
                  color: {
                    type: "string",
                  },
                  stock: {
                    type: "number",
                  },
                  productID: {
                    type: "string",
                    format: "objectId",
                  },
                },
              },
            },
          },
          example: {
            variation: {
              image: "imageurl",
              color: "red",
              stock: 10,
              productID: "productid",
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