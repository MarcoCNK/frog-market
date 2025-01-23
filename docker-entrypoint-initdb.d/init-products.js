db = db.getSiblingDB("mydatabase")
db.products.insertMany([
    {
        title: "Product 1",
        price: 100,
        stock: 50,
        description: "This is product 1",
        category: "Category A",
        seller_id: "123",
        image_base64: "base64encodedimage"
    },
    {
        title: "Product 2",
        price: 150,
        stock: 30,
        description: "This is product 2",
        category: "Category B",
        seller_id: "124",
        image_base64: "base64encodedimage"
    }
]);
