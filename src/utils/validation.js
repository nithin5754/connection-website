

import validator from 'validator';


const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password!");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};



const validateLogin=(req)=>{

  const {emailId}=req.body

  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } 



  const allowedFields = [
  "password",
    "emailId",
 
  ];

  const isAllowedFields=Object.keys(req.body).every((field)=>allowedFields.includes(field))


  if (!isAllowedFields) {
    throw new Error("only email adn password allowed");
  } 

  return isAllowedFields

}

export {
  validateEditProfileData,
  validateLogin,
  validateSignUpData
}





