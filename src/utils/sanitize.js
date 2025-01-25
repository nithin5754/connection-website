import lodash from 'lodash';
const { omit } = lodash;

function userSanitize(data){
  const sanitizedObject = omit(data.toObject(), ['password',"__v"]);

  return sanitizedObject
}


export {
  userSanitize
}