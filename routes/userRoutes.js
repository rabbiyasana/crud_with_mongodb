const express=require("express");
const usersRouter=express.Router();
const { UsersController }=require('../controllers/user.controller')

const usersController=new UsersController();

usersRouter.get("/",usersController.GetAll);
usersRouter.get("/:id",usersController.GetUser);
usersRouter.post("/signup",usersController.Register);
usersRouter.post("/login",usersController.Login);


// usersRouter.post("/signup",usersController.Register);
// usersRouter.post("/login",usersController.Login);

module.exports=usersRouter;
