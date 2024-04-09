import { Form, redirect, Link } from "react-router-dom";
import { FormRow, SubmitBtn } from "../components";

const Register = () => {
  return (
    <main className="bg-white p-5 md:w-2/3 mx-auto">
      <section className="grid grid-cols-1 border-b-4 border-blue-950 pb-2 items-center">
        <Form method="post" className="form">
          <h1 className="mb-3 text-center">Register</h1>
          <FormRow type="text" name="name" />
          <FormRow type="email" name="email" />
          <FormRow type="password" name="password" />
          <SubmitBtn />
          <p>
            Already a Member?{" "}
            <Link to="/login" className="member-btn">
              Login
            </Link>
          </p>
        </Form>
      </section>
    </main>
  );
};
export default Register;
