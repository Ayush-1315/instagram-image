require("dotenv").config();
const express=require("express");
const cors=require('cors');
const helmet=require('helmet');
const bodyParser=require('body-parser');
const app=express();

const fetch=(...args)=>import('node-fetch').then(({default:fetch})=>fetch(...args));

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})
app.get("/",(req,res)=>{
    res.send("You are using bypasser!")
});

app.post("/proxy-image",async(req,res)=>{
    const {url}=req.body;

    if(!url){
        res.status(400).json({message:"URL parameter is required"});
    }
    try{
        const response=await fetch(url);

        if(!response.ok){
            res.status(500).json({message:"Error fetching image."})
        }

        res.setHeader('Content-type',response.headers.get('content-type'));

        response.body.pipe(res)
    }
    catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"})
    }
})

