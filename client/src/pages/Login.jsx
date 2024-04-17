import { Link, Form, redirect, useNavigate } from "react-router-dom";
import { FormRow, SubmitBtn } from "../components";
import { jokesDBFetch } from "../utils/axiosfetchs";
import { toast } from "react-toastify";

// react router actions for the form data
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await jokesDBFetch.post("/auth/login", data);
    toast.success("Login Successful!");
    return redirect("/myjokes");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  return (
    <main className="grid grid-cols-1 p-5 mx-auto">
      <Form
        method="post"
        className="form max-w-md border-t-4 border-solid border-blue-950    "
      >
        <h1 className="my-1 text-center font-bold text-xl">Login</h1>
        <FormRow type="email" name="email" placeholder="john@gmail.com" />
        <FormRow type="password" name="password" />
        <SubmitBtn />
        <p className="mt-4 text-center leading-6">
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </main>
  );
};
export default Login;
