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
import { NavBar } from "../../Components/Navbar";
import { Footer } from "../../Components/Footer";
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
      <NavBar/>
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
     <Footer/>
    </VStack>
  );
};

export default ContactUs;
