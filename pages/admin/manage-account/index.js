import { useUpdateUserMutation } from "@/services/userApi";
import Link from "next/link";
import React, { useState, useEffect } from "react";
//import { updateUserDetails } from "../../redux/actions/users";

const ManageAccountPage = () => {
  const user = useSelector((state) => state.auth)
  const [updateUser, {isLoading}] = useUpdateUserMutation()

  useEffect(() => {
    if (user) {
      const { name, email } = user;
      setUserCredentials({ name, email });
    }
  }, [user]);

  const [userCredentials, setUserCredentials] = useState({
    name: "",
    email: "",
  });

  const { name, email } = userCredentials;

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(userCredentials);
  };

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              {/* <Alert /> */}
              <h1 className="mb-2">Manage Account</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    onChange={handleChange}
                    value={name}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={handleChange}
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="submit"
                        value="Save"
                        className="btn btn-success btn-block"
                      />
                    </div>
                    <div className="col-md-6">
                      <Link
                        href="/update-password"
                        className="btn btn-secondary btn-block"
                      >
                        Update Password
                      </Link>
                    </div>
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



export default ManageAccountPage
