import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
   name: {type: String,required:true},
   username:{type: String,required:true},
   emial:{type: String,required:true},
   password:{type: String,required:true}
},{timestamps:true});


UserSchema.index({username:1},{unique:true});
UserSchema.index({username:1},{unique:true});