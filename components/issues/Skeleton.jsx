"use client";
import { Stack, Card, Placeholder, Container, Row, Col } from "react-bootstrap";

const IssueSkeleton = () => {
  return (
    <Container className="mt-3">
      <Row>
        <Col lg={9}>
          <Placeholder animation="glow">
            <Placeholder as="h2" xs={5} /> <br />
          </Placeholder>
          <Card className="px-3 py-2 mt-2">
            <Placeholder animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
              <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
              <Placeholder xs={1} /> <Placeholder xs={8} />{" "}
              <Placeholder xs={3} />
              <Placeholder xs={10} />
              <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
              <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
              <Placeholder xs={1} /> <Placeholder xs={8} />{" "}
              <Placeholder xs={3} />
              <Placeholder xs={10} />
            </Placeholder>
          </Card>
        </Col>
        <Col lg={2}>
          <Stack gap={3} className="mt-5">
            <Placeholder.Button variant="outline" />
            <Placeholder.Button variant="outline" />
            <Placeholder.Button variant="danger" />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default IssueSkeleton;
