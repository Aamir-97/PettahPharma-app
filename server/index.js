const express  = require ('express');
const app = express();
const mysql = require ('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
// const medrep = require('./medrepApi');
const router = express.Router();
      


const PORT = 3001;

// const db = mysql.createPool({
//     user : "root",
//     host : "localhost",
//     password: "",
//     database: "pettahpharma"
// })

const db = mysql.createConnection({
    user : "root",
    host : "localhost",
    password: "",
    database: "pettahpharma"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(PORT,()=>{
    console.log("Your server is running on port 3001");
});

db.connect((err)=>{
    if(err) 
    {
        console.log(err);
    }
    else
    {
        console.log('Database Connected...');
    }
});

app.get ("/", (req, res) => {
    res.send("Web Server is working Perfectly...!")
});

app.get ("/test",(req, res) => {
    res.send ("The Emulator is connected to the server");
});

// app.post('/login',(req,res)=>{
//     const email = req.body.email;
//     const password = req.body.password;

//     const sqlLogin = "SELECT * FROM medicalrep WHERE email=? AND password=?";
     
//     db.query(sqlLogin,[email,password],(err,result)=>{
//             if(err){  
//                 res.send({err:err})
//                 console.log("err");
//             }
//               if(result.length > 0){
//                 // res.send(result.rep_ID);
//                 res.send({message1 :"Login Successful" });
//                 console.log("message1");
//               } else{
//                 res.send({message2 : " Wrong Username Or password "});
//                 console.log("message2");

//               }     
//             }); 
// });  

app.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const sqlLogin = "SELECT * FROM medicalrep WHERE email=? AND password=?";
     
    db.query(sqlLogin,[email,password],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("err");
            }
              if(result.length > 0){
                // res.send(result);
                res.send({
                    id: result[0].rep_ID,
                    name: result[0].name,
                    email: result[0].email,
                    // userType: result[0].user_type,
                    // profilePicturePath: result[0].profile_picture_path,
                    // isVerified: result[0].is_verified
                })
 
                // res.send({message1 :"Login Successful" });
                console.log("message1");
              } else{
                res.send({message2 : " Wrong Username Or password "});
                console.log("message2");

              }     
            }); 
});  

app.post("/newTask",(req, res) => {
    console.log(req);

    const title = req.body.title;
    const location = req.body.location;
    const date = req.body.date ;
    const session =req.body.session;
    const description = req.body.description;
    

    const sqlNewTask = "INSERT INTO task(title, location, date, session, description) VALUES (?,?,?,?,?)";

    db.query(sqlNewTask, [title,location,date,session,description], (err,_result)=>{
        if(err){
            console.log(err);
            console.log ("Somthing Error");
        } else{
            console.log("Task is Inserted");
            res.send("Task is inserted");
        }

    })

});

app.post('/createmedicalrep',(req,res)=>{
    console.log(req.body)
    const rep_ID = req.body.rep_ID;
    const name = req.body.name;
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const area = req.body.area;
    const level = req.body.level;
    const password = req.body.password;
    const manager_ID = req.body.manager_ID;

    
    db.query("INSERT INTO medicalrep (rep_ID,name,email,phone_no,area,level,password,manager_ID) VALUES (?,?,?,?,?,?,?,?)",
    [rep_ID,name,email,phone_no,area,level,password,manager_ID],(err,_results)=>{
        if(err){
            console.log(err);
        } else{
            res.send("medical rep created");
        }
    
    });
    
});

app.post("/doctor/addNewDoctor", (req, res) => {
    console.log(req);
    const displayPhoto = req.body.displayPhoto;
    const slmcNo = req.body.slmcNo;
    const doctorName = req.body.doctorName;
    const clinic = req.body.clinic;
    const contactNumber = req.body.contactNumber;
    const email = req.body.email;
    const clinicArea = req.body.clinicArea;
    const dob = req.body.dob;
    const citation = req.body.citation;
    const qualification = req.body.qualification;
    const note = req.body.note;

    const sqlInsertDoctor =  "INSERT INTO doctor_details( display_photo, slmc_no, name, clinic, contact_no, email, area, dob, citation, qualification, note) VALUES (?,?,?,?,?,?,?,?,?,?,?)" ;

    db.query(sqlInsertDoctor,[displayPhoto,slmcNo,doctorName,clinic,contactNumber,email,clinicArea,dob,citation,qualification,note], (err,_result)=> {
        if(err){
            console.log(err);
            console.log ("Somthing Error");
        } else{
            console.log("New Doctor is Inserted");
            res.send("New Doctor is inserted");
        }
    })
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


app.get('/viewDoctorDetails',(_req,res)=>{
    db.query('SELECT * FROM doctor_details ',(err,result,_fields)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});

          
   