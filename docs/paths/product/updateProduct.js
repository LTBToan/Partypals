module.exports = {
  put: {
    tags: ["Product"],
    summary: "update information of product",
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
                  productName: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                  },
                  quantity: {
                    type: "string",
                  },
                  image: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  price: {
                    type: "string",
                  },
                  accountID: {
                    type: "string",
                    format: "objectId",
                  },
                },
              },
              category: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                    format: "objectId",
                  },
                  categoryName: {
                    type: "string",
                  },
                },
              },
            },
          },
          example: {
            product: {
              productName: "New Product",
              status: "Active",
              quantity: 10,
              image: "product-image.jpg",
              description: "Product description",
              price: 99.99,
              accountID: "id"
            },
            category: {
              _id: "category-id",
              categoryName:"catename"
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