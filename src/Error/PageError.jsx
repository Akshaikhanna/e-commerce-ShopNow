import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PageError() {
  const nav = useNavigate();
  const handleBack = () => {
    nav("/");
  }
  return (
    <div>
      <h1 className="pageerror">Page not found</h1>
      <Button onClick={handleBack} className="backtohome">Back to Home</Button>
    </div>
  );
}

export default PageError;