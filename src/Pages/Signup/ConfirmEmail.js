import {
  Container,
  VStack,
  Text,
  Input,
  Button,
  useToast,
  Box,
  Flex,
  Square,
  Spinner,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import AuthLayout from "../../Components/AuthLayout";
import { useForm } from "react-hook-form";
import axios from "axios";

import React, { useEffect, useState } from "react";

function ConfirmEmail() {
  const params = useParams();
  const token = params.token;
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const confirm = async () => {
    setIsLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}auth/registration/verify-email/`,
        { key: token }
      )

      .then(function (response) {
        setIsLoading(false);
        setErrorMessage("Email Confirmed. Redirecting to login page...");
        toast({
          title: "Email confirmation successful.",
          status: "success",
        });
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      })
      .catch(function (error) {
        setIsLoading(false);
        setErrorMessage(
          "Verification failed. Your confirmation link is expired or invalid. Kindly check your email for the valid link"
        );
        if (error.response?.status === 400) {
          toast({
            title: "Verification failed",
            status: "error",
          });
        } else {
          toast({
            title: "Verification failed",
            status: "error",
          });
        }
      });
  };

  useEffect(() => {
    console.log(token);
    confirm();
  }, []);
  return (
    <AuthLayout
      height={"100vh"}
      flexDir={"column"}
      bg={"brand.50"}
      justifyContent="center"
    >
      <Container
        sx={{
          background: "#FFFFFF",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "16px",
        }}
        maxW={"480px"}
        py={10}
        px={4}
      >
        {isLoading ? (
          <Text>Verifying your email...</Text>
        ) : (
          <>
            <Text textAlign={"center"}>{errorMessage}</Text>
          </>
        )}
      </Container>
    </AuthLayout>
  );
}

export default ConfirmEmail;
