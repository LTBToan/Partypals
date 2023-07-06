module.exports = {
  put: {
    tags: ["variation"],
    summary: "update variation",
    parameters: [
      {
        in: "path",
        name: "variationID",
        description: "variationID",
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
                },
              },
            },
          },
          example: {
            variation: {
              image: "imageurl",
              color: "red",
              stock: 10,
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