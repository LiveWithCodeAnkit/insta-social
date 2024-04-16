import { signUpUser } from "../../../../store/auth/users.slice";
import { signupSchema } from "../schema";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useToastMessages } from "@/components/lib/messages/useToastMessages";

export const useSignup = ({ role }) => {
  const router = useRouter();
  const { Success, Error } = useToastMessages();
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
        role: role,
      };
      const res = await dispatch(signUpUser(payload));
      if (res.payload && res.payload.success) {
        Success(res.payload.message);
        router.push(role === "BRAND" ? "/" : "/creator");
      } else {
        Error(res.payload.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      Error("Signup failed!");
    }
  };

  return {
    initialValues,
    schema: signupSchema,
    submit: handleSignupForm,
  };
};
