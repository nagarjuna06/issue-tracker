"use client";
import { Card, Container, Placeholder } from "react-bootstrap";

const TeamsSkeleton = () => {
  return (
    <Container className="mt-2">
      <Container className="d-flex justify-content-between align-items-center">
        <Placeholder as="h3" xs={2} />
        <Placeholder.Button style={{ width: "8rem" }} />
      </Container>
      <Container className="d-flex flex-wrap gap-4 mt-4 justify-content-center justify-content-lg-start">
        {[...Array(8).keys()].map((index) => (
          <Card style={{ width: "18rem", height: "14rem" }} key={index}>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
          </Card>
        ))}
      </Container>
    </Container>
  );
};
export default TeamsSkeleton;
