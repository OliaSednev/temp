import * as mongoose from "mongoose";

interface IUser{
    name:string;
    password:string;
}

interface IUserModel extends IUser, mongoose.Document{};
var userSchema = new mongoose.Schema({
    name: String,
    password: String,
 });

var User = mongoose.model<IUserModel>("User", userSchema);

export = User;