import React, {useState} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Alert from '../Alert/Alert'
import { forgotPassword } from "../../redux/actions/users";

const ForgotPassword = ({ forgotPassword }) => {
  const [email, setEmail] = useState('')

  const handleChange = (e) => {
    setEmail( e.target.value );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(email);
  };

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Link to="/login">Back to login</Link>
              <Alert/>
              <h1 className="mb-2">Reset Password</h1>
              <p>
                {" "}
                Use this form to reset your password using the registered email
                address.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Enter Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email address"
                    onChange={handleChange}
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Reset Password"
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

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
};

export default connect(null, {forgotPassword})(ForgotPassword);
