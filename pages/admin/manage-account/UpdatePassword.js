import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../Alert/Alert";
import { updateUserPassword } from "../../redux/actions/users";
import { createAlert } from "../../redux/actions/alert";

const UpdatePassword = ({ updateUserPassword, createAlert }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    newPassword2: "",
  });

  const { currentPassword, newPassword, newPassword2 } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== newPassword2) {
      return createAlert("Passwords must match.", "danger");
    }
    updateUserPassword(formData);

    setFormData({
      currentPassword: "",
      newPassword: "",
      newPassword2: "",
    });
  };

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Alert />
              <h1 className="mb-2">Update Password</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    className="form-control"
                    placeholder="Current Password"
                    onChange={handleChange}
                    value={currentPassword}
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    placeholder="New Password"
                    onChange={handleChange}
                    value={newPassword}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    name="newPassword2"
                    className="form-control"
                    placeholder="Confirm New Password"
                    onChange={handleChange}
                    value={newPassword2}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Update Password"
                    className="btn btn-dark btn-block"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

UpdatePassword.propTypes = {
  updateUserPassword: PropTypes.func.isRequired,
  createAlert: PropTypes.func.isRequired,
};

export default connect(null, { updateUserPassword, createAlert })(
  UpdatePassword
);
