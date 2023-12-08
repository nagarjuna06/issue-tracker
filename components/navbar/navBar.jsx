"use client";
import Link from "next/link";
import { Container, Nav, NavItem, Navbar } from "react-bootstrap";
import { AiFillBug } from "react-icons/ai";

import { Inconsolata } from "next/font/google";
import { useEffect, useState } from "react";
import Profile from "./profile";
import { useSession } from "next-auth/react";
import { MdOutlineWbSunny } from "react-icons/md";

import { FiMoon } from "react-icons/fi";

const sourceCodePro = Inconsolata({ subsets: ["latin"], weight: "700" });

const getTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const getThemeFromLocalStorage = () => localStorage.getItem("data_bs_theme");

const NavBar = () => {
  const [theme, setTheme] = useState(true);

  const { status } = useSession();

  useEffect(() => {
    const theme = getThemeFromLocalStorage();
    if (theme) {
      setTheme(theme == "dark");
    } else {
      setTheme(getTheme());
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-bs-theme",
      theme ? "dark" : "light"
    );
    localStorage.setItem("data_bs_theme", theme ? "dark" : "light");
  }, [theme]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm sticky-top">
      <Container>
        <Link href="/" className="text-decoration-none">
          <Navbar.Brand className="fs-4">
            <AiFillBug /> <span style={sourceCodePro.style}>Issue Tracker</span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-lg-4 mt-1 gap-3">
            {status == "authenticated" ? (
              <NavItem>
                <Link href="/teams">My Teams</Link>
              </NavItem>
            ) : null}
            {status == "authenticated" ? (
              <NavItem>
                <Link href="/joined-teams">Joined Teams</Link>
              </NavItem>
            ) : null}
            <NavItem
              onClick={() => setTheme((prev) => !prev)}
              role="button"
              title="click to change theme"
            >
              {theme ? (
                <>
                  <MdOutlineWbSunny size={20} />
                  <span className="d-lg-none ms-2">Light mode</span>
                </>
              ) : (
                <>
                  <FiMoon size={20} />
                  <span className="d-lg-none ms-2">Dark mode</span>
                </>
              )}
            </NavItem>
            <Profile />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
