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
    user : "admin",
    host : "pettahpharma-db.cjrpsgnfuucd.us-east-2.rds.amazonaws.com",
    password: "pharmadb2021",
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

app.get ("/", (_req, res) => {
    res.send("Web Server is working Perfectly...!")
});

app.get ("/test",(_req, res) => {
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
                res.send({
                    rep_ID: result[0].rep_ID,
                    manager_ID : result[0].manager_ID,
                })
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


// Home Page Back-end
app.post('/homePage/reportCount',(req,res)=>{
    // console.log(req.body.rep_ID);
    const rep_ID = req.body.rep_ID;
    const sqlLogin = "SELECT COUNT(report_id) AS reportCount FROM visit_summary_report WHERE rep_ID=?";
     
    db.query(sqlLogin,[rep_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while reportCount ");
              } if(result.length > 0){
                res.send({
                    reportCount: result[0].reportCount,
                });
                // console.log("Get Report reportCount");
              } 
            //   else {
            //     res.send({message : " No report submit yet "});
            //   }     
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
              } 
            //   else {
            //     res.send({message : " No Expenses claimed yet "});
            //   }     
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
              } 
            //   else {
            //     res.send({message : " No leave taken yet "});
            //   }     
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
              } 
            //   else {
            //     res.send({message : " No Doctors added yet "});
            //   }     
    }); 
}); 

app.post('/homePage/SheduledTaskCount',(req,res)=>{

    const rep_ID = req.body.rep_ID;
    const sqlLogin = "SELECT COUNT(rep_ID) AS SheduledTaskCount FROM task WHERE rep_ID=? AND status='Pending' AND date=CURRENT_DATE";
     
    db.query(sqlLogin,[rep_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while SheduledTaskCount");
              } if(result.length > 0){
                res.send({
                    SheduledTaskCount: result[0].SheduledTaskCount,
                });
                // console.log("Get Report Count");
              } 
            //   else {
            //     res.send({message : " No task assigned yet "});
            //   }     
    }); 
}); 

app.post('/homePage/CompletedTaskCount',(req,res)=>{

    const rep_ID = req.body.rep_ID;
    const sqlLogin = "SELECT COUNT(rep_ID) AS SheduledTaskCount FROM task WHERE rep_ID=? AND status='Complete' AND type='task' ";
     
    db.query(sqlLogin,[rep_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while SheduledTaskCount");
              } if(result.length > 0){
                res.send({
                    CompletedTaskCount: result[0].SheduledTaskCount,
                });
                // console.log("Get Report Count");
              } 
            //   else {
            //     res.send({message : " No task assigned yet "});
            //   }     
    }); 
}); 

app.get('/homePage/productsCount',(_req,res)=>{

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
              } 
            //   else {
            //     res.send({message : " No product available yet "});
            //   }     
    }); 
});

app.post('/homePage/viewTask',(req,res)=>{  
   
    const rep_ID = req.body.rep_ID;
    const sql = "SELECT * FROM task WHERE rep_ID=? AND status='Pending' ORDER BY date DESC";
     
    db.query(sql,[rep_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while GetTask");  
              } if(result.length > 0){
                res.send(result);
              }    
    }); 
}); 

// Task Handling Back-end

app.post("/task/submitScheduleForm",(req, res) => {
    // console.log(req);
    const title = req.body.title;
    const location = req.body.location;
    const date = req.body.date ;
    const session =req.body.session;
    const description = req.body.description;
    const manager_ID = req.body.manager_ID;
    const rep_ID = req.body.rep_ID;

    const sqlNewTask = "INSERT INTO task( title, location, date, session, description, manager_ID, rep_ID) VALUES (?,?,?,?,?,?,?)";

    db.query(sqlNewTask, [title,location,date,session,description,manager_ID,rep_ID], (err,result)=>{
        if(err){
            console.log(err);
            console.log ("Somthing Error while submit schedule");
        } else{
            res.send(result);
        }

    })

});

app.post('/Task/ViewTask',(req,res)=>{  
   
    const task_id = req.body.task_id;
    const sql = "SELECT * FROM task WHERE task_id=?";
     
    db.query(sql,[task_id],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while GetTask");  
              } if(result.length > 0){
                res.send(result);
              }    
    }); 
});

app.post('/Task/CompleteTask',(req,res)=>{  
   
    const task_id = req.body.task_id;
    const rep_note = req.body.rep_note;
    // console.log(rep_note);

    const sql = "UPDATE task SET rep_note =?, status='Complete' WHERE task_id=?";
     
    db.query(sql,[rep_note,task_id],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while Complete Task");  
              } if(result){
                res.send(result);
              }    
    }); 
});

app.post('/Task/RejectTask',(req,res)=>{  
   
    const task_id = req.body.task_id;
    const rep_note = req.body.rep_note;

    const sql = "UPDATE task SET rep_note =?, status='Reject' WHERE task_id=?";
     
    db.query(sql,[rep_note,task_id],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while Complete Task");  
              } if(result){
                res.send(result);
              }    
    }); 
});

app.post('/Task/CheckAvailability',(req,res)=>{ 
    const rep_ID = req.body.rep_ID;
    const date = req.body.date;
    const session = req.body.session;

    const sql = "SELECT COUNT(rep_ID) AS repAvailable FROM medicalrep WHERE rep_ID=? AND medicalrep.rep_ID NOT IN (SELECT leaves.rep_ID FROM leaves WHERE start_date=?) AND medicalrep.rep_ID NOT IN (SELECT task.rep_ID FROM task WHERE task.date = ? AND task.session= ?) AND medicalrep.rep_ID NOT IN (SELECT task.rep_ID FROM task WHERE task.date = ? AND task.session= 'Full-day')";
     
    db.query(sql,[rep_ID,date,date,session,date],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while Complete Task");  
              } if(result){
                res.send({
                    repAvailable: result[0].repAvailable,
                });
              }    
    }); 
});

// Profile Details Back-end

app.post('/profileDetails',(req,res)=>{

    const rep_ID = req.body.rep_ID;
    const sql = "SELECT * FROM medicalrep WHERE rep_ID=?";
     
    db.query(sql,[rep_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while GetProfile");
              } if(result.length > 0){
                res.send(result);
              } 
            //   else {
            //     res.send({message : " Noo Profile Data In that Id "});
            //   }     
    }); 
});

app.post('/Profile/ManagerDetails',(req,res)=>{

    const manager_ID = req.body.manager_ID;
    const sql = "SELECT * FROM salesmanager WHERE manager_ID=?";
     
    db.query(sql,[manager_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while GetProfile");
              } if(result.length > 0){
                res.send(result);
              } 
            //   else {
            //     res.send({message : " Noo Profile Data In that Id "});
            //   }     
    }); 
});

app.put('/updateProfile',(req,res)=>{

    const rep_ID = req.body.rep_ID;
    const name = req.body.name;
    const display_photo = req.body.display_photo;
    const email = req.body.email;
    const phone_no =req.body.phone_no;
    const address = req.body.address;
    const password = req.body.password;

    const sql = "UPDATE medicalrep SET name=?,display_photo=?,email=?,phone_no=?,address=?,password=? WHERE rep_ID=?";
     
    db.query(sql,[name, display_photo, email, phone_no, address, password,rep_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while update Profile");
              } if(result){
                res.send(result);
              } 
            //   else {
            //     res.send({message : " Noo Profile Data In that Id "});
            //   }     
    }); 
}); 

// View Product back-end

app.get('/viewproduct',(_req,res)=>{
    db.query('SELECT * FROM product ',(err,result)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err, "Error while view product");
        }
    });
});

app.post('/ProductDetails/ViewProduct',(req,res)=>{
    const product_id = req.body.product_id;   

    const sql = "SELECT * FROM product WHERE product_id=?";
     
    db.query(sql,[product_id],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while get product details");
              } if(result){
                res.send(result);
              } 
            //   else {
            //     res.send({message : " Noo Product Data In that Id "});
            //     // console.log("NO schedule task");
            //   }     
    });
});



// Visit Summary Report Page API's    

app.post('/viewVisitSummaryReport',(req,res)=>{
    // console.log(req.body.rep_ID);
    const rep_ID = req.body.rep_ID;
    db.query('SELECT * FROM visit_summary_report WHERE rep_ID=?',[rep_ID],(err,result)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);  
        }
    });
}); 

app.post('/vsr/getDoctorName',(req,res)=>{
    // console.log(req.body.rep_ID);
    const rep_ID = req.body.rep_ID;
    db.query('SELECT doctor_id,name FROM doctor_details WHERE rep_ID=?',[rep_ID],(err,result)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
}); 

app.get('/vsr/getProductsName',(_req,res)=>{
    db.query('SELECT product_id,name FROM product',(err,result)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
}); 

app.post("/vsr/submitForm", (req, res) => {
    // console.log(req);
    const visit_type = req.body.visit_type;
    const location = req.body.location;  
    const date = req.body.date; 
    const avg_duration = req.body.avg_duration; 
    const no_of_sample = req.body.no_of_sample;   
    const description = req.body.description;
    const doctor_name  = req.body.doctor_name; 
    const product_name = req.body.product_name;
    const rep_ID = req.body.rep_ID;
    const manager_ID = req.body.manager_ID;  
    
    const sql =  "INSERT INTO visit_summary_report(visit_type, location, date, avg_duration, no_of_sample, description, doctor_name, product_name, rep_ID, manager_ID) VALUES (?,?,?,?,?,?,?,?,?,?)" ;

    db.query(sql,[visit_type, location, date, avg_duration, no_of_sample ,description, doctor_name, product_name, rep_ID, manager_ID], (err,result)=> {
        if(err){
            console.log(err);
            console.log ("Error while submit the report");
        } else{
            // console.log("New VSR is Inserted");
            res.send(result);
        }
    })
});

app.post("/VisitSummaryReport/ViewVSR", (req, res) => {
    // console.log(req);
    const report_id = req.body.report_id; 
    
    const sql =  "SELECT * FROM `visit_summary_report` WHERE report_id=?" ;

    db.query(sql,[report_id], (err,result)=> {
        if(err){
            console.log(err);
            console.log ("Error while submit the report");
        } else{
            // console.log("New VSR is Inserted");
            res.send(result);
        }
    })
});

app.post('/VisitSummaryReport/DeleteReport',(req,res)=>{
    // console.log(req.body.doctor_id);
    const report_id = req.body.report_id;

    const sql = "DELETE FROM `visit_summary_report` WHERE report_id=?";
     
    db.query(sql,[report_id],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while Delete Doctor Profile");
              } if(result){
                res.send(result);
              }     
    }); 
}); 
              



// Doctor handling Back-end


app.post('/viewDoctorDetails',(req,res)=>{
    const rep_ID = req.body.rep_ID;
    db.query('SELECT * FROM doctor_details WHERE rep_ID = ?',[rep_ID],(err,result)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
}); 

app.post('/DoctorDetails/ViewDoctor',(req,res)=>{
    // console.log(req.body.doctor_id);
    const doctor_id = req.body.doctor_id;
    const sql = "SELECT * FROM doctor_details WHERE doctor_id=?";  
     
    db.query(sql,[doctor_id],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while get doctor details");
              } if(result){
                res.send(result);
              } 
            //   else {
            //     res.send({message : " Noo Doctor Data In that Id "});
            //     // console.log("NO schedule task");
            //   }     
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
    const note = req.body.note;
    const rep_ID = req.body.rep_ID;

    const sqlInsertDoctor =  "INSERT INTO doctor_details(display_photo, slmc_no, name, clinic, contact_no, email, area, dob, citation, note, rep_ID) VALUES (?,?,?,?,?,?,?,?,?,?,?)" ;

    db.query(sqlInsertDoctor,[displayPhoto,slmcNo,doctorName,clinic,contactNumber,email,clinicArea,dob,citation,note,rep_ID], (err,result)=> {
        if(err){
            console.log(err);
            console.log ("Somthing Error");
        } else{
            // console.log("New Doctor is Inserted");
            res.send(result);
        }
    })
});

app.put('/updateDoctor',(req,res)=>{
    const doctor_id = req.body.doctor_id;
    const display_photo = req.body.display_photo;
    const slmc_no = req.body.slmc_no;
    const name = req.body.name;
    const clinic = req.body.clinic;
    const contact_no = req.body.contact_no;  
    const email = req.body.email;      
    const area = req.body.area;      
    const dob = req.body.dob;      
    const citation = req.body.citation;      
    const note = req.body.note; 

    const sql = "UPDATE doctor_details SET display_photo=?, slmc_no=?, name=?, clinic=?, contact_no=?, email=?, area=?, dob=?, citation=?, note=? WHERE doctor_id =?";
     
    db.query(sql,[display_photo, slmc_no, name, clinic, contact_no, email, area, dob, citation, note, doctor_id],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while update Doctor Profile");
              } if(result){
                res.send(result);
              } 
            //   else {
            //     res.send({message : " Noo Profile Data In that Id "});
            //     // console.log("NO schedule task");
            //   }     
    }); 
}); 

app.post('/deleteDoctor',(req,res)=>{
    // console.log(req.body.doctor_id);
    const doctor_id = req.body.doctor_id; 
    const sql = "DELETE FROM doctor_details WHERE doctor_id =?";
     
    db.query(sql,[doctor_id],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while Delete Doctor Profile");
              } if(result){
                res.send(result);
              }     
    }); 
}); 

app.get('/ViewCategory', (_req, res) =>{
    //total expenses by category
    db.query('SELECT expense_Type, (SUM(amount)) AS Total FROM expenses GROUP BY expense_Type', (err, result, _fields)=> {
      if(!err){
        res.send(result);
    }else {
    console.log(err);
    }
  });
});






























































































































































































// Start From Here Nimni..........................................................................................................................

app.post("/applyLeave",(req,res)=>{
    console.log(req);
  
    const rep_ID = req.body.rep_ID;
    const leaveType = req.body.leaveType;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const description = req.body.description;
    
    const sqlApplyLeave = "INSERT INTO leaves (rep_ID,leave_Type,start_Date,end_Date,description) VALUES (?,?,?,?,?)";

    db.query(sqlApplyLeave, [rep_ID,leaveType,startDate,endDate,description], (err,result)=>{
        if(err){
            console.log(err);
            console.log ("Error");
        } else{
            // console.log("Leave applied");
            res.send(result);
        }
    })
});
//         console.log("Successful");
//         res.send("Successfull");
//     })
//     console.log ("Error");
// });         

app.post('/viewApprovedLeaves',(req,res)=>{
    const rep_ID = req.body.rep_ID;
    // console.log(req.body.rep_ID);
    //approved leaves
    //if approved then status=1, if rejected then status=2
    db.query('SELECT leave_Type, DATEDIFF(start_Date, end_Date) AS no_of_days, description, salesmanager_comment FROM leaves WHERE status = 1 AND rep_ID = ?',[rep_ID],(err,result,_fields)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});  

app.get('/viewPendingLeaves',(_req,res)=>{
    // console.log(req.body.rep_ID);
    //pending leaves
    //if approved then status=1, if rejected then status=2.......... pending leaves then status= 0 (default)
    db.query('SELECT * FROM leaves WHERE status = 0 ORDER BY leave_ID DESC',(err,result,_fields)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});  

app.post('/claimExpenses',(req,res)=>{
    console.log(req)
    const rep_ID = req.body.rep_ID;
    const expense_Type = req.body.expense_Type;
    const location = req.body.location;
    const bills = req.body.bills;
    const amount = req.body.amount;
    const description = req.body.description;
    
    const sqlClaimExpense = "INSERT INTO expenses (rep_ID,expense_Type,location,bills,amount,description) VALUES (?,?,?,?,?,?)";

    db.query(sqlClaimExpense, [rep_ID,expense_Type,location,bills,amount,description], (err,result)=>{
        if(err){
            console.log(err);
            console.log ("Error");
        } else{
            // console.log("Expense claim submitted");
            res.send(result);
        }
    })
});        
  

// app.get('/viewExpenses', (_req, res) =>{
//     //today expenses
//     db.query('SELECT expense_Type, amount, SUM(amount) AS "Total" FROM expenses WHERE date = CURRENT_DATE', (err, result, _fields)=> {
//       if(!err){
//         res.send(result);
//     }
//     else {
//     console.log(err);
//     }
// });
// });

app.get('/viewClaims',(_req,res)=>{

    db.query('SELECT expense_ID, expense_Type, amount, description, date FROM expenses ORDER BY expense_ID DESC',(err,result,_fields)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});
  
//////////////////////////////////////////////////////////////////////////////

// // GET method route
// app.get('/', function (req, res) {
//     res.send('GET request to the homepage')
//   })
  
//   // POST method route
//   app.post('/', function (req, res) {
//     res.send('POST request to the homepage')
//   })
























































































































































































          
     