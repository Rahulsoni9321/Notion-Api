require("dotenv").config();
import express from "express";
const app = express();
const port=4000;
import { Client } from "@notionhq/client";
import cors from "cors";
const notion = new Client({ auth: process.env.NOTION_KEY });
app.use(express.json());
console.log(process.env.NOTION_KEY);
app.use(cors());
app.post("/databases",async (req,res)=>{
    const pageid=process.env.NOTION_PAGE_ID;
    const payload = req.body;
   console.log(payload.data)

  try {  const newDb = await notion.databases.create({
        parent :{
            type : "page_id",
            //@ts-ignore
            page_id :pageid,

        },
        title :[{
          type:"text",
          text : {
            content:payload.data.dbName
          }
        }],
        properties :{
            Name :{

                title:{},
            }
        }
    })
    return res.json({message:"success",data:newDb})
}
    catch(error){
        return res.json({
            message:"Something went wrong while making a database",
            details:error
        })
    }
})


app.listen(port,()=>{
    console.log(`App is listening at ${port}`)
})