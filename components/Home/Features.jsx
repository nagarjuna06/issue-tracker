import { Container } from "react-bootstrap";
import Image from "next/image";
const Features = () => {
  return (
    <Container className="d-flex gap-2 mt-5 flex-lg-row flex-column">
      <Container>
        <Image alt="quick" src="/quick.svg" width={60} height={60} />
        <h2>Quickly Communicate</h2>
        <p>Charts that can show the stats of the Issues</p>
      </Container>
      <Container>
        <Image
          alt="collaborate"
          src="/collaborate.svg"
          width={60}
          height={60}
        />
        <h2>Create accountability when collaborating</h2>
        <p>
          Assign each issue to a team member, so tasks always have someone
          responsible for moving them forward.
        </p>
      </Container>
      <Container>
        <Image alt="easy" src="/easy.svg" width={60} height={60} />
        <h2>Easily sort and prioritize work</h2>
        <p>
          With robust search and filters, you can see all unresolved issues and
          quickly prioritize what matters most.
        </p>
      </Container>
    </Container>
  );
};

export default Features;
