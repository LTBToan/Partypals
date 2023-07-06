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
                  fullDescription: {
                    type: "string",
                  },
                  price: {
                    type: "string",
                  },
                  discount: {
                    type: "string",
                  },
                  offerEnd: {
                    type: "string",
                  },
                  new: {
                    type: "boolean",
                  },
                  rating: {
                    type: "string",
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
                },
              },
            },
          },
          example: {
            product: {
              productName: "New Product",
              status: "Active",
              quantity: "10",
              image: "product-image.jpg",
              description: "Product description",
              fullDescription: "Full product description",
              price: "99.99",
              discount: "10%",
              offerEnd: "2023-06-30",
              new: true,
              rating: "4.5",
            },
            category: {
              _id: "categoryid",
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