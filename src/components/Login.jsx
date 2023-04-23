import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const onhandleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Form Submit Handler
  const onFormSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setSubmit(true);
  };

  // useEffect
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && submit) {
      console.log(formValues);
    }
  }, [formErrors]);

  // Validate Function
  const validate = (values) => {
    const errors = {};
    const regex = {
      email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      password: /^(?=.*[a-zA-Z])(?=.*\d)$/,
    };

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.email.test(values.email)) {
      errors.email = "Email is not valid!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 8) {
      errors.password = "Password contains at least 8 character!";
    }
    //  else if (!regex.password.test(values.password)) {
    //   errors.password = "Password have least one letter & one number!";
    // }
    return errors;
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-6 col-md-8 col-sm-10 mx-auto">
          <div className="mt-3 p-4 border">
            {Object.keys(formErrors).length === 0 && submit ? (
              <div className="alert alert-success" role="alert">
                Logged in successful !
              </div>
            ) : null}
            <form
              className="needs-validation"
              action=""
              method="POST"
              onSubmit={onFormSubmit}
              // noValidate
            >
              <h2 className="fw-bold mb-1">
                Login <i className="fa-solid fa-arrow-right-to-bracket"></i>
              </h2>
              <hr />

              <div className="form-outline mb-3">
                <label className="form-label" for="username">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={onhandleChange}
                  name="email"
                  value={formValues.email}
                  // required
                />
              </div>
              {/* {formErrors.email
                ? toast.warning("Email Required!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                  })
                : null} */}
              <p className="text-danger">{formErrors.email}</p>

              <div className="form-outline mb-3">
                <label className="form-label" for="password1">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={onhandleChange}
                  name="password"
                  value={formValues.password}
                  // required
                />
              </div>
              <p className="text-danger">{formErrors.password}</p>

              <div className="d-grid mb-3">
                <button className="btn btn-primary px-3" type="submit">
                  Login
                </button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
