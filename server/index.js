const express  = require ('express');
const app = express();
const mysql = require ('mysql');
const bodyParser = require('body-parser')
const cors = require('cors')

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

app.get ("/", (req, res) => {
    res.send("Web Server is working Perfectly...!")
});

app.get ("/test",(req, res) => {
    res.send ("The Emulator is connected to the server");
});

app.post("/medrep", (req , res) => {
    const sqlINsertRap = "INSERT INTO medicalrep(rep_ID,name, email, phone_no, area, level, password, manager_ID) VALUES (167,'Madhu','madhu@gamil.com','0758677094','Kallaru','3.5','madhu@123',2)";

    db.query(sqlINsertRap, (err,result) => {
        console.log("Successfully Inserted ");
    })
    console.log("Somthing Error");
})

app.post("/newTask",(req, res) => {
    console.log(req);
    const title = req.body.title;
    const location = req.body.location;
    const date = req.body.date ;
    const session =req.body.session;
    const description = req.body.description;
    

    const sqlNewTask = "INSERT INTO task(title, location, date, session, description) VALUES (?,?,?,?,?)";

    db.query(sqlNewTask, [title,location,date,session,description], (err,result)=>{
        console.log("Data is Inserted");
        res.send("Data is inserted");
    })
    console.log ("Somthing Error");

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

    // const displayPhoto = req.body.displayPhoto
    // const slmcNo = req.body.slmcNo
    // const doctorName = req.body.doctorName
    // const clinic = req.body.clinic
    // const contactNumber = req.body.contactNumber
    // const email = req.body.email
    // const clinicArea = req.body.clinicArea
    // const dob = req.body.dob
    // const citation = req.body.citation
    // const qualification = req.body.qualification
    // const note = req.body.note
    res.send ("Working Wiithout SQl part 2");

    const sqlInsertDoctor =  "INSERT INTO doctor_details(slmc_no, name, clinic, contact_no, email, area, citation, qualification, note) VALUES ('2356','Aamir','DeltaClinic','0768921288','aamir@gmail.com','Dhehiwala','Generel','MBBS','Ivan oru Doctor')" ;

    db.query(sqlInsertDoctor, (err, result)=> {
        console.log("Data is Inserted");
        res.send("Data is inserted");
    })
    res.send ("Something error..!"); 
});



app.listen(PORT,()=>{
    console.log("Your server is running on port 3001");
});

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