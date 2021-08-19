const express  = require ('express');
const app = express();
const mysql = require ('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

// const PORT = 3001;

// const db = mysql.createPool({
//     user : "root",
//     host : "localhost",
//     password: "",
//     database: "pettahpharma"
// })

// const db = mysql.createConnection({
//     user : "root",
//     host : "localhost",
//     password: "",
//     database: "pettahpharma"
// });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.listen(PORT,()=>{
//     console.log("Your server is running on port 3001");
// });

// db.connect((err)=>{
//     if(err) 
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log('Database Connected...');
//     }
// });

app.get ("/medrep", (req, res) => {
    res.send("medrep Server is working Perfectly...!")
});


app.get('/viewproduct',(_req,res)=>{
    db.query('SELECT * FROM product ',(err,result,_fields)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});   