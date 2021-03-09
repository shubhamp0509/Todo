
const express=require('express')
swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express")

const bodyParser=require('body-parser')
const cors=require('cors');
const {mongoose}=require('./db.js');
var todoController=require("./controllers/todoController.js");
var app=express();
swaggerUi=require('swagger-ui-express')
swaggerDocument=require("./swagger.json")

app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:4200'}));

const port=process.env.PORT  || 3000;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port,()=>{
    console.log("Server is running..");
});


app.use('/infos',todoController);


