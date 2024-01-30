import React from "react";
import EditReviewsItems from "./EditReviewsItems";
//import Alert from "../Alert/Alert";

const EditReviews = ({ reviews }) => {
  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          {/* <Alert /> */}
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-4">Manage Reviews</h1>
              <EditReviewsItems reviews={reviews} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default EditReviews;
