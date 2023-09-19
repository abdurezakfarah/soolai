import dotenv from "dotenv"

import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


switch(process.env.NODE_ENV) {
  case "development":
    dotenv.config({ path: path.resolve(__dirname, '../.env') })    
    break
  case "production":
    dotenv.config()  
    break
  
  default:
    throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`)
}

//dotenv.config({ path: path.resolve(__dirname, '../.env') })    


import express, { Request, Response} from "express"
import cors from "cors"

import connectDB from "./mongodb/connect.js"

import dalleRoutes from "./routes/dalleRoutes.js"
import postRoutes from "./routes/postRoutes.js"

const app = express();
const port = 5174;

//use middleware
app.use(cors())
app.use(express.json({ limit: '50mb'}));

//routes
app.use("/api/v1/dalle", dalleRoutes)
app.use("/api/v1/posts", postRoutes)

app.get("/api/v1", (_request: Request, response: Response) => { 
    response
        .status(200)
        .json({
            message: "hello"
            })
})


const startServer = () => {
 try {
  
  connectDB(process.env.MONGODB_URL as string)
  
  app.listen(port);
  
 } catch(error:any){
  console.log("error listining")
 }
}

startServer()



