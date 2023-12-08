import Image from "next/image";
import { Container } from "react-bootstrap";

const BugImage = ({ caption = "Caption", height = 80 }) => {
  return (
    <Container className="empty" style={{ height: `${height}vh` }}>
      <Container className="text-center small">
        <Image
          src="/empty.svg"
          alt="bug"
          width={250}
          height={250}
          draggable={false}
        />
        <p className="text-secondary small">{caption}</p>
      </Container>
    </Container>
  );
};

export default BugImage;
