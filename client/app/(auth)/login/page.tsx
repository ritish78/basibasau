import { Metadata } from "next";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Login your account!",
  description: "Login to save and like property",
};

export default function LoginPage() {
  return <LoginForm />;
}
