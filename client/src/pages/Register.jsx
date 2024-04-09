import { Form, redirect, Link } from "react-router-dom";
import { FormRow, SubmitBtn } from "../components";
import { jokesDBFetch } from "../utils/axiosfetchs";
import { toast } from "react-toastify";

// react router actions for the form data
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await jokesDBFetch.post("/auth/register", data);
    toast.success("Registration Successful!");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <main className="grid grid-cols-1 p-5  mx-auto items-center">
      <Form
        method="post"
        className="form max-w-md border-t-4 border-solid border-blue-950"
      >
        <h1 className="my-1 text-center text-xl">Register</h1>
        <FormRow type="text" name="name" />
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn />
        <p className="mt-4 text-center leading-6">
          Already a Member?{" "}
          <Link
            to="/login"
            className="member-btn ml-1 tracking-wide text-blue-500"
          >
            Login
          </Link>
        </p>
      </Form>
    </main>
  );
};
export default Register;
