const path = require('path');
const express = require('express')
const sdk = require('node-appwrite');
const multer = require('multer');
const cors = require('cors');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads'); // Uploads folder where files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
  });
  const upload = multer({ storage: storage });

const {Permission, Role} = require('node-appwrite');
const { RtcTokenBuilder,RtcRole } = require('agora-access-token')


const client = new sdk.Client();
const permission = new Permission(client);

const databases = new sdk.Databases(client);
const port =4000
const app_id="f74c9f2bc19849b5b2a2df2aac5db369"
const certificate="bbe2e75e364a4ac4b90dfbb535a6ea62"
const app=express()

let projecis="65d05ade5e4d94659535"
  let db_id="65d05c1d373c79a07963"
 
client
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('65d05ade5e4d94659535').setKey('78e6d3199495458a3ea15f1c4b229aecc884950f45bff01d95b0649064ad87567ab7288b3bd6e87901c8f973087f27f834ee5053ba5ee9095f2984b0e489c6a799ba4b40845111178ddef144a6bc7b6ae17d8f7e34cf2130b3cc30e05d69ca7022fe258bdb4b84ef51fc2e3fcbe177f21f0c37f340659be6eed8a9f361576026') ;
const nocache=(req,resp,next)=>{
    resp.header('Cache-Control','private,no-cache,no-store,must-revalidate')
    resp.header('Expires')
    resp.header('Pragma','no-cache')
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
}
const genrate=(req,resp)=>{
    resp.header('Acess-Control-Allow-Origin','*')
    const channel=req.query.channel
    if(!channel){
        return resp.status(500).json({'eror':"required"})
    }
    let role =RtcRole.SUBSCRIBER
    if(req.query.role=='publisher'){
        role=RtcRole.PUBLISHER
    }
    let expire=req.query.expire
    if(!expire||expire==''){
        expire=3600
    }else{
        expire=parseInt(expire,10)

    }
    const curent=Math.floor(Date.now()/1000)
    const privege=curent+expire
    let token=encodeURIComponent(RtcTokenBuilder.buildTokenWithUid(app_id,certificate,channel ,0,role,privege))
    
    return resp.json({'token':token})    
        

}
const create =(req,resp)=>{
  if (req.query.type=="user") {
    const promise = databases.createCollection(db_id, req.query.name,req.query.name,[
        Permission.read(Role.any()),                  // Anyone can view this document
        Permission.update(Role.any()), 
        Permission.create(Role.any()),     // Writers can update this document
           // Admins can update this document
        Permission.delete(Role.any()), //resp.json({'token':token})     User 5c1f88b42259e can delete this document
              // Admins can delete this document
    ]  );

 


    promise.then(function (response) {
        databases.createStringAttribute(db_id,  req.query.name, 'color',1000, true);
        databases.createStringAttribute(db_id,  req.query.name, 'user_name',1000, true,);
        databases.createStringAttribute(db_id,  req.query.name, 'user_id',1000, true,);
       
        return resp.json(true)   
    }, function (error) {
        return resp.json({'status':false})    
    });
    
  }else{
    const promise = databases.createCollection(db_id, req.query.name,req.query.name,[
        Permission.read(Role.any()),                  // Anyone can view this document
        Permission.update(Role.any()), 
        Permission.create(Role.any()),     // Writers can update this document
           // Admins can update this document
        Permission.delete(Role.any()), // User 5c1f88b42259e can delete this document
              // Admins can delete this document
    ]  );
    promise.then(function (response) {
        const res=databases.createStringAttribute(db_id,  req.query.name, 'body',1000, true);
        databases.createStringAttribute(db_id,  req.query.name, 'user_name',1000, true,);
        databases.createStringAttribute(db_id,  req.query.name, 'user_id',1000, true,);
        databases.createStringAttribute(db_id,  req.query.name, 'color',1000, true,);
        databases.createStringAttribute(db_id,  req.query.name, 'time',1000, true,);
       
        return resp.json(true)   
    }, function (error) {
        console.log(error);
    });

  }
  

}



process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    
    // Stop the express server when an uncaught exception occurs
    process.exit(1);
  });
  app.use(cors());
app.get('/access_token',nocache,genrate)
app.get('/createdb',nocache,create)
app.post('/upload', upload.single('file'), function (req, res, next) {
    // req.file contains the uploaded file
    res.send('File uploaded successfully');
  });
app.listen(port,()=>{
    console.log(port)
})