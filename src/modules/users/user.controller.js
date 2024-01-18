
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import handleError from '../../middleware/handleError.js';
import AppError from '../../utils/appError.js';
import userModel from '../../../DB/models/user.model.js';





export const signUp =handleError(async (req, res,next) => {
console.log(req.body);
    let { userName, email, password, CPassword,phoneNumber } = req.body;
    if (password != CPassword) return next( new AppError("password and confirmed password should match", 400))
    let foundedUser = await userModel.findOne({ email });
    if (foundedUser) {
        next(new AppError("Already register", 409))
    } else {
       let hashedPassword = bcrypt.hashSync(password, Number(process.env.saltRounds));
      let addedUser = await userModel.insertMany({ userName,phoneNumber, email, password: hashedPassword });
        res.json({ message: "hello", addedUser });
    }

}
)

export const signIn = handleError(async (req, res,next) => {
  let {  email, password } = req.body;
  let foundedUser = await userModel.findOne({ email });
  if (foundedUser) {
        let matched = bcrypt.compareSync(password, foundedUser.password);
        if (matched) {
           let token = jwt.sign({ id: foundedUser._id, userName: foundedUser.userName }, process.env.tokenSecretKey, { expiresIn: 60 * 60 });
            res.json({ message: "welcome", token });
        } else {
             next(new AppError("invalid password",422))
        }
  } else {
    next(new AppError("u have to register first", 400))
  }
})
