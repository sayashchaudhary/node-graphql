const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const schema = require("./schema/schema")

const app = express();

//allow cross-origin requests
app.use(cors())

mongoose.connect('mongodb+srv://sayashchaudhary:sayashishu@cluster0.dmp1y.mongodb.net/node-graphql?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once('open', () => {
    console.log('DB connected')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(8000, () => {
    console.log('Server is running of port 8000');
});
