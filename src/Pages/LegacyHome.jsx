import "./home.css";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Container,
  HStack,
  Image,
  Img,
  Select,
  Text,
  VStack,
  keyframes,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { motion, wrap } from "framer-motion";

import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu, RxCross1, RxCaretRight } from "react-icons/rx";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";

const animationKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translateX(80%);
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: translateX(0%);
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
`;
const animation = `${animationKeyframes} 2s ease-out `;
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
const Home = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const languageValue = e.target.value;
    localStorage.setItem("localeLang", languageValue);
    i18n.changeLanguage(languageValue);
  };

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
  const heroText = t("heroText").toLowerCase().split("crypto");
  return (
    <VStack
      width={"full"}
      background={"#FAFCFF"}
      pt={[0, 0, "0px", "0px"]}
      gap={"40px"}
    >
      <Box
        width={"full"}
        position={["relative", "relative", "sticky"]}
        zIndex={"999"}
        top={["none", "none", "0"]}
        left={["none", "none", "0"]}
        p={"10px"}
        background={["brand.700", "brand.700", "#FAFCFF"]}
        boxShadow={["none", "none", "2px 3px 5px -1px rgba(169,170,176,0.47)"]}
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
                <HStack
                  width={"full"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  py={"10px"}
                  borderBottom={"1px solid #eae8e8"}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <Text sx={navStyle} _hover={navHoverStyle}>
                    Login
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
                    scrollToSection("/register");
                  }}
                >
                  <Text sx={navStyle} _hover={navHoverStyle}>
                    Sign Up
                  </Text>
                  <RxCaretRight fontSize={"24px"} />
                </HStack>
              </VStack>
            </VStack>
          )}
        </Box>
        <Container maxWidth={["full", "full", "95%", "80%"]}>
          <HStack
            width={"full"}
            justifyContent={"space-between"}
            display={["none", "none", "flex", "flex"]}
            alignItems={"cener"}
          >
            <Box>
              <Image
                width={"150px"}
                src="/assets/images/logo-inline-whitebg.png"
              />
            </Box>
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
                onClick={() => navigate("/login")}
                background={"brand.700"}
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/register")}
                background={"#fff"}
                color={"brand.700"}
                borderColor={"brand.700"}
                borderWidth={"1px"}
                borderStyle={"solid"}
                _hover={{ color: "brand.700" }}
              >
                Sign Up
              </Button>
              <Select
                defaultValue={localStorage.getItem("localeLang")}
                onChange={handleLanguageChange}
                width={"70px"}
                style={{ fontSize: "14px", border: "1px solid gray" }}
              >
                <option value={"en"}>EN</option>
                <option value={"es"}>ES</option>
              </Select>
            </HStack>
          </HStack>
        </Container>
      </Box>
      <Box width={"full"} position={"relative"}>
        <Container
          my={"40px"}
          maxWidth={["full", "full", "95%", "80%"]}
          position={"relative"}
        >
          <HStack
            flexDir={["column", "column", "column", "column", "row"]}
            gap={"20px"}
          >
            <VStack
              alignItems={"flex-start"}
              width={["full", "full", "full", "895px"]}
              position={"relative"}
              gap={5}
              as={motion.div}
              animation={animation}
            >
              <Text
                fontSize={["32px", "32px", "42px", "52px"]}
                maxW={"500px"}
                fontWeight={"900"}
                lineHeight={["60px", "60px", "78px", "80px"]}
              >
                {t("heroText")}
                {/* CREATE AND REDEEM CRYPTO GIFT CARDS WITH EASE */}
              </Text>

              <Text
                fontSize={["18px", "18px", "24px", "24px"]}
                maxWidth={"500px"}
                fontWeight={"500"}
              >
                {t("heroCaption")}
              </Text>
              <Button size={"lg"} onClick={() => navigate("/register")}>
                {t("heroButton")}
              </Button>
            </VStack>
            <Image
              // position={"absolute"}
              // right={"-30%"}
              // bottom={"-10%"}
              // zIndex={0}
              maxW={["auto", "auto", "580px", "580px"]}
              src="/assets/images/home-hero1.png"
            />
          </HStack>
        </Container>
      </Box>
      <Box width={"full"}>
        <Container
          maxWidth={["full", "full", "95%", "80%"]}
          pb={["50px", "50px", "300px", "300px", "200px"]}
        >
          <HStack width={"full"} flexWrap={["wrap", "wrap", "nowrap"]}>
            <VStack width={"full"} alignItems={"flex-start"} gap={"50px"}>
              <VStack width={"full"}>
                <Text
                  textTransform={"capitalize"}
                  fontSize={"3.3rem"}
                  fontWeight={"600"}
                  color={"rgba(18, 18, 18, 1)"}
                >
                  {heroText[0]}{" "}
                  <span style={{ color: "rgba(16, 61, 150, 1)" }}>Crypto</span>
                  {heroText[1]}
                </Text>
                <Text fontSize={"1.25rem"} color={"#333"}>
                  {t("heroCaption")}
                </Text>
              </VStack>
              <Button
                background={
                  " linear-gradient(106.07deg, #103D96 27.69%, #306FE9 102.01%)"
                }
                width={"200px"}
                fontSize={"1rem"}
                borderRadius={"none"}
              >
                {t("heroButton")}
              </Button>
              <HStack
                width={"full"}
                flexDir={["column", "column", "row"]}
                gap={"10px"}
              >
                <HStack flexDir={["column", "column", "row"]}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M25.3327 12C25.3333 10.3932 24.919 8.81348 24.1301 7.41372C23.3411 6.01396 22.2041 4.84159 20.8292 4.0101C19.4543 3.17861 17.888 2.71616 16.2819 2.66752C14.6758 2.61887 13.0844 2.98568 11.6617 3.73244C10.239 4.4792 9.03313 5.58061 8.16089 6.93005C7.28865 8.2795 6.77957 9.83127 6.68292 11.4352C6.58627 13.039 6.90532 14.6407 7.6092 16.0851C8.31307 17.5296 9.37793 18.7678 10.7007 19.68L6.66602 26.6667L9.67402 26.7907L11.2847 29.3333L15.906 21.328C15.938 21.328 15.9674 21.3333 15.9994 21.3333C16.0314 21.3333 16.0607 21.3293 16.0927 21.328L20.714 29.3333L22.3567 26.8453L25.3327 26.6667L21.298 19.68C22.5428 18.8229 23.5605 17.676 24.2634 16.3381C24.9663 15.0001 25.3333 13.5113 25.3327 12ZM9.33268 12C9.33268 10.6815 9.72368 9.39254 10.4562 8.29621C11.1888 7.19988 12.23 6.3454 13.4481 5.84082C14.6663 5.33623 16.0067 5.20421 17.3 5.46144C18.5932 5.71868 19.781 6.35362 20.7134 7.28597C21.6457 8.21832 22.2807 9.4062 22.5379 10.6994C22.7952 11.9926 22.6631 13.3331 22.1585 14.5512C21.654 15.7694 20.7995 16.8106 19.7032 17.5431C18.6068 18.2757 17.3179 18.6667 15.9994 18.6667C14.2312 18.6667 12.5355 17.9643 11.2853 16.7141C10.0351 15.4638 9.33268 13.7681 9.33268 12Z"
                      fill="#103D96"
                    />
                    <path
                      d="M16 16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8C13.7909 8 12 9.79086 12 12C12 14.2091 13.7909 16 16 16Z"
                      fill="#103D96"
                    />
                  </svg>{" "}
                  <VStack
                    alignItems={["center", "center", "flex-start"]}
                    textAlign={["center", "center", "left"]}
                  >
                    <Text
                      fontSize={"1rem"}
                      fontWeight={"600"}
                      textTransform={"uppercase"}
                    >
                      Reliability
                    </Text>
                    <Text fontSize={"0.75rem"} maxW={"120px"}>
                      100% reliable and peace of mind
                    </Text>
                  </VStack>
                </HStack>
                <HStack flexDir={["column", "column", "row"]}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M25.3327 12C25.3333 10.3932 24.919 8.81348 24.1301 7.41372C23.3411 6.01396 22.2041 4.84159 20.8292 4.0101C19.4543 3.17861 17.888 2.71616 16.2819 2.66752C14.6758 2.61887 13.0844 2.98568 11.6617 3.73244C10.239 4.4792 9.03313 5.58061 8.16089 6.93005C7.28865 8.2795 6.77957 9.83127 6.68292 11.4352C6.58627 13.039 6.90532 14.6407 7.6092 16.0851C8.31307 17.5296 9.37793 18.7678 10.7007 19.68L6.66602 26.6667L9.67402 26.7907L11.2847 29.3333L15.906 21.328C15.938 21.328 15.9674 21.3333 15.9994 21.3333C16.0314 21.3333 16.0607 21.3293 16.0927 21.328L20.714 29.3333L22.3567 26.8453L25.3327 26.6667L21.298 19.68C22.5428 18.8229 23.5605 17.676 24.2634 16.3381C24.9663 15.0001 25.3333 13.5113 25.3327 12ZM9.33268 12C9.33268 10.6815 9.72368 9.39254 10.4562 8.29621C11.1888 7.19988 12.23 6.3454 13.4481 5.84082C14.6663 5.33623 16.0067 5.20421 17.3 5.46144C18.5932 5.71868 19.781 6.35362 20.7134 7.28597C21.6457 8.21832 22.2807 9.4062 22.5379 10.6994C22.7952 11.9926 22.6631 13.3331 22.1585 14.5512C21.654 15.7694 20.7995 16.8106 19.7032 17.5431C18.6068 18.2757 17.3179 18.6667 15.9994 18.6667C14.2312 18.6667 12.5355 17.9643 11.2853 16.7141C10.0351 15.4638 9.33268 13.7681 9.33268 12Z"
                      fill="#103D96"
                    />
                    <path
                      d="M16 16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8C13.7909 8 12 9.79086 12 12C12 14.2091 13.7909 16 16 16Z"
                      fill="#103D96"
                    />
                  </svg>{" "}
                  <VStack
                    alignItems={["center", "center", "flex-start"]}
                    textAlign={["center", "center", "left"]}
                  >
                    <Text
                      fontSize={"1rem"}
                      fontWeight={"600"}
                      textTransform={"uppercase"}
                    >
                      Trustworthy
                    </Text>
                    <Text fontSize={"0.75rem"} maxW={"120px"}>
                      100% Secure and Trustworthy
                    </Text>
                  </VStack>
                </HStack>
                <HStack flexDir={["column", "column", "row"]}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M25.3327 12C25.3333 10.3932 24.919 8.81348 24.1301 7.41372C23.3411 6.01396 22.2041 4.84159 20.8292 4.0101C19.4543 3.17861 17.888 2.71616 16.2819 2.66752C14.6758 2.61887 13.0844 2.98568 11.6617 3.73244C10.239 4.4792 9.03313 5.58061 8.16089 6.93005C7.28865 8.2795 6.77957 9.83127 6.68292 11.4352C6.58627 13.039 6.90532 14.6407 7.6092 16.0851C8.31307 17.5296 9.37793 18.7678 10.7007 19.68L6.66602 26.6667L9.67402 26.7907L11.2847 29.3333L15.906 21.328C15.938 21.328 15.9674 21.3333 15.9994 21.3333C16.0314 21.3333 16.0607 21.3293 16.0927 21.328L20.714 29.3333L22.3567 26.8453L25.3327 26.6667L21.298 19.68C22.5428 18.8229 23.5605 17.676 24.2634 16.3381C24.9663 15.0001 25.3333 13.5113 25.3327 12ZM9.33268 12C9.33268 10.6815 9.72368 9.39254 10.4562 8.29621C11.1888 7.19988 12.23 6.3454 13.4481 5.84082C14.6663 5.33623 16.0067 5.20421 17.3 5.46144C18.5932 5.71868 19.781 6.35362 20.7134 7.28597C21.6457 8.21832 22.2807 9.4062 22.5379 10.6994C22.7952 11.9926 22.6631 13.3331 22.1585 14.5512C21.654 15.7694 20.7995 16.8106 19.7032 17.5431C18.6068 18.2757 17.3179 18.6667 15.9994 18.6667C14.2312 18.6667 12.5355 17.9643 11.2853 16.7141C10.0351 15.4638 9.33268 13.7681 9.33268 12Z"
                      fill="#103D96"
                    />
                    <path
                      d="M16 16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8C13.7909 8 12 9.79086 12 12C12 14.2091 13.7909 16 16 16Z"
                      fill="#103D96"
                    />
                  </svg>{" "}
                  <VStack
                    alignItems={["center", "center", "flex-start"]}
                    textAlign={["center", "center", "left"]}
                  >
                    <Text
                      fontSize={"1rem"}
                      fontWeight={"600"}
                      textTransform={"uppercase"}
                    >
                      Speed
                    </Text>
                    <Text fontSize={"0.75rem"} maxW={"120px"}>
                      Create and redeem gift cards in seconds
                    </Text>
                  </VStack>
                </HStack>
              </HStack>
            </VStack>
            <VStack
              width={"full"}
              alignItems={["center", "center", "flex-end"]}
            >
              <Image src="/assets/images/hero-1.png" />
            </VStack>
          </HStack>
        </Container>
      </Box>
      <Box width={"full"} py={"40px"}>
        <Container
          maxWidth={["full", "full", "95%", "80%"]}
          pb={["50px", "50px", "300px", "300px", "200px"]}
        >
          <HStack
            width={"full"}
            justifyContent={"space-between"}
            flexDir={["column", "column", "row", "row"]}
            gap={"40px"}
          >
            <InfoCard
              title={"create crypto gift cards"}
              icon={"/assets/icons/info-icon1.png"}
              description={
                "BitGifty allows you to create your BTC, ETH, CELO, TRX... gift cards easily in just a few clicks."
              }
            />
            <InfoCard
              title={"Redeem crypto gift cards"}
              icon={"/assets/icons/info-icon2.png"}
              description={
                "BitGifty allows you to redeem your BTC, ETH, CELO, TRX... gift cards easily in just a few clicks."
              }
            />
            <InfoCard
              title={"CUSTOMISED GIFT CARD DESIGNS"}
              icon={"/assets/icons/info-icon3.png"}
              description={
                "Choose from the wide array of colorful gift card designs appropriate for the recipient"
              }
            />
          </HStack>
        </Container>
      </Box>
      <Box width={"full"} position="relative" pb={"100px"} ref={about}>
        <Container
          maxWidth={["full", "full", "95%", "80%"]}
          position={"relative"}
        >
          <VStack position={"relative"} width={"full"} gap={"80px"}>
            <HStack
              background={"url(/assets/images/pattern_img.png)"}
              position={[
                "relative",
                "relative",
                "absolute",
                "absolute",
                "absolute",
              ]}
              bgRepeat={"no-repeat"}
              backgroundSize={["cover", "cover", "cover", "90%"]}
              top={[null, null, "-330px", "-330px", "-100px"]}
              gap={"40px"}
              justifyContent={["center"]}
              // flexDir={["column", "column", "row", "row"]}
              wrap={"wrap"}
            >
              <ResultCard value={"100+"} text={"Gift cards created"} />
              <ResultCard value={"100+"} text={"Giftcards redeemed"} />
              <ResultCard value={"500+"} text={"Active gifters"} />
            </HStack>
            <VStack width={"full"} gap={"30px"} ref={about}>
              <VStack width={"full"} pt={[0, 0, "200px", "300px"]}>
                <Text
                  fontSize={["32px", "32px", "40px", "48px"]}
                  fontWeight={"700"}
                >
                  ABOUT US
                </Text>
                <Text
                  textAlign={"center"}
                  px={["10px", "10px", "25px", "50px"]}
                  fontSize={["16px", "16px", "16px", "24px"]}
                >
                  Bitgifty is a platform which allows users create and redeem
                  crypto gift cards easily in just few clicks
                </Text>
              </VStack>
              <VStack
                mt={"300px"}
                width={"full"}
                alignItems={"flex-start"}
                gap={["40px", "40px", "80px", "80px"]}
                position={"relative"}
              >
                <HStack
                  width={"full"}
                  justifyContent={"space-between"}
                  flexDir={["column", "column", "row", "row"]}
                  alignItems={["", "", "flex-start", "flex-start"]}
                  gap={"20px"}
                >
                  <AboutCard
                    title={"For Remittance"}
                    description={
                      "Want to send some money to your friends and family in another country? Send it in style! Create a Crypto gift card specially for them. Show them how much you appreciate them."
                    }
                    icon={"/assets/icons/about-icon1.png"}
                  />
                  <AboutCard
                    title={"For Crypto Trading"}
                    description={
                      "Don't be boring! You don't have to trade your Bitcoin the same way all the time. Do it differently this time. Create a Bitcoin gift card and send it to the buyer. It is so much easier and faster."
                    }
                    icon={"/assets/icons/about-icon2.png"}
                  />
                </HStack>
                <HStack
                  width={"full"}
                  justifyContent={"space-between"}
                  flexDir={["column", "column", "row", "row"]}
                  gap={"20px"}
                  alignItems={["", "", "flex-start", "flex-start"]}
                >
                  <AboutCard
                    title={"For Reward Programs"}
                    description={
                      "How do you say 'thank you' to your loyal staffs and customers? BitGifty provides a creative and seamless way for you to reward them. Get a Custom Gift card design for your company."
                    }
                    icon={"/assets/icons/about-icon2.png"}
                  />
                  <AboutCard
                    title={"For Web3 Gaming"}
                    description={
                      "Want to monetize the accessories of your Web3 game? At BitGifty, we can help create you own custom Gift card using your platform's crypto or any other crypto of your choice."
                    }
                    icon={"/assets/icons/about-icon3.png"}
                  />
                </HStack>

                <hr
                  style={{
                    borderColor: "#38C7E7",
                    width: "450px",
                    position: "absolute",
                    top: "50%",
                  }}
                />
                <hr
                  style={{
                    borderColor: "#38C7E7",

                    width: "450px",
                    position: "absolute",
                    top: "50%",
                    right: 0,
                  }}
                />
                <hr
                  style={{
                    borderColor: "#38C7E7",
                    width: "220px",
                    position: "absolute",
                    top: "20%",
                    left: "40%",

                    transform: "rotate(90deg)",
                  }}
                />
                <hr
                  style={{
                    borderColor: "#38C7E7",
                    width: "220px",
                    position: "absolute",
                    bottom: "20%",
                    left: "40%",

                    transform: "rotate(90deg)",
                  }}
                />
              </VStack>
            </VStack>
          </VStack>
        </Container>
      </Box>
      <Box width={"full"} position={"relative"}>
        <Container
          py={"70px"}
          maxWidth={["full", "full", "95%", "80%"]}
          position={"relative"}
          px={"40px"}
          background={
            "linear-gradient(234.75deg, #7CA6F8 -8.55%, #DFF7F4 34.87%, #DCE6F9 75.49%, #F7FCFD 110.11%)"
          }
        >
          <VStack
            color={"#121212"}
            alignItems={"flex-start"}
            gap={"40px"}
            position={"relative"}
          >
            <VStack position={"relative"} alignItems={"flex-start"}>
              {" "}
              <Text
                textTransform={"uppercase"}
                fontWeight={"700"}
                fontSize={["28px", "32px", "48px", "48px"]}
              >
                Create your Gift card
              </Text>
              <Text fontSize={"24px"} maxWidth={"600px"}>
                Send Crypto to your Friends and Family in Style - Create Bitcoin
                Giftcards in Seconds here at BitGifty!
              </Text>
            </VStack>
            <Button
              _hover={{ color: "#fff", background: "brand.700" }}
              onClick={() => navigate("/register")}
            >
              Get started
            </Button>
          </VStack>
        </Container>
        <Image
          position="absolute"
          src="/assets/images/apphero.png"
          width={"450px"}
          right={190}
          bottom={0}
          display={["none", "none", "block", "block"]}
        />
      </Box>
      <Box
        width={"full"}
        position={"relative"}
        py={"40px"}
        backgroundSize={"cover"}
        backgroundPosition={"left center"}
        backgroundImage={[
          "url(/assets/images/confettibg2.png)",
          "url(/assets/images/confettibg2.png)",
          "none",
        ]}
        ref={howItWorks}
      >
        <Container
          maxWidth={["full", "full", "95%", "80%"]}
          position={"relative"}
        >
          <VStack
            alignItems={"flex-start"}
            gap={"40px"}
            width={"full"}
            position={"relative"}
          >
            <HStack
              width={"full"}
              alignItems={"flex-start"}
              justifyContent={"space-between"}
              position={"relative"}
              flexDir={["column", "column", "row", "row"]}
            >
              <VStack alignItems={"flex-start"}>
                <Text
                  fontSize={["32px", "32px", "40px", "48px"]}
                  fontWeight={"700"}
                >
                  How it works
                </Text>
                <Image
                  width={"380px"}
                  src={"/assets/images/male-hero.png"}
                  display={["none", "none", "block", "block"]}
                />
              </VStack>
              <VStack
                alignItems={"flex-start"}
                gap={"20px"}
                position={"relative"}
              >
                <Text
                  fontSize={["16px", "16px", "24px", "24px"]}
                  maxW={"500px"}
                >
                  Here are 4 simple steps on how to use BitGifty
                </Text>
                <VStack
                  width={"full"}
                  alignItems={["center", "center", "flex-start", "flex-start"]}
                  gap={"30px"}
                >
                  <GuideCard
                    index={1}
                    title={"choose cryptocurrency"}
                    description={"Select the cryptocurrency you want to gift."}
                    image={"/assets/images/choosecoin.jpg"}
                  />
                  <GuideCard
                    index={2}
                    title={"Select gift card value"}
                    description={
                      "Choose the value of the gift card you want to buy.."
                    }
                    image={"/assets/images/inputamount.jpg"}
                  />
                  <GuideCard
                    index={3}
                    title={"Personalize the gift card"}
                    description={
                      "Add a personal message and choose a design for the gift card."
                    }
                    image={"/assets/images/giftcard.jpg"}
                  />
                  <GuideCard
                    index={4}
                    title={"Buy Gift Card "}
                    description={"Click on the 'create gift card' button"}
                    image={"/assets/images/giftcard.jpg"}
                  />
                  <hr
                    style={{
                      borderColor: "#38C7E7",
                      width: "50px",
                      transform: "rotate(90deg)",
                      position: "absolute",
                      top: "30%",
                      left: "0",
                    }}
                  />
                  <hr
                    style={{
                      borderColor: "#38C7E7",
                      width: "50px",
                      transform: "rotate(90deg)",
                      position: "absolute",
                      top: "53%",
                      left: "0",
                    }}
                  />
                  <hr
                    style={{
                      borderColor: "#38C7E7",
                      width: "50px",
                      transform: "rotate(90deg)",
                      position: "absolute",
                      top: "75.5%",
                      left: "0",
                    }}
                  />
                </VStack>
              </VStack>
            </HStack>
          </VStack>
          <HStack
            width={"full"}
            flexDir={["column", "column", "row", "row"]}
            background={
              "linear-gradient(234.75deg, #7CA6F8 -8.55%, #DFF7F4 34.87%, #DCE6F9 75.49%, #F7FCFD 110.11%)"
            }
            padding={"20px"}
            gap={"20px"}
            borderRadius={"30px"}
            mt={"100px"}
          >
            <Image
              src="assets/images/mobile-hero.png"
              width={["150px", "150px", "350px", "350px"]}
            />
            <VStack gap={"20px"} alignItems={"flex-start"}>
              <Text
                fontSize={["24px", "24px", "48px", "48px"]}
                textTransform={"uppercase"}
                fontWeight={700}
                maxW={"600px"}
                color={"#121212"}
              >
                Introducing Bitgifty for ios and android
              </Text>
              <Text
                color={"#121212"}
                fontSize={["14px", "14px", "24px", "24px"]}
                maxW={"500px"}
              >
                Bitgifty App will soon available for download on mobile devices
                around the world on the App & Play Stores.
              </Text>
            </VStack>
          </HStack>
        </Container>
      </Box>
      <Box
        width={"full"}
        position={"relative"}
        py={"40px"}
        bgColor={"#EDFAFD"}
        bgImg={"url(assets/images/bgstars.png)"}
        bgSize={"contain"}
        bgRepeat={"no-repeat"}
        bgPosition={"left"}
        ref={faq}
      >
        <Container
          maxWidth={["full", "full", "95%", "80%"]}
          position={"relative"}
        >
          <VStack width={"full"}>
            <Text textAlign={"center"} fontSize={"48px"} fontWeight={"700"}>
              FAQ
            </Text>
            <Accordion allowToggle width={"full"}>
              <AccordionItem
                bg={"#C6E3F5"}
                alignItems={"flex-start"}
                width={"full"}
                p={"10px"}
                border={"2px solid #103D96"}
                borderRadius={"10px"}
                my={"10px"}
              >
                <AccordionButton _hover={{ bg: "none" }}>
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontSize={"16px"} fontWeight={"500"}>
                      How long does it take too create and redeem gift cards?
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Text fontSize={"16px"}>
                    Literally seconds. You can create any gIft card very quickly
                    in just a few steps.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem
                bg={"#C6E3F5"}
                alignItems={"flex-start"}
                width={"full"}
                p={"10px"}
                border={"2px solid #103D96"}
                borderRadius={"10px"}
                my={"10px"}
              >
                <AccordionButton _hover={{ bg: "none" }}>
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontSize={"16px"} fontWeight={"500"}>
                      What crypto do you support?
                    </Text>{" "}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <Text fontSize={"16px"}>
                    At the moment, you can create gift cards with Bitcoin (BTC),
                    Ethereum (ETH), Tron (TRX) and Celo. We are currently
                    working tirelessly on adding more cryptocurrencies.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem
                bg={"#C6E3F5"}
                alignItems={"flex-start"}
                width={"full"}
                p={"10px"}
                border={"2px solid #103D96"}
                borderRadius={"10px"}
                my={"10px"}
              >
                <AccordionButton _hover={{ bg: "none" }}>
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontSize={"16px"} fontWeight={"500"}>
                      How much gift card can I create?
                    </Text>{" "}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <Text fontSize={"16px"}>
                    You can create as many gift cards as you want in any amount
                    that you like.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem
                bg={"#C6E3F5"}
                alignItems={"flex-start"}
                width={"full"}
                p={"10px"}
                border={"2px solid #103D96"}
                borderRadius={"10px"}
                my={"10px"}
              >
                <AccordionButton _hover={{ bg: "none" }}>
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontSize={"16px"} fontWeight={"500"}>
                      I don't see the gift card design of my choice, can I
                      customise my disign?
                    </Text>{" "}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <Text fontSize={"16px"}>
                    Definitely. You can reach out to the BitGifty team and we
                    will create a design specially for you."
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </VStack>
          <Ruler />
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
                </Link>{" "}
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

export default Home;

const InfoCard = (props) => {
  return (
    <VStack alignItems={["center", "center", "flex-start", "flex-start"]}>
      <HStack
        padding={"10px"}
        background={
          "linear-gradient(234.75deg, #7CA6F8 -8.55%, #DFF7F4 34.87%, #DCE6F9 75.49%, #F7FCFD 110.11%)"
        }
        borderRadius={"50%"}
      >
        <HStack padding={"15px"} background={"brand.700"} borderRadius={"50%"}>
          <Image width={"32px"} src={props.icon} />
        </HStack>
      </HStack>
      <hr style={{ borderColor: "rgba(71, 127, 235, 1)", width: "200px" }} />
      <VStack
        alignItems={["center", "center", "flex-start", "flex-start"]}
        color={" #121212"}
        maxW={"350px"}
      >
        <Text
          textTransform={"uppercase"}
          textAlign={["center", "center", "left", "left"]}
          fontSize={["16px", "18px", "24px", "24px"]}
          fontWeight={"700"}
          as={motion.div}
          animation={animation}
        >
          {" "}
          {props.title}
        </Text>
        <VStack
          alignItems={["center", "center", "flex-start", "flex-start"]}
          gap={0}
        >
          <Text
            textAlign={["center", "center", "left", "left"]}
            fontSize={"14px"}
            as={motion.div}
            animation={animation}
          >
            {props.description}
          </Text>
        </VStack>
      </VStack>
    </VStack>
  );
};
const AboutCard = (props) => {
  return (
    <HStack
      alignItems={"flex-start"}
      gap={"20px"}
      flexDir={["column", "column", "row", "row"]}
    >
      <HStack padding={"15px"} background={"brand.700"} borderRadius={"10px"}>
        <Image width={"32px"} src={props.icon} />
      </HStack>

      <VStack alignItems={"flex-start"} color={"#000"} maxW={"350px"}>
        <Text textTransform={"uppercase"} fontSize={"24px"} fontWeight={"700"}>
          {" "}
          {props.title}
        </Text>
        <Text fontSize={["14px", "14px", "18px", "18px"]}>
          {props.description}
        </Text>
      </VStack>
    </HStack>
  );
};
const GuideCard = (props) => {
  return (
    <HStack
      alignItems={["center", "center", "flex-start"]}
      gap={"20px"}
      height={["", "", "", "", "100px"]}
      boxSizing={["", "", "", "", "border-box"]}
      flexDir={["column", "column", "row", "row"]}
    >
      <HStack
        width={"50px"}
        height={"50px"}
        border={"1px solid #38C7E7"}
        borderRadius={"50%"}
        justifyContent={"center"}
      >
        <Text fontSize={"24px"} fontWeight={"400"}>
          {" "}
          {props.index}
        </Text>
      </HStack>

      <VStack
        alignItems={["center", "center", "flex-start"]}
        color={"#000"}
        maxW={"350px"}
      >
        <Image
          display={["inline-block", "inline-block", "none", "none"]}
          width={"300px"}
          borderRadius={"10px"}
          src={props.image}
        />
        <Text
          textTransform={"capitalize"}
          fontSize={["16px", "18px", "24px", "24px"]}
          fontWeight={"700"}
        >
          {" "}
          {props.title}
        </Text>
        <Text
          maxW={"300px"}
          textAlign={["center", "center", "left", "left"]}
          fontSize={"14px"}
        >
          {props.description}
        </Text>
      </VStack>
    </HStack>
  );
};
const ResultCard = ({ text, value }) => {
  return (
    <VStack
      borderRadius={["50%", "50%", "100px", "10px"]}
      width={["150px", "150px", "250px", "300px"]}
      height={["150px", "150px", "250px", "300px"]}
      justifyContent={"center"}
      background={"#EDFAFD"}
      cursor={"pointer"}
    >
      <Text
        fontSize={["32px", "32px", "42px", "64px"]}
        lineHeight={["30px", "30px", "78px", "80px"]}
        fontWeight={"600"}
      >
        {value}
      </Text>
      <Text
        textAlign={["center", "center", "", "", ""]}
        maxW={["100px", "100px", "300px", "300px", "400px"]}
        fontSize={["16px", "18px", "24px", "24px"]}
        fontWeight={"600"}
      >
        {text}
      </Text>
    </VStack>
  );
};

const Ruler = (props) => {
  return (
    <Box
      as={motion.div}
      height={"2px"}
      bg={"#38C7E7"}
      width={props.width}
      position={"absolute"}
      top={props.top}
      bottom={props.bottom}
      left={props.left}
      right={props.right}
      transform={`rotate(${props.degree})`}
    ></Box>
  );
};
