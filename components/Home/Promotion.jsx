import { Container, Image, Row, Col } from "react-bootstrap";
import Link from "next/link";
import CustomButton from "../Custom/CustomButton";

const Promotion = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col
          lg={6}
          className="d-flex flex-column justify-content-center align-items-start gap-3"
        >
          <h1>
            Boost Your Work: Get More Done with Our Easy Issue Tracker - Make
            Teamwork Easier and Solve Problems Faster!
          </h1>
          <Link href="/teams">
            <CustomButton>Get Started For Free</CustomButton>
          </Link>
        </Col>
        <Col lg={6}>
          <Image src="/promotion.svg" alt="promotion" draggable={false} cla />
        </Col>
      </Row>
    </Container>
  );
};

export default Promotion;
