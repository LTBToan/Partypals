module.exports = {
    get: {
      tags: ["variation"],
      summary: "Return variation by id",
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
      responses: {
        200: {
          description: "Success",
        },
      },
    },
  };