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
                    rep_ID: result[0].rep_ID,
                    manager_ID : result[0].manager_ID,
                })
                // res.send({message1 :"Login Successful" });
                console.log("Login Successful");
              } else{
                res.send({message2 : " Wrong Username Or password "});
                console.log(" Wrong Username Or password ");

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

app.post('/viewVisitSummaryReport',(req,res)=>{
    // console.log(req.body.rep_ID);
    const rep_ID = req.body.rep_ID;
    db.query('SELECT * ,doctor_details.name AS doctorName FROM visit_summary_report INNER JOIN doctor_details ON doctor_details.doctor_id = visit_summary_report.doctor_id WHERE visit_summary_report.rep_ID=?',[rep_ID],(err,result,_fields)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});     
   
app.post('/homePage/reportCount',(req,res)=>{
    // console.log(req.body.rep_ID);
    const rep_ID = req.body.rep_ID;
    const sqlLogin = "SELECT COUNT(rep_ID) AS reportCount FROM visit_summary_report WHERE rep_ID=?";
     
    db.query(sqlLogin,[rep_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while reportCount ");
              } if(result.length > 0){
                res.send({
                    reportCount: result[0].reportCount,
                });
                // console.log("Get Report reportCount");
              } else {
                res.send({message : " No report submit yet "});
                // console.log("NO report reportCount");

              }     
    }); 
}); 

app.post('/homePage/expensesCount',(req,res)=>{

    const rep_ID = req.body.rep_ID;
    const sqlLogin = "SELECT COUNT(rep_ID) AS expensesCount FROM expenses WHERE rep_ID=?";
     
    db.query(sqlLogin,[rep_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while expensesCount ");
              } if(result.length > 0){
                res.send({
                    expensesCount: result[0].expensesCount,
                });
              } else {
                res.send({message : " No Expenses claimed yet "});
                // console.log("NO report count");

              }     
    }); 
}); 

app.post('/homePage/leaveCount',(req,res)=>{

    const rep_ID = req.body.rep_ID;
    const sqlLogin = "SELECT COUNT(rep_ID) AS leaveCount FROM leaves WHERE rep_ID=?";
     
    db.query(sqlLogin,[rep_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while leaveCount ");
              } if(result.length > 0){
                res.send({
                    leaveCount: result[0].leaveCount,
                });
                // console.log("Get Report Count");
              } else {
                res.send({message : " No leave taken yet "});
                // console.log("NO report count");

              }     
    }); 
}); 

app.post('/homePage/doctorCount',(req,res)=>{

    const rep_ID = req.body.rep_ID;
    const sqlLogin = "SELECT COUNT(doctor_ID) AS doctorCount FROM doctor_details WHERE rep_ID=?";
     
    db.query(sqlLogin,[rep_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while doctorCount ");
              } if(result.length > 0){
                //   console.log(result[0].doctorCount);
                res.send({
                    doctorCount: result[0].doctorCount,
                });
                // console.log("Get Report Count");
              } else {
                res.send({message : " No Doctors added yet "});
                // console.log("NO report count");

              }     
    }); 
}); 

app.post('/homePage/SheduledTaskCount',(req,res)=>{

    const rep_ID = req.body.rep_ID;
    const sqlLogin = "SELECT COUNT(rep_ID) AS SheduledTaskCount FROM task WHERE rep_ID=?";
     
    db.query(sqlLogin,[rep_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while SheduledTaskCount");
              } if(result.length > 0){
                res.send({
                    SheduledTaskCount: result[0].SheduledTaskCount,
                });
                // console.log("Get Report Count");
              } else {
                res.send({message : " No task assigned yet "});
                // console.log("NO report count");

              }     
    }); 
}); 

app.get('/homePage/productsCount',(req,res)=>{

    // const rep_ID = req.body.rep_ID;
    const sqlLogin = "SELECT COUNT(product_id) AS productsCount FROM product";
     
    db.query(sqlLogin,(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while productsCount report");
              } if(result.length > 0){
                res.send({
                    productsCount: result[0].productsCount,
                });
                // console.log("Get Report Count");
              } else {
                res.send({message : " No product available yet "});
                // console.log("NO report count");

              }     
    }); 
}); 






























































































































































































// Start From Here Nimni..........................................................................................................................

























































































































































































          
   