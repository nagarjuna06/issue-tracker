"use client";
import { useParams, useRouter } from "next/navigation";
import { Col, Nav } from "react-bootstrap";
import { teamTabs } from "@/lib/utils/tabs";

const Sidebar = ({ bg }) => {
  const returnStyles = (active) => {
    if (active) {
      return {
        backgroundColor: bg,
        fontWeight: "bold",
      };
    }
    return {};
  };
  const router = useRouter();
  const { tab, teamType } = useParams();
  const tabs = teamTabs(teamType);
  return (
    <Col lg={2} className="d-none d-lg-block pt-2" style={{ height: "90vh" }}>
      <h5 className="ps-3">Menu</h5>
      <Nav variant="pills" className="flex-column">
        {tabs.map((item, index) => (
          <Nav.Item key={index}>
            <Nav.Link
              onClick={() => router.push(item.tab)}
              style={returnStyles(item.tab == tab)}
            >
              {item.title}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  );
};

export default Sidebar;
