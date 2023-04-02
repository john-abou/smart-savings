const {gql}=require('apollo-server-express');
const typeDefs=gql`

type User{
    firstName: String
    lastName: String
    admin: Boolean
    _id: ID
    email: String
    orders: [Order]
}

type Auth{
    token:ID!
    user:User
}

type Competition{
    link:String
    priceHistory:[PriceHistory]
}

type PriceHistory{
    price: String
    date: String
}

type Product{
    _id:ID
    name:String
    description:String
    price:String
    quantity:Int
    inStock: Boolean
    inCart: Boolean
    image:String
    category:Category
    AmazonHistory: Competition
    WalmartHistory: Competition
    LoblawsHistory: Competition
}

type Category{
    _id:ID
    name:String
}

type Order{
    _id:ID
    purchaseDate:String
    products:[Product]
}

type Query{
    user: User
    users:[User]
    products:[Product]
    categories:[Category]
    getProductById(_id: ID!): Product
}

type Mutation{
    login(email:String!,password:String!):Auth
    updateUser(_id: ID!, firstName: String, lastName: String, isAdmin: Boolean!): User!
    addUser(firstName:String!,lastName:String!,email:String!,password:String!):Auth
    addOrder(products:[ID]!):Order
    addProduct(name:String!,description:String!,price:String!,category:ID!):Order
    removeProduct(productId:ID!):Order
    appendCompetitiorPriceHistory(productId:ID!):Product
    updateProduct(productId:ID!,name:String,description:String,price:String,quantity:Int):Product
    deleteProduct(productId:ID!):Product
}
`;

module.exports=typeDefs;