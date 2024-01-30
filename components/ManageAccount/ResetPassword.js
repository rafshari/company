import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Alert from "../Alert/Alert";
import { createAlert } from "../../redux/actions/alert";
import { resetPassword } from "../../redux/actions/users";

const ResetPassword = ({ resetPassword, createAlert, history, match }) => {
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });

  const { password, password2 } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      return createAlert("Passwords must match", "danger", 2500);
    }

    resetPassword({ password, resettoken: match.params.resettoken }, history);
    setFormData({ password: "", password2: "" });
  };
  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Alert />
              <h1 className="mb-2">Reset Password</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={handleChange}
                    value={password}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="password2"
                    className="form-control"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    value={password2}
                  />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="submit"
                        value="Update Password"
                        className="btn btn-success btn-block"
                      />
                    </div>
                    {/* <div className="col-md-6">
                      <Link
                        href="/update-password"
                        className="btn btn-secondary btn-block"
                      >
                        Update Password
                      </Link>
                    </div> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ResetPassword.propTypes = {
  createAlert: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

export default connect(null, { createAlert, resetPassword })(ResetPassword);
