const dotenv = require("dotenv")
dotenv.config();
const express = require ("express")
const app = express();
const port = Number(process.env.PORT)

// const categoryRouter = require("./routes/categoriesRoutes")
const usersRouter = require("./routes/userRoutes")


app.use(express.urlencoded({extended:false}));
app.use(express.json());

// app.use(`${process.env.API_V1}/catogries`,categoryRouter)
app.use(`${process.env.API_V1}/users`,usersRouter);

app.listen(port , ()=>{
    console.log(`server is listening to ${port}`)
})