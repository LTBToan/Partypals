module.exports = {
    get: {
      tags: ["Category"],
      summary: "Return Category by id",
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
      responses: {
        200: {
          description: "Success",
        },
      },
    },
  };