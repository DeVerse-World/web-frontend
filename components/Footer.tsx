/* eslint-disable react/jsx-key */
import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillFacebook, AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import FirebaseService from "../data/services/FirebaseService";
import { useContext } from "react";
import { AppContext } from "./contexts/app_context";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function FooterLink({ href, label }) {
  return (
    <Row style={{ marginBottom: "10px" }}>
      <Link href={href} prefetch={false}>
        <a className="no-underline text-white">{label}</a>
      </Link>
    </Row>
  );
}

const Footer = () => {
  const { remoteConfig } = useContext(AppContext);

  return (
    <section id="section-footer">
      <svg
        _ngcontent-qfi-c18=""
        aria-hidden="true"
        width="100%"
        height="8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern
          _ngcontent-qfi-c18=""
          id="a"
          width="91"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <g _ngcontent-qfi-c18="" clip-path="url(#clip0_2426_11367)">
            <path
              _ngcontent-qfi-c18=""
              d="M114 4c-5.067 4.667-10.133 4.667-15.2 0S88.667-.667 83.6 4 73.467 8.667 68.4 4 58.267-.667 53.2 4 43.067 8.667 38 4 27.867-.667 22.8 4 12.667 8.667 7.6 4-2.533-.667-7.6 4s-10.133 4.667-15.2 0S-32.933-.667-38 4s-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0"
              stroke="#A8C7FA"
              stroke-linecap="square"
            ></path>
          </g>
        </pattern>
        <rect
          _ngcontent-qfi-c18=""
          width="100%"
          height="100%"
          fill="url(#a)"
        ></rect>
      </svg>
      <Row style={{ margin: "50px 0px 40px 50px" }}>
        <Col>
          <span
            className="flex gap-1 items-center"
            style={{ marginBottom: "15px" }}
          >
            <Image
              src={"/images/logo.webp"}
              height={30}
              width={30}
              alt="Deverse logo"
            />
            <Image
              height={28.1}
              width={200}
              src={"/images/logo-text.webp"}
              alt="Deverse text logo"
            />
          </span>
          <h6>Copyright © Deverse World</h6>
        </Col>
      </Row>
      <Row style={{ margin: "50px 0px 40px 50px" }}>
        <Col md={2}>
          {[
            { href: "/alpha", label: "Alpha" },
            { href: "/expore", label: "Explore" },
            { href: "/create", label: "Create" },
            { href: "/docs", label: "Docs" },
          ].map((item) => (
            <FooterLink href={item.href} label={item.label} />
          ))}
        </Col>
        <Col md={2}>
          <FooterLink href="/roadmap" label="Roadmap" />
          <FooterLink href="https://docs.deverse.world/faq" label="FAQ" />
          <span
            className="cursor-pointer text-white"
            onClick={() => {
              FirebaseService.getPitchDeckUri(remoteConfig)
                .then((url) => {
                  window.open(url, "_blank");
                })
                .catch((e) => {
                  console.log(e);
                });
            }}
          >
            Pitch Deck
          </span>
        </Col>
        <Col md={3}>
          {[
            { href: "/privacy-policies", label: "Privacy Policies" },
            { href: "/term-of-use", label: "Term of Use" },
            { href: "/about", label: "About Us" },
          ].map((item) => (
            <FooterLink href={item.href} label={item.label} />
          ))}
        </Col>
        <Col md={4}>
          <h6>
            <b>Contact us</b>
          </h6>
          <div className="flex flex-row gap-5 mt-4">
            {[
              {
                title: "email",
                href: "mailto:info@cosugames.com",
                icon: <MdEmail color="#A8C7FA" fontSize="2rem" />,
              },
              {
                title: "twitter",
                href: "https://twitter.com/DeverseWorld",
                icon: <AiOutlineTwitter color="#A8C7FA" fontSize="2rem" />,
              },
              {
                title: "discord",
                href: "https://discord.gg/z6qRJN9PAp",
                icon: <FaDiscord color="#A8C7FA" fontSize="2rem" />,
              },
              {
                title: "facebook",
                href: "https://www.facebook.com/DeverseWorld/",
                icon: <AiFillFacebook color="#A8C7FA" fontSize="2rem" />,
              },
            ].map((item) => (
              <div style={{ position: "relative" }}>
                <a
                  key={item.title}
                  title={item.title}
                  target="_blank"
                  href={item.href}
                  style={{
                    top: "30%",
                    left: "30%",
                    position: "absolute",
                    zIndex: 1,
                  }}
                >
                  {item.icon}
                </a>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default memo(Footer);
