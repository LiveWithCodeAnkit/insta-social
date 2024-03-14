import { signUpUser } from "../../../../store/auth/users.slice";
import { signupSchema } from "../schema";
import { useDispatch } from "react-redux";
export const useSignup = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const dispatch = useDispatch();
  const handleSignupForm = async (values) => {
    try {
      const { firstName, lastName, email, password } = values;
      const payload = {
        firstName,
        lastName,
        email,
        password,
        role: "BRAND",
      };

      console.log("payload  ;;;;-", payload);
      await dispatch(signUpUser(payload));
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return {
    initialValues,
    schema: signupSchema,
    submit: handleSignupForm,
  };
};
