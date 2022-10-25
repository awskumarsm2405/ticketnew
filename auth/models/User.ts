import { Schema, model, connect } from 'mongoose';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 8

interface IUser {
  name: string;
  email: string;
  password: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  password: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String }
},
{
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
  }
}
);

userSchema.pre('save', async function (next) {
 const user = this;
 if (user.isModified('password')) {
   user.password = await bcrypt.hash(user.password, saltRounds);
 }
 next();
});

interface UserModel extends mongoose.Model <IUser> {
    compare(oldpassword:String, password:String): String;
}
userSchema.static('compare', async function(oldpassword, password){
    const isMatch = bcrypt.compareSync(password, oldpassword);
    return isMatch
})

const User = model<IUser, UserModel>('User', userSchema);
export default User

