//Validation
import { object, string } from "@hapi/joi";

//Register Validation
const registerValidation = (data) => {
  const schema = object({
    name: string().min(6).required(),
    email: string().min(6).required().email(),
    password: string().min(6).required(),
  });
  return schema.validate(data);
};

//Login Validation
const loginValidation = (data) => {
  const schema = object({
    email: string().min(6).required().email(),
    password: string().min(6).required(),
  });
  return schema.validate(data);
};

//Forgot Password Validation
const ForgotPasswordValidation = (data) => {
  const schema = object({
    email: string().min(6).required().email(),
    password: string().min(6).required(),
  });
  return schema.validate(data);
};

const _registerValidation = registerValidation;
export { _registerValidation as registerValidation };
const _loginValidation = loginValidation;
export { _loginValidation as loginValidation };
const _ForgotPasswordValidation = ForgotPasswordValidation;
export { _ForgotPasswordValidation as ForgotPasswordValidation };
