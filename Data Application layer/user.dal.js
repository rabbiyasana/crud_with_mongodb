const { MongoClient, ObjectId } = require("mongodb");
const { User } = require("../model/user.model");

class UserDAL {
  constructor() {
    this._dbClient = new MongoClient(process.env.DB_CON_STR);
    this._database = this._dbClient.db(process.env.DB_NAME);
  }

  async Add(user) {
    try {
      await this._dbClient.connect();
      const collection = this._database.collection("users");
      const result = await collection.insertOne(user);
      return result;
    } catch (error) {
      console.log(error.message);
      return null;
    } finally {
      this._dbClient.close();
    }
  }
}

// class UsersDAL {
//   constructor() {
//     this._dbClient = new MongoClient(process.env.DB_CON_STR);
//     this._database = this._dbClient.db(process.env.DB_NAME);
//   }

//   async GetAll() {
//     try {
//       await this._dbClient.connect();
//       const collection = this._database.collection("users");
//       const cursor = await collection.find();
//       const tempArray = [];
//       for await (const doc of cursor) {
//         tempArray.push(doc);
//       }
//       return tempArray;
//     } catch (ex) {
//       console.log(ex);
//       return null;
//     } finally {
//       this._dbClient.close();
//     }
//   }

//   async Login(email, password) {
//     try {
//       await this._dbClient.connect();
//       const collection = this._database.collection("users");
//       const data = await collection.findOne({
//         Email: email,
//         Password: password,
//       });
//       const user = new User(data.FullName, data.Email, data.Password, data._id);
//       if (!user) return null;
//       return user;
//     } catch (ex) {
//       console.log(ex);
//       return null;
//     } finally {
//       this._dbClient.close();
//     }
//   }

//   async GetById(id) {
//     try {
//       await this._dbClient.connect();
//       const collection = this._database.collection("users");
//       const data = await collection.findOne({
//         _id: id,
//       });
//       const user = new User(data.FullName, data.Email, data.Password, data._id);
//       if (!user) return null;
//       return user;
//     } catch (ex) {
//       console.log(ex);
//       return null;
//     } finally {
//       this._dbClient.close();
//     }
//   }
// }

// module.exports = { UsersDAL };
