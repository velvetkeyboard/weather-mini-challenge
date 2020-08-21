import React from 'react';
import {
  Link
} from "react-router-dom";

function Plans() {
  return (
    <div className="container">
      <br/>
      <br/>
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h4 className="card-title text-center">Free</h4>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Unlimited Queries</li>
              <li className="list-group-item"><strike>Save your favorite locations</strike></li>
              <li className="list-group-item"><strike>Get Email Notification</strike></li>
              <li className="list-group-item"><strike>Get WhatsApp Notification</strike></li>
            </ul>
            <div className="card-body">
              <Link className="btn btn-block btn-primary" to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h4 className="card-title text-center">$ 4,20</h4>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Unlimited Queries</li>
              <li className="list-group-item">Save your favorite locations</li>
              <li className="list-group-item"><strike>Get Email Notification</strike></li>
              <li className="list-group-item"><strike>Get WhatsApp Notification</strike></li>
            </ul>
            <div className="card-body">
              <Link className="btn btn-block btn-primary" to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h4 className="card-title text-center">$ 6,90</h4>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Unlimited Queries</li>
              <li className="list-group-item">Save your favorite locations</li>
              <li className="list-group-item">Get Email Notification</li>
              <li className="list-group-item">Get WhatsApp Notification</li>
            </ul>
            <div className="card-body">
              <Link className="btn btn-block btn-primary" to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plans;