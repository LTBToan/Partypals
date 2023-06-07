module.exports = {
  put: {
    tags: ["Order"],
    summary: "update information of order",
    parameters: [
      {
        in: "path",
        name: "orderID",
        description: "orderID",
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
                  status: {
                    type: "string",
                  },
                  shippingAddress: {
                    type: "string",
                  },
                  total: {
                    type: "string",
                  },
                  date: {
                    type: "string",
                    format: "date-time",
                    description: "Date of the order in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)",
                  },
                  deposit: {
                    type: "string",
                  },
                  image: {
                    type: "string",
                  },
                }
              },
            },
          },
          example: {
            order: {
              _id: "id",
              status: "Active",
              shippingAddress: "address",
              total: "10000",
              date: "2023-10-13T00:00:00.000Z",
              deposit: "20%",
              image: "image.jpg",
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