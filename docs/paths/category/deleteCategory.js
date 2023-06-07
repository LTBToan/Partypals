module.exports = {
    delete: {
      tags: ["Category"],
      summary: "delete Category",
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