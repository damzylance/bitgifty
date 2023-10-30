import "./home.css";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Img,
  Input,
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
import {
  RxHamburgerMenu,
  RxCross1,
  RxCaretRight,
  RxArrowRight,
  RxArrowLeft,
} from "react-icons/rx";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { MdArrowLeft } from "react-icons/md";

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
  const heroText = t("heroText").toLowerCase().split("bitcoin");
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
                borderRadius={"none"}
                background={
                  " linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)"
                }
                _hover={{
                  background:
                    "linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
                }}
                variant={"solid"}
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

      <Box width={"full"}>
        <Container
          maxWidth={["full", "full", "95%", "80%"]}
          pb={["50px", "50px", "100px", "100px", "100px"]}
        >
          <HStack
            width={"full"}
            flexDir={["column-reverse", "column-reverse", "row"]}
            flexWrap={["wrap", "wrap", "nowrap"]}
            gap={["40px", "40px", 0]}
          >
            <VStack width={"full"} alignItems={"flex-start"} gap={"50px"}>
              <VStack width={"full"}>
                <Text
                  textTransform={"capitalize"}
                  fontSize={["2.2rem", "2.2rem", "3.3rem"]}
                  fontWeight={"600"}
                  color={"rgba(18, 18, 18, 1)"}
                >
                  {heroText[0]}
                  <span style={{ color: "rgba(16, 61, 150, 1)" }}>Crypto</span>
                  {heroText[1]}
                </Text>
                <Text fontSize={"1.25rem"} color={"#333"}>
                  {t("heroCaption")}
                </Text>
              </VStack>
              <Button
                borderRadius={"none"}
                background={
                  " linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)"
                }
                _hover={{
                  background:
                    "linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
                }}
                variant={"solid"}
                width={"200px"}
                fontSize={"1rem"}
                cursor={"pointer"}
                padding={"30px 16px"}
                onClick={() => {
                  navigate("/register");
                }}
              >
                {t("heroButton")}
              </Button>
              <HStack
                width={"full"}
                flexDir={["column", "column", "row"]}
                display={["none", "none", "flex"]}
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
                      Easy
                    </Text>
                    <Text fontSize={"0.75rem"} maxW={"120px"}>
                      Send and Receive BTC gift card easily
                    </Text>
                  </VStack>
                </HStack>
                <HStack flexDir={["column", "column", "row"]}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_919_760)">
                      <path
                        d="M12.1028 -3.05113e-06C12.4958 -3.05113e-06 12.8828 0.025497 13.2428 0.0854969C13.5974 0.131956 13.9472 0.209249 14.2883 0.316497C14.6303 0.419997 14.9648 0.548997 15.2993 0.710997C15.6248 0.865497 15.9593 1.0545 16.2938 1.26C16.8593 1.62 17.4158 1.911 17.9828 2.1435C19.099 2.59025 20.2793 2.85609 21.4793 2.931C22.0883 2.9745 22.7138 3 23.3648 3V9C23.3648 10.14 23.2193 11.22 22.9283 12.249C22.6488 13.2633 22.2516 14.2415 21.7448 15.1635C21.2402 16.0842 20.6431 16.9512 19.9628 17.751C19.2721 18.569 18.5242 19.3369 17.7248 20.049C16.9148 20.7632 16.0617 21.427 15.1703 22.0365C14.2793 22.6545 13.3793 23.229 12.4793 23.751L12.1193 23.9655L11.7593 23.751C10.8341 23.2154 9.9304 22.6434 9.0503 22.0365C8.15389 21.4338 7.30035 20.7697 6.4958 20.049C5.69688 19.3369 4.94951 18.5689 4.2593 17.751C3.58084 16.9478 2.98109 16.0813 2.4683 15.1635C1.9702 14.2374 1.57341 13.2602 1.2848 12.249C0.991956 11.1911 0.847575 10.0976 0.855801 9V3C1.5083 3 2.1338 2.9745 2.7428 2.931C3.34229 2.88936 3.9379 2.80363 4.5248 2.6745C5.0993 2.5455 5.6738 2.3745 6.2393 2.1435C6.82611 1.90667 7.38871 1.61381 7.9193 1.269C8.5793 0.839997 9.2483 0.523497 9.9083 0.314997C10.6191 0.0970944 11.3594 -0.00917031 12.1028 -3.05113e-06ZM21.8558 4.4745C20.7203 4.4194 19.5955 4.22957 18.5048 3.909C17.4199 3.58538 16.3866 3.10911 15.4358 2.4945C14.9426 2.17079 14.4071 1.91688 13.8443 1.74C13.2821 1.5701 12.6975 1.48615 12.1103 1.491C11.5187 1.48717 10.9298 1.57108 10.3628 1.74C9.79921 1.91113 9.26431 2.16544 8.7758 2.4945C7.82339 3.11246 6.78737 3.59082 5.6993 3.915C4.6358 4.224 3.5228 4.413 2.3558 4.482V9.0075C2.3558 10.002 2.4848 10.953 2.7428 11.8695C3.00564 12.778 3.36783 13.6548 3.8228 14.484C4.28323 15.3218 4.8259 16.1117 5.4428 16.842C6.0683 17.5785 6.7358 18.264 7.4558 18.915C8.1758 19.5675 8.9303 20.1675 9.7193 20.724C10.5158 21.282 11.3138 21.7875 12.1103 22.2495C12.9259 21.7747 13.7211 21.2657 14.4938 20.724C15.288 20.1692 16.0465 19.5651 16.7648 18.915C17.4848 18.264 18.1538 17.5785 18.7793 16.842C19.3963 16.1117 19.9389 15.3218 20.3993 14.484C20.8523 13.6559 21.2091 12.7787 21.4628 11.8695C21.7286 10.9389 21.861 9.97529 21.8558 9.0075V4.4745Z"
                        fill="#103D96"
                        stroke="#103D96"
                      />
                      <mask id="path-2-inside-1_919_760" fill="white">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.6943 7.06349L17.0343 6.49649L16.4253 6.54899L9.88527 14.271L7.65777 11.091L7.05777 10.989L6.36327 11.4855L6.25977 12.0855L9.12327 16.1745L9.44877 16.3545L10.1343 16.3965L10.4853 16.2435L17.7378 7.67099L17.6943 7.06349Z"
                        />
                      </mask>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.6943 7.06349L17.0343 6.49649L16.4253 6.54899L9.88527 14.271L7.65777 11.091L7.05777 10.989L6.36327 11.4855L6.25977 12.0855L9.12327 16.1745L9.44877 16.3545L10.1343 16.3965L10.4853 16.2435L17.7378 7.67099L17.6943 7.06349Z"
                        fill="#103D96"
                      />
                      <path
                        d="M17.6943 7.06349L19.6892 6.92065L19.6296 6.08946L18.9976 5.54644L17.6943 7.06349ZM17.0343 6.49649L18.3376 4.97944L17.7 4.43168L16.8625 4.50388L17.0343 6.49649ZM16.4253 6.54899L16.2535 4.55638L15.432 4.6272L14.8991 5.25642L16.4253 6.54899ZM9.88527 14.271L8.24716 15.4184L9.7352 17.5428L11.4115 15.5636L9.88527 14.271ZM7.65777 11.091L9.29587 9.94355L8.81657 9.25929L7.99296 9.11928L7.65777 11.091ZM7.05777 10.989L7.39296 9.01728L6.57203 8.87772L5.89462 9.362L7.05777 10.989ZM6.36327 11.4855L5.20012 9.8585L4.53199 10.3362L4.39237 11.1455L6.36327 11.4855ZM6.25977 12.0855L4.28887 11.7455L4.14878 12.5577L4.62153 13.2327L6.25977 12.0855ZM9.12327 16.1745L7.48503 17.3217L7.75046 17.7008L8.15541 17.9247L9.12327 16.1745ZM9.44877 16.3545L8.48091 18.1047L8.87592 18.3231L9.32646 18.3507L9.44877 16.3545ZM10.1343 16.3965L10.012 18.3927L10.4923 18.4222L10.9334 18.2299L10.1343 16.3965ZM10.4853 16.2435L11.2844 18.0769L11.7113 17.8908L12.0121 17.5353L10.4853 16.2435ZM17.7378 7.67099L19.2646 8.96276L19.7908 8.34077L19.7327 7.52814L17.7378 7.67099ZM18.9976 5.54644L18.3376 4.97944L15.731 8.01354L16.391 8.58054L18.9976 5.54644ZM16.8625 4.50388L16.2535 4.55638L16.597 8.5416L17.206 8.4891L16.8625 4.50388ZM14.8991 5.25642L8.35908 12.9784L11.4115 15.5636L17.9515 7.84157L14.8991 5.25642ZM11.5234 13.1235L9.29587 9.94355L6.01967 12.2384L8.24716 15.4184L11.5234 13.1235ZM7.99296 9.11928L7.39296 9.01728L6.72257 12.9607L7.32257 13.0627L7.99296 9.11928ZM5.89462 9.362L5.20012 9.8585L7.52641 13.1125L8.22091 12.616L5.89462 9.362ZM4.39237 11.1455L4.28887 11.7455L8.23066 12.4255L8.33416 11.8255L4.39237 11.1455ZM4.62153 13.2327L7.48503 17.3217L10.7615 15.0272L7.898 10.9382L4.62153 13.2327ZM8.15541 17.9247L8.48091 18.1047L10.4166 14.6043L10.0911 14.4243L8.15541 17.9247ZM9.32646 18.3507L10.012 18.3927L10.2566 14.4002L9.57107 14.3582L9.32646 18.3507ZM10.9334 18.2299L11.2844 18.0769L9.6861 14.4101L9.3351 14.5631L10.9334 18.2299ZM12.0121 17.5353L19.2646 8.96276L16.2109 6.37923L8.95839 14.9517L12.0121 17.5353ZM19.7327 7.52814L19.6892 6.92065L15.6994 7.20634L15.7429 7.81384L19.7327 7.52814Z"
                        fill="#103D96"
                        mask="url(#path-2-inside-1_919_760)"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_919_760">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <VStack
                    alignItems={["center", "center", "flex-start"]}
                    textAlign={["center", "center", "left"]}
                  >
                    <Text
                      fontSize={"1rem"}
                      fontWeight={"600"}
                      textTransform={"uppercase"}
                    >
                      Trust
                    </Text>
                    <Text fontSize={"0.75rem"} maxW={"120px"}>
                      Trusted by millions of crypto users
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
                      Send or Receive BTC gift within seconds
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
      <Box width={"full"}>
        <Container
          maxWidth={["full", "full", "95%", "80%"]}
          pb={["50px", "50px", "100px", "100px", "100px"]}
        >
          <HStack
            width={"full"}
            flexWrap={["wrap", "wrap", "nowrap"]}
            gap={["40px", "40px", ""]}
          >
            <Image
              display={["flex", "flex", "none"]}
              src="/assets/images/giftcard2.png"
            />

            <VStack
              display={["none", "none", "flex"]}
              width={"full"}
              gap={"10px"}
            >
              <HStack
                display={["none", "none", "flex"]}
                width={"full"}
                alignItems={"flex-end"}
                justifyContent={"flex-end"}
                gap={"10px"}
              >
                <Image src="/assets/images/giftcard1.png" />
                <Image src="/assets/images/giftcard2.png" />
              </HStack>
              <HStack
                width={"full"}
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
                gap={"10px"}
              >
                <Image src="/assets/images/giftcard2.png" />
                <Image src="/assets/images/giftcard1.png" />
              </HStack>
            </VStack>
            <HStack width={"full"}>
              <VStack alignItems={"flex-start"} width={"full"}>
                <HStack>
                  <Box width={"76px"} height={"8px"} bg={"#103D96"}></Box>
                  <Text fontSize={"32px"} fontWeight={"600"} color={"#050505"}>
                    What is Bitgifty
                  </Text>
                </HStack>
                <Text fontSize={"18px"} color={"#333"} fontWeight={"400"}>
                  BitGifty is the best platform to send and receive Bitcoin and
                  altcoins to friends and family in a fun, customized way. It is
                  a platform that allows you to send and receive crypto like
                  Bitcoin and Ethereum as gifts cards. This is an opportunity to
                  show your friends and family how much you love them by
                  customizing the perfect cryptocurrency gift cards and sending
                  it via their email address.
                </Text>
                <HStack mt={"100px !important"}>
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="16"
                    viewBox="0 0 22 16"
                    fill="none"
                  >
                    <path
                      d="M21.7071 8.70711C22.0976 8.31658 22.0976 7.68342 21.7071 7.29289L15.3431 0.928932C14.9526 0.538408 14.3195 0.538408 13.9289 0.928932C13.5384 1.31946 13.5384 1.95262 13.9289 2.34315L19.5858 8L13.9289 13.6569C13.5384 14.0474 13.5384 14.6805 13.9289 15.0711C14.3195 15.4616 14.9526 15.4616 15.3431 15.0711L21.7071 8.70711ZM0 9H21V7H0V9Z"
                      fill="#103D96"
                    />
                  </svg>
                  <Text color={"#103D96"} fontWeight={"600"} fontSize={"18px"}>
                    {" "}
                    Read More
                  </Text> */}
                </HStack>
              </VStack>
            </HStack>
          </HStack>
        </Container>
      </Box>
      <Box width={"full"}>
        <Container
          maxWidth={["full", "full", "95%", "80%"]}
          pb={["50px", "50px", "100px", "100px", "100px"]}
        >
          <HStack
            width={"full"}
            flexWrap={["wrap", "wrap", "nowrap"]}
            gap={["40px", "40px", ""]}
            alignItems={"flex-start"}
          >
            <VStack alignItems={"flex-start"} width={"318px"}>
              <HStack>
                {" "}
                <Box height={"8px"} width={"60px"} bg={"#103D96"}></Box>
                <Text fontSize={"32px"} fontWeight={"600"} color={"#050505"}>
                  What can you do on BitGifty?
                </Text>
              </HStack>

              <Text fontSize={"18px"} color={"#333"} fontWeight={"400"}>
                Customize and send Cryptocurrency gift cards to your friends and
                family. No need to deal with complicated crypto wallet
                addresses. Receive Bitcoin and Altcoins directly via your email.
                Convert your crypto gift to Naira OR use your gifts to buy
                airtime, data, electricty or cable TV directly.
              </Text>
            </VStack>
            <HStack
              flexDir={["column", "column", "row"]}
              alignItems={"center"}
              display={["none", "none", "flex"]}
              width={["full", "full", "auto"]}
              // wrap={["wrap", "wrap", "nowrap"]}
            >
              <VStack
                height={"336px"}
                width={"242px"}
                background={"url('/assets/images/serviceimage.jpeg')"}
                backgroundSize={"cover"}
                backgroundPosition={"center"}
                justifyContent={"flex-end"}
              >
                <VStack
                  width={"242px"}
                  height={"132px"}
                  justifyContent={"flex-end"}
                  background={
                    "linear-gradient(180deg, rgba(16, 61, 150, 0.00) 0%, rgba(16, 61, 150, 0.50) 31.08%, rgba(40, 99, 212, 0.50) 76.82%, rgba(16, 61, 150, 0.50) 100%);"
                  }
                >
                  <Text
                    fontSize={"20px"}
                    fontWeight={"600"}
                    color={"#fff"}
                    p={"10px"}
                  >
                    Create crypto gift cards
                  </Text>
                </VStack>
              </VStack>
              <VStack
                height={"336px"}
                width={"242px"}
                background={"url('/assets/images/giftcard2.png')"}
                backgroundSize={"cover"}
                backgroundPosition={"center"}
                justifyContent={"flex-end"}
              >
                <VStack
                  width={"242px"}
                  height={"132px"}
                  justifyContent={"flex-end"}
                  background={
                    "linear-gradient(180deg, rgba(16, 61, 150, 0.00) 0%, rgba(16, 61, 150, 0.50) 31.08%, rgba(40, 99, 212, 0.50) 76.82%, rgba(16, 61, 150, 0.50) 100%);"
                  }
                >
                  <Text
                    fontSize={"20px"}
                    fontWeight={"600"}
                    color={"#fff"}
                    p={"10px"}
                  >
                    Redeem crypto gift cards
                  </Text>
                </VStack>
              </VStack>
              <VStack
                height={"336px"}
                width={"242px"}
                background={"url('/assets/images/serviceimage.jpeg')"}
                backgroundSize={"cover"}
                backgroundPosition={"center"}
                justifyContent={"flex-end"}
              >
                <VStack
                  width={"242px"}
                  height={"132px"}
                  justifyContent={"flex-end"}
                  background={
                    "linear-gradient(180deg, rgba(16, 61, 150, 0.00) 0%, rgba(16, 61, 150, 0.50) 31.08%, rgba(40, 99, 212, 0.50) 76.82%, rgba(16, 61, 150, 0.50) 100%);"
                  }
                >
                  <Text
                    fontSize={"20px"}
                    fontWeight={"600"}
                    color={"#fff"}
                    p={"10px"}
                  >
                    Customise gift cards designs
                  </Text>
                </VStack>
              </VStack>
            </HStack>
          </HStack>
        </Container>
      </Box>
      <Box width={"full"}>
        <Container
          maxWidth={["full", "full", "95%", "80%"]}
          pb={["50px", "50px", "100px", "100px", "100px"]}
        >
          <HStack
            width={"full"}
            flexWrap={["wrap", "wrap", "nowrap"]}
            gap={["40px", "40px", "100px"]}
            justifyContent={"center"}
          >
            <Box width={"330px"} height={"384px"} position={"relative"}>
              <Box
                width={"168px"}
                height={"182px"}
                bg={"#EDFAFD"}
                position={"absolute"}
                bottom={0}
                left={0}
              ></Box>
              <Box
                width={"288px"}
                height={"338px"}
                bg={"#103D96"}
                position={"absolute"}
                bottom={"1px"}
                left={"1px"}
              ></Box>
              <Box
                width={"182px"}
                height={"168px"}
                bg={"#103D96"}
                position={"absolute"}
                top={0}
                right={0}
              ></Box>
              <VStack
                width={"288px"}
                height={"338px"}
                bg={"#EDFAFD"}
                position={"absolute"}
                justifyContent={"center"}
                top={"1px"}
                right={"1px"}
              >
                <Text fontSize={"96px"} fontWeight={"600"} color={"#103D96"}>
                  02
                </Text>
                <Text fontSize={"24px"} color={"#050505"} fontWeight={"600"}>
                  Years Of Experience
                </Text>
              </VStack>
            </Box>
            <VStack gap={"60px"} alignItems={"flex-start"}>
              <HStack gap={"120px"}>
                <VStack alignItems={"flex-start"}>
                  <Text fontSize={"48px"} color={"#103D96"} fontWeight={"600"}>
                    200+
                  </Text>
                  <Text fontSize={"20px"} fontWeight={"500"} color={"#333"}>
                    Gift Cards Created
                  </Text>
                </VStack>
                <VStack alignItems={"flex-start"}>
                  <Text fontSize={"48px"} color={"#103D96"} fontWeight={"600"}>
                    200+
                  </Text>
                  <Text fontSize={"20px"} fontWeight={"500"} color={"#333"}>
                    Gift Cards Redeemed
                  </Text>
                </VStack>
              </HStack>
              <HStack gap={"120px"}>
                <VStack alignItems={"flex-start"}>
                  <Text fontSize={"48px"} color={"#103D96"} fontWeight={"600"}>
                    100+
                  </Text>
                  <Text fontSize={"20px"} fontWeight={"500"} color={"#333"}>
                    Active Gifters
                  </Text>
                </VStack>
                <VStack alignItems={"flex-start"}>
                  <Text fontSize={"48px"} color={"#103D96"} fontWeight={"600"}>
                    $10k+
                  </Text>
                  <Text fontSize={"20px"} fontWeight={"500"} color={"#333"}>
                    Gift Card Volume
                  </Text>
                </VStack>
              </HStack>
              <Button
                borderRadius={"none"}
                background={
                  " linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)"
                }
                _hover={{
                  background:
                    "linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
                }}
                variant={"solid"}
                fontSize={"14px"}
                fontWeight={"700"}
              >
                Learn More
              </Button>
            </VStack>
          </HStack>
        </Container>
      </Box>
      {/* <Box width={"full"} py={"40px"}>
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
      </Box> */}
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
              borderRadius={"none"}
              background={
                " linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)"
              }
              _hover={{
                background:
                  "linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
              }}
              variant={"solid"}
              onClick={() => navigate("/register")}
              padding={"30px 16px"}
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
              <VStack width={"full"}>
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
                width={"full"}
              >
                <HStack>
                  <Box height={"8px"} width={"60px"} bg={"#103D96"}></Box>
                  <Text fontSize={"32px"} fontWeight={"600"} color={"#050505"}>
                    How it works
                  </Text>
                </HStack>

                <Text
                  fontSize={["16px", "16px", "18px", "18px"]}
                  maxW={"500px"}
                  fontWeight={"400"}
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
        </Container>
      </Box>
      <Box width={"full"} display={["none", "none", "flex"]}>
        <Container
          maxWidth={["full", "full", "95%", "80%"]}
          pb={["50px", "50px", "100px", "100px", "100px"]}
        >
          {" "}
          <HStack
            width={"full"}
            gap={["20px"]}
            flexDir={["column", "column", "row"]}
          >
            <VStack
              alignItems={"flex-start"}
              width={"full"}
              justifyContent={"space-between"}
              gap={[0, 0, "200px"]}
            >
              <VStack>
                {" "}
                <HStack>
                  <Box height={"8px"} width={"60px"} bg={"#103D96"}></Box>
                  <Text fontSize={"32px"} fontWeight={"600"} color={"#050505"}>
                    Don't take our word for it
                  </Text>
                </HStack>
                <Text fontSize={"18px"} color={"#333"} fontWeight={"400"}>
                  We won’t toot our horns; Our users do that for us
                </Text>
              </VStack>

              <HStack mt={"50px"} display={["none", "none", "flex"]}>
                <HStack
                  width={"56px"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  height={"56px"}
                  bg={"#EDFAFD"}
                  cursor={"pointer"}
                >
                  <RxArrowLeft fontSize={"20px"} />
                </HStack>
                <HStack
                  width={"56px"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  height={"56px"}
                  color={"#fff"}
                  bg={"#103D96"}
                  cursor={"pointer"}
                >
                  <RxArrowRight fontSize={"20px"} />
                </HStack>
              </HStack>
            </VStack>
            <VStack
              alignItems={"center"}
              px={"5px"}
              width={"full"}
              position={"relative"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="438"
                height="404"
                viewBox="0 0 438 404"
                fill="none"
              >
                <path
                  d="M78.375 0C57.655 0 37.7836 8.231 23.1323 22.8823C8.481 37.5336 0.25 57.405 0.25 78.125V234.375C0.25 244.635 2.27076 254.794 6.19691 264.272C10.1231 273.751 15.8777 282.363 23.1323 289.618C37.7836 304.269 57.655 312.5 78.375 312.5H94V373.188C93.9989 379.07 95.6922 384.829 98.8774 389.775C102.063 394.721 106.605 398.645 111.961 401.077C117.318 403.51 123.261 404.348 129.081 403.492C134.902 402.636 140.352 400.122 144.781 396.25L240.5 312.5H359.625C369.885 312.5 380.044 310.479 389.522 306.553C399.001 302.627 407.613 296.872 414.868 289.618C422.122 282.363 427.877 273.751 431.803 264.272C435.729 254.794 437.75 244.635 437.75 234.375V78.125C437.75 57.405 429.519 37.5336 414.868 22.8823C400.216 8.231 380.345 0 359.625 0H78.375Z"
                  fill="url(#paint0_linear_901_975)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_901_975"
                    x1="80.2069"
                    y1="243.714"
                    x2="461.853"
                    y2="362.851"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#103D96" />
                    <stop offset="1" stop-color="#306FE9" />
                  </linearGradient>
                </defs>
              </svg>
              <VStack position={"absolute"} top={"20%"} gap={"30px"}>
                <Text
                  fontSize={"16px"}
                  color={"#fff"}
                  fontWeight={"500"}
                  width={"378px"}
                  textAlign={"center"}
                >
                  “I used to have to check my wallet address over and over again
                  before sending to anyone. It was tiring. With BitGifty, I
                  don't have to worry anymore. I just give the sender my email
                  and wait for the notification. It is so convenient for me.”
                </Text>
                <HStack>
                  <Avatar />
                  <VStack>
                    <Text fontSize={"16px"} color={"#fff"} fontWeight={"600"}>
                      Hannah Martin
                    </Text>
                    <Text
                      fontSize={"16px"}
                      color={"#A3BFF5"}
                      fontWeight={"600"}
                    >
                      @HannahMar
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </VStack>
          </HStack>
        </Container>
      </Box>
      <Box width={"full"}>
        <Container
          maxWidth={["full", "full", "95%", "80%"]}
          pb={["50px", "50px", "100px", "100px", "100px"]}
        >
          <HStack
            width={"full"}
            gap={"40px"}
            flexDir={["column", "column", "row"]}
          >
            <Image src="/assets/images/giftcardowner.png" />
            <VStack width={"full"} gap={"50px"}>
              <VStack align={"flex-start"}>
                <HStack>
                  <Box height={"8px"} width={"60px"} bg={"#103D96"}></Box>
                  <Text fontSize={"32px"} fontWeight={"600"} color={"#050505"}>
                    Get product updates
                  </Text>
                </HStack>
                <Text fontSize={"18px"} color={"#333"} fontWeight={"400"}>
                  Promos, Crypto round-up, and witty convos; our newsletters are
                  the dopest
                </Text>
              </VStack>
              <HStack width={"full"}>
                <Input
                  borderRadius={"none"}
                  border={"2px solid #103D96 !important"}
                  width={"350px"}
                  type="text"
                  placeholder="Enter your email address"
                />
                <Button
                  borderRadius={"none"}
                  bg={
                    " linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)"
                  }
                >
                  Subscribe
                </Button>
              </HStack>
            </VStack>
          </HStack>
        </Container>
      </Box>
      <Box width={"full"}>
        <Container
          maxWidth={["full", "full", "95%", "80%"]}
          pb={["50px", "50px", "100px", "100px", "100px"]}
        >
          <VStack
            width={"full"}
            alignItems={"flex-start"}
            gap={["40px", "40px", "100px"]}
          >
            <VStack align={"flex-start"}>
              <HStack>
                <Box height={"8px"} width={"60px"} bg={"#103D96"}></Box>
                <Text fontSize={"32px"} fontWeight={"600"} color={"#050505"}>
                  Product News
                </Text>
              </HStack>
              <Text fontSize={"18px"} color={"#333"} fontWeight={"400"}>
                Check our blog posts for product update, Promos, and Crypto
                news.
              </Text>
            </VStack>
            <HStack
              width={"full"}
              flexDir={["column", "column", "row"]}
              gap={["10px", "10px", "auto"]}
            >
              {" "}
              <VStack
                height={"336px"}
                width={"360px"}
                background={"url('/assets/images/serviceimage.jpeg')"}
                backgroundSize={"cover"}
                backgroundPosition={"center"}
                justifyContent={"flex-end"}
              >
                <VStack
                  width={"360px"}
                  height={"132px"}
                  justifyContent={"flex-end"}
                  alignItems={"flex-start"}
                  background={
                    "linear-gradient(180deg, rgba(16, 61, 150, 0.00) 0%, rgba(16, 61, 150, 0.50) 31.08%, rgba(40, 99, 212, 0.50) 76.82%, rgba(16, 61, 150, 0.50) 100%);"
                  }
                >
                  <Text
                    fontSize={"20px"}
                    fontWeight={"600"}
                    color={"#fff"}
                    width={"200px"}
                    p={"10px"}
                  >
                    Create crypto gift cards
                  </Text>
                </VStack>
              </VStack>
              <VStack
                height={"336px"}
                width={"360px"}
                background={"url('/assets/images/serviceimage.jpeg')"}
                backgroundSize={"cover"}
                backgroundPosition={"center"}
                justifyContent={"flex-end"}
              >
                <VStack
                  width={"360px"}
                  height={"132px"}
                  justifyContent={"flex-end"}
                  alignItems={"flex-start"}
                  background={
                    "linear-gradient(180deg, rgba(16, 61, 150, 0.00) 0%, rgba(16, 61, 150, 0.50) 31.08%, rgba(40, 99, 212, 0.50) 76.82%, rgba(16, 61, 150, 0.50) 100%);"
                  }
                >
                  <Text
                    fontSize={"20px"}
                    fontWeight={"600"}
                    color={"#fff"}
                    width={"200px"}
                    p={"10px"}
                  >
                    Create crypto gift cards
                  </Text>
                </VStack>
              </VStack>
              <VStack
                height={"336px"}
                width={"360px"}
                background={"url('/assets/images/serviceimage.jpeg')"}
                backgroundSize={"cover"}
                backgroundPosition={"center"}
                justifyContent={"flex-end"}
              >
                <VStack
                  width={"360px"}
                  height={"132px"}
                  justifyContent={"flex-end"}
                  alignItems={"flex-start"}
                  background={
                    "linear-gradient(180deg, rgba(16, 61, 150, 0.00) 0%, rgba(16, 61, 150, 0.50) 31.08%, rgba(40, 99, 212, 0.50) 76.82%, rgba(16, 61, 150, 0.50) 100%);"
                  }
                >
                  <Text
                    fontSize={"20px"}
                    fontWeight={"600"}
                    color={"#fff"}
                    width={"200px"}
                    p={"10px"}
                  >
                    Create crypto gift cards
                  </Text>
                </VStack>
              </VStack>
            </HStack>
          </VStack>
        </Container>
      </Box>

      <Box width={"full"} py={"40px"} bg={"#103D96"} color={"#fff"}>
        <Container maxWidth={["full", "full", "95%", "80%"]}>
          <HStack
            flexDir={["column", "column", "row", "row"]}
            gap={"20px"}
            width={"full"}
            justifyContent={"space-between"}
          >
            <VStack width={"full"} alignItems={"flex-start"} gap={"20px"}>
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
              <HStack width={"full"} alignItems={"center"}>
                <a href={"https://twitter.com/BitGifty"}>
                  <AiFillTwitterSquare fontSize={"24px"} />
                </a>
                <a href={"https://www.instagram.com/bitgifty/"}>
                  <AiFillInstagram fontSize={"24px"} />
                </a>
                <a href={"https://www.linkedin.com/company/bitgifty/"}>
                  <AiFillLinkedin fontSize={"24px"} />
                </a>
              </HStack>
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
          fontSize={"16px"}
          fontWeight={"400"}
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
