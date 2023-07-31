class User{
    constructor(fullName,email,password,_id){
        if(_id){
            this._id = _id
        }
        this.FullName= fullName;
        this.Email= email;
        this.Password = password;
    }
}

module.exports ={User}