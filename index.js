
const express = require('express')
const app = express()
const bodyparser = require('body-parser');
const router = require ("./routes"); 


app.use('/', router);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

require('dotenv').config();
const port = process.env.PORT || 8081; //definindo a porta





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

