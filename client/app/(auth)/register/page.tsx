import { Metadata } from "next";
import RegisterForm from "./register-form";

export const metadata: Metadata = {
  title: "Register new account",
  description: "Create a new account so you are able to post new properties and save them",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
