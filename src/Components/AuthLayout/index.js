import React from "react";
import { Container, Flex, Image, Spinner, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ContactButton from "../ContactButton";

function AuthLayout(props) {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const user = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}auth/user/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        if (response) {
          setIsLoading(false);
          navigate("/dashboard");
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error);
        // if (error.response?.status === 500) {
        //   toast({ title: "Server error", status: "error" });
        // } else if (error.response?.status === 403) {
        //   toast({
        //     title: "session expired. Please sign in again",
        //     status: "warning",
        //   });
        //   navigate("/login");
        // } else if (error.response?.status === 401) {
        //   toast({
        //     title: "Unautorised. Please sign in again",
        //     status: "warning",
        //   });
        //   navigate("/login");
        // } else {
        //   toast({
        //     title: "An error occured",
        //     status: "warning",
        //   });
        //   navigate("/login");
        // }
      });
  };
  useEffect(() => {
    user();
  }, []);
  return (
    <>
    <ContactButton/>
      {isLoading ? (
        <Container>
          <VStack justifyContent={"center"} height={"100vh"} width={"full"}>
            <Image src="/assets/images/logo-outline.png" width={"100px"} />
          </VStack>
        </Container>
      ) : (
        <Flex
          height={"100vh"}
          flexDir={"column"}
          bg={"brand.50"}
          justifyContent="center"
          gap={4}
        >
          <Container maxW={"480px"} py={10} px={4}>
            <Flex
              width={"full"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <ArrowBackIcon
                fontSize={"24px"}
                cursor={"pointer"}
                onClick={() => navigate(-1)}
              />
              <Flex width={"full"} justifyContent={"center"}>
                <Image src="/assets/images/logo-outline.png" width={"100px"} />
              </Flex>
            </Flex>
          </Container>

          {props.children}
        </Flex>
      )}
    </>
  );
}

export default AuthLayout;
