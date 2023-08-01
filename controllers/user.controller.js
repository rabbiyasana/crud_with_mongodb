const { User } = require("../model/user.model");
const { UsersDAL } = require("../Data Application layer/user.dal");
const { ObjectId } = require("mongodb");

class UsersController {
  constructor() {}

  async GetAll(req, res) {
    return res.status(200).send(await new UsersDAL().GetAll());
  }

  async GetUser(req, res) {
    const uid = new ObjectId(req.params.id);
    const user = await new UsersDAL().GetById(uid);
    if (!user) return res.status(404).send("not found");
    return res.status(200).send(user);
  }

  async Register(req, res) {
    const user = new User(req.body.FullName, req.body.Email, req.body.Password);
    const result = await new UsersDAL().Add(user);
    if (result.insertedId) {
      user._id = result.insertedId;
      return res
        .status(201)
        .header("location", `${req.baseUrl}/${user._id}`)
        .send(user);
    }
    return res.status(500).send("failed to register user");
  }

  async Login(req, res) {
    const user = await new UsersDAL().Login(req.body.Email, req.body.Password);
    if (user) {
      const authToken = jwt.sign(user.Email, process.env.JWT_SECRET_KEY);
      return res
        .status(200)
        .header(process.env.JWT_TOKEN_HEADER, authToken)
        .send(user);
    }
    return res.status(404).send("not found");
  }

  // async Login(req,res){
  //     // req.body.Email
  //     //req.body.Password
  //     //call DAL to verify user from database
  //     //user has
  //     const authToken = jwt.sign(req.body.Email,process.env.JWT_SECRET_KEY);
  //     return res.header(process.env.JWT_TOKEN_HEADER,authToken).status(200).send("login")
  // }
}

module.exports = { UsersController };
