module.exports = {
  post: {
    tags: ["Auth"],
    requestBody: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                example: "TrinhBinhMinh",
              },
              username: {
                type: "string",
                example: "dragoncute",
              },
              email: {
                type: "string",
                example: "dragoncute@gmail.com",
              },
              password: {
                type: "string",
                example: "Dragoncute!123",
              },
              phone: {
                type: "string",
                example: "0123456789",
              },
              image: {
                type: "string",
                format: "binary",
              },
              tax: {
                type: "string",
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