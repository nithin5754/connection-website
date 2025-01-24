import userModel from "../models/user.model.js";
import { fakerProfiles } from "../utils/faker.js";
import bcrypt from 'bcrypt'
import { validateSignUpData } from "../utils/validation.js";

const signUp = async (req, res, next) => {

  try {
    
    validateSignUpData  (req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);


    const user = new userModel({
      firstName,
      lastName,
      emailId,
      password,
    });
    await user.save();

    res.status(201).json({ message: "User Added successfully!", data: user });
  } catch (error) {
    next(error);
  }
};


const loginUser = async (req, res, next) => {

  try {
    const {  emailId, password } = req.body;

  
    const user = await userModel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);

    if(isPasswordValid){
      
      res.status(200).json({ message: "User login" });
    }


  } catch (error) {
    next(error);
  }
};



const getUser = async (req, res, next) => {
  try {
    const { emailId} = req.params;

    const user =await userModel.findOne({emailId})


    res.status(200).json({message:"created",user});
  } catch (error) {
    next(error);
  }
};


const seed=async (req, res) => {


    let data=fakerProfiles()

    for (let i = 0; i < data.length; i++) {
     
      await userModel.create(data[i])
      
    }

    res.send("create seeds");
   
    
  }


export { signUp,getUser,seed,loginUser };
