import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Img,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { RxCaretRight, RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
const navHoverStyle = {
  background: "brand.700",
  color: "#fff",
  transform: " skewX(-10deg)",
  borderBottomRightRadius: "10px",
  borderTopLeftRadius: "10px",
};
const navStyle = {
  fontSize: "16px",
  fontWeight: "500",
  padding: "10px",
  transition: "all 0.3s",
  cursor: "pointer",
};
const Privacy = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const showMobileMenu = () => {
    setOpenMenu(!openMenu);
  };
  const howItWorks = useRef(null);
  const about = useRef(null);
  const faq = useRef(null);
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <VStack width={"full"} background={"#FAFCFF"} pt={[0, 0, "0px", "0px"]}>
      <Box
        width={"full"}
        position={["relative", "relative", "sticky"]}
        zIndex={"999"}
        top={["none", "none", "0"]}
        left={["none", "none", "0"]}
        p={"10px"}
        background={["brand.700", "brand.700", "#FAFCFF"]}
        boxShadow={["none", "none", "1px 3px 5px -1px rgba(169,170,176,0.47)"]}
      >
        <Box
          width={"full"}
          bg={"brand.700"}
          color={"#fff"}
          zIndex={1}
          display={["block", "block", "none"]}
        >
          <HStack
            justifyContent={"space-between"}
            alignItems="center"
            py={"10px"}
          >
            <Link to={"/"}>
              <Box>
                <Img
                  src="/assets/images/logo-inline-transparent.png"
                  width={"100px"}
                />
              </Box>
            </Link>
            {openMenu ? (
              <RxCross1 onClick={showMobileMenu} fontSize={"24px"} />
            ) : (
              <RxHamburgerMenu onClick={showMobileMenu} fontSize={"24px"} />
            )}
          </HStack>
          {openMenu && (
            <VStack
              width={"full"}
              alignItems={"flex-start"}
              mt="20px"
              justifyContent={"space-between"}
            >
              <VStack width={"full"} alignItems={"flex-start"}>
                <HStack
                  width={"full"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  py={"10px"}
                  borderBottom={"1px solid #eae8e8"}
                  onClick={() => {
                    scrollToSection(howItWorks);
                  }}
                >
                  <Text sx={navStyle} _hover={navHoverStyle}>
                    How it works
                  </Text>
                  <RxCaretRight fontSize={"24px"} />
                </HStack>

                <HStack
                  onClick={() => {
                    scrollToSection(about);
                  }}
                  width={"full"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  py={"10px"}
                  borderBottom={"1px solid #eae8e8"}
                >
                  <Text sx={navStyle} _hover={navHoverStyle}>
                    About
                  </Text>
                  <RxCaretRight fontSize={"24px"} />
                </HStack>

                <HStack
                  width={"full"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  py={"10px"}
                  borderBottom={"1px solid #eae8e8"}
                  onClick={() => {
                    scrollToSection(faq);
                  }}
                >
                  <Text sx={navStyle} _hover={navHoverStyle}>
                    FAQ
                  </Text>
                  <RxCaretRight fontSize={"24px"} />
                </HStack>
              </VStack>
            </VStack>
          )}
        </Box>
        <Container maxWidth={["full", "full", "95%", "80%"]}>
          <VStack width={"full"}>
            <HStack
              width={"full"}
              justifyContent={"space-between"}
              display={["none", "none", "flex", "flex"]}
              alignItems={"cener"}
            >
              <Link to={"/"}>
                <Image
                  width={"150px"}
                  src="/assets/images/logo-inline-whitebg.png"
                />
              </Link>
              <HStack gap={"20px"} alignItems={"center"}>
                <Text
                  onClick={() => {
                    scrollToSection(about);
                  }}
                  sx={navStyle}
                  _hover={navHoverStyle}
                >
                  About
                </Text>
                <Text
                  onClick={() => {
                    scrollToSection(howItWorks);
                  }}
                  sx={navStyle}
                  _hover={navHoverStyle}
                >
                  How it works
                </Text>

                <Text
                  onClick={() => {
                    scrollToSection(faq);
                  }}
                  sx={navStyle}
                  _hover={navHoverStyle}
                >
                  FAQ
                </Text>
                <Button
                  onClick={() => navigate("/register")}
                  background={"brand.700"}
                  size={"lg"}
                >
                  Get Started
                </Button>
                {/* <Text fontSize={"64px"} fontWeight={700}>
                  SEND THE GIFT OF CRYPTO WITH EASE
                </Text>
                <Text fontSize={"24px"}>
                  Give the Gift of Choice: Create and redeem your crypto gift
                  cards here at Gifty!
                </Text> */}
              </HStack>
            </HStack>
          </VStack>
        </Container>
      </Box>
      <Box
        width={"full"}
        position={"relative"}
        px={[0, 0, "20px"]}
        py={"20px"}
        bg={"#EDFAFD"}
        margin={0}
      >
        <Container
          mb={"40px"}
          maxWidth={["full", "full", "80%", "80%"]}
          position={"relative"}
        >
          <VStack width={"full"} alignContent={"flex-start"} gap={"30px"}>
            <VStack width={"full"} alignContent={"flex-start"} gap={"10px"}>
              <Text fontSize={["lg", "xl"]} fontWeight={"bold"}>
                Privacy Policy
              </Text>
              <Text fontSize={"2xl"}>
                Version: 1.0 - Effective Date: 01/07/2023
              </Text>
              <VStack width={"full"}>
                <PrivacySection>
                  <Text>
                    BitGifty and its affiliates (hereinafter, "the Company",
                    "we", "us" or "our") are committed to protecting and
                    respecting your privacy. In addition, we are subject to the
                    Privacy Act 1988 and the National Privacy Principles which
                    form part of that Act.
                  </Text>
                  <Text>
                    This Privacy Policy (together with our Terms and Conditions)
                    governs our collection, processing, and use of your Personal
                    Information.
                  </Text>
                  <Text>
                    "Personal Information" is information that identifies you
                    personally or by which your identity can reasonably be
                    ascertained. This may include your name, address, e-mail
                    address, and other contact details.
                  </Text>
                  <Text>
                    The purpose of this Privacy Policy is to inform you of:{" "}
                  </Text>

                  <ol>
                    <li>
                      the kinds of Personal Information which we may collect
                      about you and how it may be used;
                    </li>
                    <li>
                      our use of information regarding IP Addresses and our use
                      of cookies;
                    </li>
                    <li>
                      how your Personal Information may be disclosed to third
                      parties;
                    </li>
                    <li>
                      your ability to access, correct, update and delete your
                      Personal Information; and
                    </li>
                    <li>
                      the security measures we have in place to prevent the
                      loss, misuse, or alteration of Personal Information under
                      our control.
                    </li>
                  </ol>
                </PrivacySection>
                <PrivacySection>
                  <Text fontSize={"3xl"} fontWeight={"bold"}>
                    GATHERING AND USE OF PERSONAL INFORMATION
                  </Text>
                  <Text>
                    We may collect your Personal Information if you use this
                    website, open an Account via BitGifty.com or perform any
                    Transactions on BitGifty.com. We may also collect Personal
                    Information about you from recordings of telephone
                    conversations between us and you (or your representatives)
                    and from publicly available registers.
                  </Text>
                  Some of the Personal Information we collect is required by us
                  to meet our legal and regulatory obligations (eg, information
                  required to verify your identity). Otherwise, the Personal
                  Information we collect is required in order for us to provide
                  our services efficiently and effectively.
                  <Text>
                    The types of Personal Information which we collect may
                    include your name; your photographic identification; your
                    address; your phone number; your e-mail address; your
                    banking details including account numbers; your date of
                    birth; and information about your Transactions.
                  </Text>
                  <Text>
                    {" "}
                    We may use your Personal Information for the following
                    purposes:
                  </Text>
                  <ol>
                    <li>
                      to allow you to open and operate an Account on
                      BitGifty.com;
                    </li>
                    <li>
                      to enable you to complete Transactions on BitGifty.com;
                    </li>
                    <li>
                      to correspond with you in relation to your Account and
                      your Transactions;
                    </li>
                    <li>to analyze the use of the services we provide;</li>
                    <li>
                      as required for legal and regulatory purposes, including
                      dispute resolution purposes;
                    </li>
                    <li>
                      to provide you with information about products, services,
                      and promotions that may be of interest to you, from
                      ourselves and third parties;
                    </li>
                    <li>
                      for market research e.g. surveying our Users' needs and
                      opinions on issues, such as our performance, etc.
                    </li>
                  </ol>
                  <Text>
                    You should note that you are not obliged to give your
                    Personal Information to the Company, but if you choose not
                    to do so, we may not be able to provide our services or your
                    access to our services may be limited.
                  </Text>
                </PrivacySection>
                <PrivacySection>
                  <Text fontSize={"3xl"} fontWeight={"bold"}>
                    IP ADDRESSES
                  </Text>
                  <Text>
                    We may collect information about your computer, including
                    where available your IP address, operating system, and
                    browser type, for system administration and security
                    screening for customers who use VPN services, TOR, or any
                    other similar service. This is statistical data about our
                    users' browsing actions and patterns and does not identify
                    any individual.
                  </Text>
                </PrivacySection>
                <PrivacySection>
                  <Text fontSize={"3xl"} fontWeight={"bold"}>
                    DISCLOSURE OF PERSONAL INFORMATION
                  </Text>
                  <Text>
                    We use the Personal Information for the purposes indicated
                    at the time you provide us with such information, and/or
                    otherwise for the purposes set out in this Privacy Policy
                    and/or as otherwise permitted by law. We may make available
                    the Personal Information that you provide to us to our
                    affiliates, agents, representatives, service providers and
                    contractors for these purposes. We may share Users' Personal
                    Information with financial institutions or insurance
                    companies as required for the purposes of the Company's
                    dealings with those institutions and with other companies in
                    the case of a merger, divestiture, or other corporate
                    reorganization. We may share Users' Personal Information
                    with the Australian Securities Investments Commission,
                    AUSTRAC, any financial dispute resolution scheme to which
                    the Company subscribes, and other law enforcement bodies,
                    regulatory agencies, courts, arbitration bodies, and dispute
                    resolution schemes, both in Australia and internationally,
                    as may be required by law. If you request it in writing, we
                    may share your Personal Information with your nominated
                    advisers. Except where disclosure of your Personal
                    Information is required by law or requested by you, we will
                    generally require any third party which receives or has
                    access to Personal Information to protect such Personal
                    Information and to use it only to carry out the services
                    they are performing for you or for us unless otherwise
                    required or permitted by law. We will ensure that any such
                    third party is aware of our obligations under this Privacy
                    Policy and we will take reasonable steps to ensure that
                    contracts we enter with such third parties bind them to
                    terms no less protective of any Personal Information
                    disclosed to them than the obligations we undertake to you
                    under this Privacy Policy or which are imposed on us under
                    applicable data protection laws.
                  </Text>
                  <PrivacySection>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                      ACCESS AND CHANGING OF PERSONAL INFORMATION
                    </Text>
                    <Text>
                      You have the right to access the Personal Information we
                      hold about you, and to require the correction, updating,
                      and blocking of inaccurate and/or incorrect data by
                      sending an email to us. We will usually respond to your
                      request within 14 days. You may also request the deletion
                      or destruction of your Personal Information, your Account
                      details, or your Transaction details by sending an email
                      to us. The Company will act on your request only when it
                      is not inconsistent with its legal and regulatory
                      obligations and compliance procedures. Upon your written
                      request, we will inform you of the use and general
                      disclosure of your Personal Information. Depending on the
                      nature of your request, there may be a minimal charge for
                      accessing your Personal Information.
                    </Text>
                  </PrivacySection>
                </PrivacySection>
                <PrivacySection>
                  <Text fontSize={"3xl"} fontWeight={"bold"}>
                    GDPR (EU General Data Protection Regulation)
                  </Text>
                  <Text>
                    If you wish to access, update/correct, or request deletion
                    of your personal data, you can visit your profile page to do
                    that. You can always object to processing the of your
                    personal data, please ask us to restrict the processing of
                    your personal data or request a data export. Again, you can
                    do so here or by contacting us. You have the right to
                    complain to a data protection authority about our collection
                    and use of your personal data. For more information, please
                    contact your local data protection authority.
                  </Text>
                </PrivacySection>
                <PrivacySection>
                  <Text fontSize={"3xl"} fontWeight={"bold"}>
                    SECURITY{" "}
                  </Text>
                  <Text>
                    We take reasonable steps to protect your Personal
                    Information from misuse, loss, unauthorized access,
                    modification, or disclosure, including implementing
                    appropriate security measures. The security measures in
                    place will, from time to time, be reviewed in line with
                    legal and technical developments. However, we give no
                    guarantee that such misuse, loss, unauthorized access,
                    modification, or disclosure will not occur.
                  </Text>
                </PrivacySection>
                <PrivacySection>
                  <Text fontSize={"3xl"} fontWeight={"bold"}>
                    RETENTION OF PERSONAL INFORMATION
                  </Text>
                  <Text>
                    We will hold your Personal Information only for as long as
                    it is necessary for us to do so, having regard to the
                    purposes described in this Privacy Policy and our own legal
                    and regulatory requirements. In general, Personal
                    Information relating to your Account for at least a period
                    of five years after your Account is closed. Similarly, we
                    usually retain information about Transactions on your
                    Account for a period of five years from the date of the
                    Transaction. Personal Information which is collected for
                    other purposes will be discarded in accordance with our
                    policies in place from time to time. We are authorized to
                    provide for the victim and the involved parties in case your
                    account is related to fraudulent activities or legal
                    violations.
                  </Text>
                </PrivacySection>
                <PrivacySection>
                  <Text fontSize={"3xl"} fontWeight={"bold"}>
                    LINKS
                  </Text>
                  <Text>
                    There may be links from our Site to other sites and
                    resources provided by third parties. This Privacy Policy
                    applies only to our Site, and any correspondence had with us
                    via BitGifty.com. Accessing those third-party sites or
                    sources requires you to leave our Site. We do not control
                    those third-party sites or any of the content contained
                    therein and you agree that we are in no way responsible or
                    liable for any of those third-party sites, including,
                    without limitation, their content, policies, failures,
                    promotions, products, services or actions and/or any
                    damages, losses, failures or problems caused by, related to
                    or arising from those sites. We encourage you to review all
                    policies, rules, terms, and regulations, including the
                    privacy policies, of each site that you visit. violations.
                  </Text>
                </PrivacySection>
                <PrivacySection>
                  <Text fontSize={"2xl"} fontWeight={"bold"}>
                    CHANGES
                  </Text>
                  <Text>
                    Our policies, content, information, promotions, disclosures,
                    disclaimers, and features may be revised, modified, updated,
                    and/or supplemented at any time and without prior notice at
                    the sole and absolute discretion of the Company. If we
                    change this Privacy Policy, we will take steps to notify all
                    Users by a notice on our website and will post the amended
                    Privacy Policy on the website.
                  </Text>
                </PrivacySection>
                <PrivacySection>
                  <Text fontSize={"2xl"} fontWeight={"bold"}>
                    ACCESS RIGHTS TO PERSONAL INFORMATION
                  </Text>
                  <Text>
                    You have the right to access your Personal Information to
                    correct, update, and block inaccurate and/or incorrect data.
                    To exercise this right, contact us at contact@BitGifty.com.
                    BitGifty will respond to your request only where this is not
                    inconsistent with our Terms of Use and other legal and
                    regulatory obligations. Within 40 days of receipt of your
                    written request and payment of a £10 fee, we will provide
                    you with your Personal Information, including the purposes
                    for which it was used and to whom it was disclosed in
                    accordance with your Subject Access Request rights under the
                    Privacy Act 1988.
                  </Text>
                </PrivacySection>
                <PrivacySection>
                  <Text fontSize={"2xl"} fontWeight={"bold"}>
                    CONTACT US
                  </Text>
                  <Text>
                    If you have any questions, comments, or concerns regarding
                    our Privacy Policy and/or practices as it or they relate to
                    the Platform, please contact us at contact@bitgifty.com. If
                    you have a complaint about how your Personal Information has
                    been used, please contact us in the first instance. If we
                    cannot resolve your complaint to your satisfaction, you may
                    complain to the Privacy Commissioner who may investigate
                    your complaint further.
                  </Text>
                </PrivacySection>
              </VStack>
            </VStack>
          </VStack>
        </Container>
      </Box>
      <Box width={"full"} py={"40px"}>
        <Container maxWidth={["full", "full", "95%", "80%"]}>
          <HStack
            flexDir={["column", "column", "row", "row"]}
            gap={"20px"}
            width={"full"}
            justifyContent={"space-between"}
          >
            <VStack width={"full"} alignItems={"flex-start"}>
              <Text
                fontSize={["24px", "24px", "32px"]}
                fontWeight={"700"}
                textTransform={"uppercase"}
              >
                Bitgifty
              </Text>
              <Text fontSize={["14px", "14px", "16px"]} fontWeight={"500"}>
                Give the Gift of Choice: Create and redeem your crypto gift
                cards here at Gifty!
              </Text>
            </VStack>
            <HStack
              flexDir={["column", "column", "row", "row"]}
              justifyContent={"space-between"}
              width={"full"}
              gap={"20px"}
            >
              <VStack width={"full"} alignItems={"flex-start"}>
                <Text fontSize={["16px", "16px", "24px"]} fontWeight={"700"}>
                  Legal
                </Text>
                <Link to={"/privacy-policy"} style={{ fontSize: "14px" }}>
                  Privacy Policy
                </Link>
                <Link style={{ fontSize: "14px" }}>Help Center</Link>
                <Link style={{ fontSize: "14px" }}>Terms and Condition</Link>
              </VStack>
              <VStack width={"full"} alignItems={"flex-start"}>
                <Text fontSize={["16px", "16px", "24px"]} fontWeight={"700"}>
                  Company
                </Text>
                <Link>FAQ</Link>
                <Text
                  onClick={() => {
                    scrollToSection(about);
                  }}
                  cursor={"pointer"}
                >
                  About Us
                </Text>
                <Link to={"/contact-us"}>Contact Us</Link>
              </VStack>
              <VStack width={"full"} alignItems={"center"}>
                <Text fontSize={["16px", "16px", "24px"]} fontWeight={"700"}>
                  Socials
                </Text>
                <a href={"https://twitter.com/BitGifty"}>
                  <AiFillTwitterSquare fontSize={"24px"} />
                </a>
                <a href={"https://www.instagram.com/bitgifty/"}>
                  <AiFillInstagram fontSize={"24px"} />
                </a>
                <a href={"https://www.linkedin.com/company/bitgifty/"}>
                  <AiFillLinkedin fontSize={"24px"} />
                </a>
              </VStack>
            </HStack>
          </HStack>
        </Container>
      </Box>
    </VStack>
  );
};

export default Privacy;

const PrivacySection = (props) => {
  return (
    <VStack
      width={"full"}
      borderBottom={"1px solid grey"}
      alignItems={"flex-start"}
      py={"20px"}
      gap={"20px"}
    >
      {props.children}
    </VStack>
  );
};
