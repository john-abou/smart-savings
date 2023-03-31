const {gql}=require('apollo-server-express');
const typeDefs=gql`

type User{
    firstName: String
    lastName: String
    admin: String
    _id: ID
    email: String
    username: String
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
    me:User
    products:[Product]
    categories:[Category]
    getProductById(_id: ID!): Product
}

type Mutation{
    login(email:String!,password:String!):Auth
    addUser(username:String!,email:String!,password:String!):Auth
    addOrder(products:[ID]!):Order
    addProduct(name:String!,description:String!,price:String!,category:ID!):Order
    removeProduct(productId:ID!):Order
    appendCompetitiorPriceHistory(productId:ID!):Product
}
`;

module.exports=typeDefs;