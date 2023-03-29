const {gql}=require('apollo-server-express');
const typeDefs=gql`

type User{
    _id:ID
    email:String
    username:String
    orders:[Order]
}

type Auth{
    token:ID!
    user:User
}

type Product{
    _id:ID
    name:String
    description:String
    price:String
    image:String
    category:Category
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
}

type Mutation{
    login(email:String!,password:String!):Auth
    addUser(username:String!,email:String!,password:String!):Auth
    addOrder(products:[ID]!):Order
    addProduct(name:String!,description:String!,price:String!,category:ID!):Order
    removeProduct(productId:ID!):Order
}
`;

module.exports=typeDefs;