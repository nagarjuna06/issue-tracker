"use client";

import { Container, Spinner } from "react-bootstrap";

const CustomSpinner = () => {
  return (
    <Container>
      <div className="empty">
        <Spinner variant="primary" animation="border" />
      </div>
    </Container>
  );
};

export default CustomSpinner;
