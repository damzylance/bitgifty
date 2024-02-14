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
  Select,
  Text,
  Textarea,
  VStack,
  useToast
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { RxCaretRight, RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import ContactButton from "../../Components/ContactButton";
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
const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const toast =useToast()
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = (e) => {
    const languageValue = e.target.value;
    localStorage.setItem("localeLang", languageValue);
    i18n.changeLanguage(languageValue);
  };
  const showMobileMenu = () => {
    setOpenMenu(!openMenu);
  };



  const submitForm = async (data) => {
    console.log("submited");
    setIsLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}contacts/`,data)
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        toast({title:"Email sent successfully",status:"success"})
        reset();
      })
      .catch((error) => {
        setIsLoading(false);
        toast({title:error.response.data.error|| error.message|| "An error occurred",status:"warning"})
        console.log(error);
        
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <VStack width={"full"} background={"#FAFCFF"} pt={[0, 0, "0px", "0px"]}>
      <ContactButton/>
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
            <NavLink to={"/"}>
              <Box>
                <Img
                  src="/assets/images/logo-inline-transparent.png"
                  width={"100px"}
                />
              </Box>
            </NavLink>
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
                  }}
                >
                  <Text sx={navStyle} _hover={navHoverStyle}>
                    How it works
                  </Text>
                  <RxCaretRight fontSize={"24px"} />
                </HStack>

                <HStack
                  onClick={() => {
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
              <NavLink to={"/"}> <Image
                width={"150px"}
                src="/assets/images/logo-inline-whitebg.png"
              /></NavLink>
              
            </Box>
            <HStack gap={"20px"} alignItems={"center"}>
              <Text
                onClick={() => {
                 
                }}
                sx={navStyle}
                _hover={navHoverStyle}
              >
                About
              </Text>
              <Text
                onClick={() => {
                }}
                sx={navStyle}
                _hover={navHoverStyle}
              >
                How it works
              </Text>

              <Text
                onClick={() => {
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
      <VStack
        width={"full"}
        px={[0, 0, "20px"]}
        py={"20px"}
        bg={"#EDFAFD"}
        margin={0}
      >
        <Container
          mb={"40px"}
          maxWidth={["full", "full", "50%", "50%"]}
          position={"relative"}
        >
          <form onSubmit={handleSubmit(submitForm)}>
            <VStack width={"full"} alignContent={"flex-start"} py={"100px"} gap={"30px"}>
              <VStack width={"full"} alignContent={"flex-start"} gap={"10px"}>
                <Text fontSize={["lg", "xl"]} fontWeight={"bold"}>
                  We'd Love to help
                </Text>
                <Text fontSize={"sm"}>
                  Reach out and we'll get in touch within 24 hours
                </Text>
              </VStack>
              <VStack width={"full"} alignItems={"center"}>
                <HStack
                  flexDir={["column", "column", "row"]}
                  gap={["30px", "30px", ""]}
                  width={"full"}
                  justifyContent={"flex-start"}
                >
                  <FormControl width={"full"}>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      name="full_name"
                      bg={"#fff"}
                      type="text"
                      placeholder="Full Name"
                      required
                      {...register("full_name")}
                    />
                  </FormControl>
                </HStack>
              </VStack>
              <FormControl width={"full"}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  bg={"#fff"}
                  type="email"
                  placeholder="Email Address"
                  required
                  {...register("email")}
                />
              </FormControl>
              <FormControl width={"full"}>
                <FormLabel>Message</FormLabel>
                <Textarea
                  name="message"
                  bg={"#fff"}
                  placeholder="Leave us a message...."
                  required
                  {...register("message")}
                />
              </FormControl>
              <Button type="submit" width={"full"} isLoading={isLoading}>
                Send Message
              </Button>
            </VStack>
          </form>
        </Container>
      </VStack>
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
                <NavLink to={"/privacy-policy"} style={{ fontSize: "14px" }}>
                  Privacy Policy
                </NavLink>{" "}
                <NavLink to={"/aml"} style={{ fontSize: "14px" }}>AML</NavLink>
                <NavLink style={{ fontSize: "14px" }}>Terms and Condition</NavLink>
              </VStack>
              <VStack width={"full"} alignItems={"flex-start"}>
                <Text fontSize={["16px", "16px", "24px"]} fontWeight={"700"}>
                  Company
                </Text>
                <NavLink>FAQ</NavLink>
                <Text
                  onClick={() => {
                  }}
                  cursor={"pointer"}
                >
                  About Us
                </Text>
                <NavLink to={"/contact-us"}>Contact Us</NavLink>
              </VStack>
            </HStack>
          </HStack>
        </Container>
      </Box>
    </VStack>
  );
};

export default ContactUs;
