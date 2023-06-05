module.exports = {
    put: {
      tags: ["User"],
      parameters: [
        {
          in: "path",
          name: "userId",
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
                name: {
                  type: "string",
                  example: "dragoncute",
                },
                password: {
                  type: "string",
                  example: "Dragoncute!123",
                },
                phone: {
                  type:"string",
                  example: "0123456789"
                },
                address: {
                  type:"string",
                  example: "Hồ Chí Minh city"
                },
                image:{
                  type:"string",
                  example:"Hình ảnh"
                },
                status:{
                  type:"string",
                  example:"active or inactive"
                },
                role:{
                  type:"string",
                  example:"user,admin,company"
                }
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
  