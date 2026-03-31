import { Metadata } from "next";
import NewPropertyForm from "./new-property-form";

export const metadata: Metadata = {
  title: "Add new property",
  description: "List a new property for sale or rent on Basibasau",
};

export default function NewPropertyPage() {
  return <NewPropertyForm />;
}
