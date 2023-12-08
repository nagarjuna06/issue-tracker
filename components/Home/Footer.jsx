import { Container } from "react-bootstrap";
import { AiFillBug } from "react-icons/ai";
import Link from "next/link";
const Footer = () => {
  return (
    <Container className="mt-5">
      <hr />
      <Container className="d-flex justify-content-between flex-lg-row flex-column gap-2">
        <AiFillBug size={35} />
        <div className="d-flex gap-lg-3 flex-lg-row flex-column">
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>&copy; All Rights Reserved</p>
        </div>
      </Container>
      <p className="text-end">
        Developed By{" "}
        <Link
          href="https://www.linkedin.com/in/nagarjuna-chenna"
          className="text-primary"
        >
          Nagarjuna Chenna
        </Link>
      </p>
    </Container>
  );
};

export default Footer;
