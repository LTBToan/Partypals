module.exports = {
  post: {
    tags: ["Product"],
    summary: "create product",
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
                  categoryID: {
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
              price: "99.99",
              categoryID: "categoryid",
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