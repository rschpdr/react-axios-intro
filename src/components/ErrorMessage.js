import React from "react";

const ErrorMessage = () => {
  return (
    <div className="alert alert-danger" role="alert">
      Something bad happened. Please try again later.
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => window.location.reload(false)}
      >
        Reload Page
      </button>
    </div>
  );
};

export default ErrorMessage;
