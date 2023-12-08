"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Dropdown, Nav, Placeholder } from "react-bootstrap";
const Profile = () => {
  const { data, status } = useSession();

  if (status === "authenticated") {
    const { image, email, name } = data.user;
    return (
      <Dropdown align="end">
        <Dropdown.Toggle variant="transparent" className="custom-toggle">
          <>
            <Image
              src={image}
              alt="profile"
              width={40}
              height={40}
              className="rounded-circle"
              draggable={false}
            />{" "}
            <span className="d-lg-none">{name}</span>
          </>
        </Dropdown.Toggle>
        <Dropdown.Menu className="shadow">
          <Dropdown.ItemText>{email}</Dropdown.ItemText>
          <Dropdown.Item href="/api/auth/signout?callbackUrl=/">
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  } else if (status === "loading") {
    return (
      <Placeholder animation="glow">
        <Placeholder
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      </Placeholder>
    );
  } else {
    return (
      <Nav.Item>
        <Link href="/api/auth/signin?callbackUrl=/teams">Login</Link>
      </Nav.Item>
    );
  }
};

export default Profile;
