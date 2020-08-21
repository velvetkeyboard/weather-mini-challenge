import React from 'react';
import {
  Link
} from "react-router-dom";


function Footer() {
  return (
    <footer className="text-muted">
      <div className="container">
        <p className="float-right">
          <Link to="#">Back to top</Link>
        </p>
        <p>© Weather Corp.</p>
      </div>
    </footer>
  );
}

export default Footer;