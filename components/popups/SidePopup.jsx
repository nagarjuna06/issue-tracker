"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Nav, Offcanvas } from "react-bootstrap";
import { GoSidebarExpand } from "react-icons/go";
import { teamTabs } from "@/lib/utils/tabs";

const SidePopup = ({ bg, active, teamType }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNavItemClick = (tab) => {
    router.push(tab);
    setShow(false);
  };
  const tabs = teamTabs(teamType);
  const router = useRouter();

  return (
    <>
      <GoSidebarExpand
        onClick={handleShow}
        role="button"
        size={23}
        className="me-3 d-lg-none hover-pointer"
      />
      <Offcanvas
        show={show}
        onHide={handleClose}
        responsive="lg"
        scroll={false}
        className="w-75"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav variant="pills" className="flex-column d-lg-none">
            {tabs.map((item, index) => (
              <Nav.Item key={index}>
                <Nav.Link
                  eventKey={item.tab}
                  onClick={() => handleNavItemClick(item.tab)}
                  style={{
                    backgroundColor: item.tab == active ? bg : "",
                  }}
                >
                  {item.title}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SidePopup;
