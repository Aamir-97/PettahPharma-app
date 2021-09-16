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
// }),

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
                // console.log("login");
              } else {
                  res.send({message : 'Invalid Credentials...!'})
              } 
            }); 
});  

app.post('/HomePage/StatisticsData',(req,res)=>{
    const rep_ID = req.body.rep_ID;
    const sqlLogin = "SELECT \
    (SELECT COUNT(report_id) FROM visit_summary_report WHERE rep_ID=? ) AS reportCount, \
    (SELECT SUM(amount) FROM expenses WHERE rep_ID=? AND status=1 ) AS expensesAmount,  \
    (SELECT SUM(DATEDIFF(end_Date, start_Date)) FROM leaves WHERE rep_ID=? AND status=1 ) AS leaveCount, \
    (SELECT COUNT(doctor_ID) FROM doctor_details WHERE rep_ID=? ) AS doctorCount,  \
    (SELECT COUNT(rep_ID) FROM task WHERE rep_ID=? AND status='Pending' AND date=CURRENT_DATE ) AS ScheduledTaskCount,  \
    (SELECT COUNT(rep_ID) FROM task WHERE rep_ID=? AND status='Complete' AND type='task') AS completedTaskCount, \
    (SELECT COUNT(product_id) FROM product) AS productsCount"
     
    db.query(sqlLogin,[rep_ID,rep_ID,rep_ID,rep_ID,rep_ID,rep_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while Home Screen Statistic Data");
              } if(result.length > 0){
                res.send(result);
              } 
 
    }); 
}); 

app.post('/homePage/viewTask',(req,res)=>{  
   
    const rep_ID = req.body.rep_ID;
    const sql = "SELECT * FROM task WHERE rep_ID=? AND status='Pending' OR status='Accept' ORDER BY date ASC";
     
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

app.post("/newTask",(req, res) => {
    // console.log(req);

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
            // console.log("Task is Inserted");
            res.send("Task is inserted");
        }

    })

});

app.post("/task/submitScheduleForm",(req, res) => {
    // console.log(req);
    const title = req.body.title;
    const location = req.body.location;
    const date = req.body.date ;
    const session =req.body.session;
    const description = req.body.description;
    const created_at = req.body.created_at;
    const manager_ID = req.body.manager_ID;
    const rep_ID = req.body.rep_ID;

    const sqlNewTask = "INSERT INTO task( title, location, date, session, description, manager_ID, rep_ID, created_at) VALUES (?,?,?,?,?,?,?,?)";

    db.query(sqlNewTask, [title,location,date,session,description,manager_ID,rep_ID,created_at], (err,result)=>{
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
    // console.log(task_id);

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

app.post('/Task/DeleteSchedule',(req,res)=>{  
   
    const task_id = req.body.task_id;
    // const rep_note = req.body.rep_note;
    // console.log(rep_note);

    const sql = "DELETE FROM task WHERE task_id=?";
     
    db.query(sql,[task_id],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while Delete Schedule");  
              } if(result){
                res.send(result);
              }    
    }); 
});
          
app.post('/Task/AcceptTask',(req,res)=>{  
   
    const task_id = req.body.task_id;
    // const rep_note = req.body.rep_note;
    // console.log(rep_note);

    const sql = "UPDATE task SET status='Accept' WHERE task_id=?";
     
    db.query(sql,[task_id],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while Accept Task");  
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
    // console.log(rep_ID,date,session);

    const sql = "SELECT COUNT(rep_ID) AS repAvailable FROM medicalrep WHERE rep_ID=? AND medicalrep.rep_ID NOT IN (SELECT leaves.rep_ID FROM leaves WHERE start_date=? AND end_Date=?) AND medicalrep.rep_ID NOT IN (SELECT task.rep_ID FROM task WHERE task.date = ? AND task.session=?) AND medicalrep.rep_ID NOT IN (SELECT task.rep_ID FROM task WHERE task.date = ? AND task.session= 'Full-day')";
     
    db.query(sql,[rep_ID,date,date,date,session,date],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while check for Task availability");  
              } if(result){
                // res.send({
                //     repAvailable: result[0].repAvailable,
                // });
                res.send(result);
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
    });
});



// Visit Summary Report Page API's    

app.post('/viewVisitSummaryReport',(req,res)=>{
    // console.log(req.body.rep_ID);
    const rep_ID = req.body.rep_ID;
    db.query('SELECT * FROM visit_summary_report WHERE rep_ID=? ORDER BY created_at DESC',[rep_ID],(err,result)=>{
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
    const created_at = req.body.created_at; 
    
    const sql =  "INSERT INTO visit_summary_report(visit_type, location, date, avg_duration, no_of_sample, description, doctor_name, product_name, rep_ID, manager_ID,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)" ;

    db.query(sql,[visit_type, location, date, avg_duration, no_of_sample ,description, doctor_name, product_name, rep_ID, manager_ID,created_at], (err,result)=> {
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
    const report_id = req.body.report_id; 
    
    const sql =  "SELECT * FROM visit_summary_report WHERE report_id=?" ;

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
    // console.log(req);
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























// Start From Here Nimni..........................................................................................................................

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Manage Leaves Page - Pending Leaves
app.post('/viewPendingLeaves',(req,res)=>{
    const rep_ID = req.body.rep_ID;
    db.query('SELECT leave_ID, leave_Type, start_Date, description, DATEDIFF(end_Date, start_Date) AS no_of_days FROM leaves WHERE rep_ID=? AND status = 0 ORDER BY leave_ID DESC',[rep_ID],(err,result,_fields)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});      

app.post('/ManageLeaves/ViewPendingLeave',(req,res)=>{
    const leave_ID = req.body.leave_ID;   
    const sql = "SELECT leave_Type, start_Date, end_Date, DATEDIFF(end_Date, start_Date) AS no_of_days, description, salesmanager_comment FROM leaves WHERE leave_ID = ? AND status = 0";
    
    db.query(sql,[leave_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while getting pending leave details");
              } if(result){
                res.send(result);
              } 
    });  
});


app.post('/ManageLeaves/totalleaveCount',(req,res)=>{

    const rep_ID = req.body.rep_ID;
    const sqlLogin = "SELECT COUNT(leave_ID) AS totalleaveCount FROM leaves WHERE status !=0 AND rep_ID=?";
     
    db.query(sqlLogin,[rep_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while totalleaveCount ");
              } if(result.length > 0){
                res.send({
                    totalleaveCount: result[0].totalleaveCount,
                });
              } 
    }); 
}); 

app.post('/ManageLeaves/pendingleaveCount',(req,res)=>{

    const rep_ID = req.body.rep_ID;
    const sqlLogin = "SELECT COUNT(leave_ID) AS pendingleaveCount FROM leaves WHERE status = 0 AND rep_ID=?";
     
    db.query(sqlLogin,[rep_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while pendingleaveCount ");
              } if(result.length > 0){
                res.send({
                    pendingleaveCount: result[0].pendingleaveCount,
                });
              } 
    }); 
}); 

app.post('/ManageLeaves/DeleteLeave',(req,res)=>{
    const leave_ID = req.body.leave_ID;

    const sql = "DELETE FROM `leaves` WHERE leave_ID=?";
     
    db.query(sql,[leave_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while Deleting Pending leave");
              } if(result){
                res.send(result);
              }     
    }); 
}); 
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* Annual Leaves Page - View approved and rejected leaves*/
app.post('/viewLeaves',(req,res)=>{
    const rep_ID = req.body.rep_ID;
    db.query("SELECT leave_ID,leave_Type, start_Date, DATEDIFF(end_Date, start_Date) AS no_of_days, \
    CASE WHEN status = 1 THEN 'Approved' ELSE 'Rejected' END AS status FROM leaves WHERE status !=0 AND rep_ID = ?",[rep_ID],(err,result,_fields)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});  

app.post('/AnnualLeaves/ViewLeave',(req,res)=>{
    const leave_ID = req.body.leave_ID;   
    const sql = "SELECT leave_Type, start_Date, end_Date, DATEDIFF(end_Date, start_Date) AS no_of_days, CASE WHEN status = 1 THEN 'Approved' ELSE 'Rejected' END AS status, description, salesmanager_comment FROM leaves WHERE leave_ID = ? AND status != 0";
    
    db.query(sql,[leave_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while getting leave details");
              } if(result){
                res.send(result);
              } 
    });
});

app.post('/AnnualLeaves/totalleaveCount',(req,res)=>{

    const rep_ID = req.body.rep_ID;
    const sqlLogin = "SELECT COUNT(leave_ID) AS totalleaveCount FROM leaves WHERE status !=0  AND rep_ID=?";
     
    db.query(sqlLogin,[rep_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while totalleaveCount ");
              } if(result.length > 0){
                res.send({
                    totalleaveCount: result[0].totalleaveCount,
                });
              }  
    }); 
}); 

app.post('/AnnualLeaves/pendingleaveCount',(req,res)=>{

    const rep_ID = req.body.rep_ID;
    const sqlLogin = "SELECT COUNT(leave_ID) AS pendingleaveCount FROM leaves WHERE status = 0 AND rep_ID=?";
     
    db.query(sqlLogin,[rep_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while pendingleaveCount ");
              } if(result.length > 0){
                res.send({
                    pendingleaveCount: result[0].pendingleaveCount,
                });
              } 
    }); 
}); 
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* Apply Leaves Page */
app.post('/applyLeave',(req,res)=>{
    // console.log(req);  
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

app.post('/ApplyLeaves/CheckAvailability',(req,res)=>{ 
    const rep_ID = req.body.rep_ID;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
  //  console.log (startDate,endDate, rep_ID);
    const sql = "SELECT COUNT(rep_ID) AS leaveAvailable FROM medicalrep WHERE rep_ID=? \
    AND medicalrep.rep_ID NOT IN (SELECT task.rep_ID FROM task WHERE task.date BETWEEN ? AND ?)  \
    AND medicalrep.rep_ID NOT IN (SELECT leaves.rep_ID FROM leaves WHERE ? BETWEEN start_Date AND end_Date) \
    AND medicalrep.rep_ID NOT IN (SELECT leaves.rep_ID FROM leaves WHERE ? BETWEEN start_Date AND end_Date)";

    db.query(sql,[rep_ID,startDate,endDate,startDate, endDate],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while on leave");  
              } if(result){
                res.send({
                    leaveAvailable: result[0].leaveAvailable,
                });
              }    
    }); 
});   

app.post('/ApplyLeaves/totalleaveCount',(req,res)=>{

    const rep_ID = req.body.rep_ID;
    const sqlLogin = "SELECT COUNT(leave_ID) AS totalleaveCount FROM leaves WHERE status !=0 AND rep_ID=?";
     
    db.query(sqlLogin,[rep_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while totalleaveCount ");
              } if(result.length > 0){
                res.send({
                    totalleaveCount: result[0].totalleaveCount,
                });
              } 
    }); 
}); 

app.post('/ApplyLeaves/pendingleaveCount',(req,res)=>{

    const rep_ID = req.body.rep_ID;
    const sqlLogin = "SELECT COUNT(leave_ID) AS pendingleaveCount FROM leaves WHERE status = 0 AND rep_ID=?";
     
    db.query(sqlLogin,[rep_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while pendingleaveCount ");
              } if(result.length > 0){
                res.send({
                    pendingleaveCount: result[0].pendingleaveCount,
                });
              } 
    }); 
}); 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Manage Expenses */  

app.post('/ClaimExpenses',(req,res)=>{
    // console.log(req)
    const rep_ID = req.body.rep_ID;
    const expense_Type = req.body.expense_Type;
    const date = req.body.date;
    const location = req.body.location;
    const bills = req.body.bills;  
    const amount = req.body.amount;  
    const description = req.body.description;  
    const bill_uri = req.body.bill_uri;  
    
    const sqlClaimExpense = "INSERT INTO expenses(rep_ID, expense_Type, date, location, bills, amount, description, bill_uri) VALUES (?,?,?,?,?,?,?,?)";

    db.query(sqlClaimExpense, [rep_ID, expense_Type, date, location, bills, amount, description, bill_uri], (err,result)=>{
        if(err){
            console.log(err);
            console.log ("Error while claim expenses");
        } else{  
            // console.log("Expense claim submitted");
            res.send(result);
        }
    })  
});        


app.post('/Expenses/StatisticsData',(req,res)=>{
    const rep_ID = req.body.rep_ID;
    const sqlLogin = "SELECT \
    (SELECT SUM(amount) FROM expenses WHERE rep_ID = ? AND expense_Type='Daily batta' AND status=1) AS DailyBatta, \
    (SELECT SUM(amount) FROM expenses WHERE rep_ID = ? AND expense_Type='Accommodation' AND status=1) AS Accomadation, \
    (SELECT SUM(amount) FROM expenses WHERE rep_ID = ? AND expense_Type='Fuel' AND status=1) AS Fuel, \
    (SELECT SUM(amount) FROM expenses WHERE rep_ID = ? AND expense_Type='Other' AND status=1) AS Other, \
    (SELECT SUM(amount) FROM expenses WHERE rep_ID = ? AND status=1) AS Total";
     
    db.query(sqlLogin,[rep_ID,rep_ID,rep_ID,rep_ID,rep_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while Expense screen Statistic data");
              } if(result){
                res.send(result);
              } 
 
    }); 
}); 

app.post('/ViewExpenses',(req,res)=>{
    const rep_ID = req.body.rep_ID;
    db.query('SELECT expense_ID,expense_Type,amount,date, \
    CASE WHEN status=0 THEN "Pending" WHEN status=1 THEN "Accept" ELSE "Rejected" END AS status \
    FROM expenses WHERE rep_ID=? ORDER BY date DESC',[rep_ID],(err,result,_fields)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});

app.post('/ManageExpenses/ViewExpenses',(req,res)=>{
    const expense_ID = req.body.expense_ID;   

    const sql = "SELECT expense_Type, amount, date, location, bills, description,bill_uri, salesmanager_comment, CASE WHEN status = 0 THEN 'Pending' WHEN status = 1 THEN 'Claim Accepted' ELSE 'The claim rejected' END AS status FROM expenses WHERE expense_ID = ?";
    
    db.query(sql,[expense_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while getting expense details");
              } if(result){
                res.send(result);
              } 
    });    
});

app.post('/Expense/DeleteExpense',(req,res)=>{
    const expense_ID = req.body.expense_ID;

    const sql = "DELETE FROM expenses WHERE expense_ID = ?";
    
    db.query(sql,[expense_ID],(err,result)=>{
            if(err){
                res.send({err:err})
                console.log("Error while delete expense details");
              } if(result){
                res.send(result);
              } 
    });
});
  
//////////////////////////////////////////////////////////////////////////////

























































































































































































          
     