import {
  Container,
  VStack,
  Text,
  Input,
  Button,
  InputGroup,
  Box,
  useToast,
  InputRightElement,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import AuthLayout from "../../Components/AuthLayout";
import React, { useRef, useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

function PasswordResetConFirm() {
  const params = useParams();
  const uid = params.uid;
  const token = params.token;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const onSubmit = async (data) => {
    data.token = token;
    data.uid = uid;
    console.log(data);
    setIsLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}auth/password/reset/confirm/`,
        data
      )
      .then(function (response) {
        console.log(response);
        setIsLoading(false);
        toast({ title: "Password reset successful", status: "success" });
        navigate("/login");
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error);
        if (error.response.status === 400) {
          toast({ title: "Invalid credentials", status: "error" });
        } else {
          toast({ title: "An error occured", status: "error" });
        }
      });
  };
  const new_password1 = useRef({});
  new_password1.current = watch("new_password1", "");
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={"10"} w="full" alignItems={"flex-start"}>
            <Text color={"brand.700"} fontSize={"xl"} fontWeight={"700"}>
              Change Password
            </Text>
            <VStack w={"full"} gap={"2"}>
              <Box width={"full"}>
                <InputGroup>
                  <Input
                    size={"md"}
                    name="new_password1"
                    placeholder="New Password"
                    {...register("new_password1", {
                      minLength: {
                        value: "8",
                        message: "password must contain at least 8 characters",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    required
                    error={errors.new_password1}
                  />
                  <InputRightElement
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <RxEyeClosed color="blue" cursor={"pointer"} />
                    ) : (
                      <RxEyeOpen color="blue" cursor={"pointer"} />
                    )}
                  </InputRightElement>
                </InputGroup>

                <Text fontSize={"xs"}>{errors.new_password1?.message}</Text>
              </Box>
              <Box width={"full"}>
                <InputGroup>
                  <Input
                    name="new_password2"
                    size={"md"}
                    placeholder="Confirm New Password"
                    {...register("new_password2", {
                      validate: (value) =>
                        value === new_password1.current ||
                        "The passwords do not match",
                    })}
                    error={errors.new_password2}
                    required
                    type={showPassword ? "text" : "password"}
                    onClick={() => {
                      setShowPassword(true);
                    }}
                  />
                  <InputRightElement
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <RxEyeClosed color="blue" cursor={"pointer"} />
                    ) : (
                      <RxEyeOpen color="blue" cursor={"pointer"} />
                    )}
                  </InputRightElement>
                </InputGroup>
                <Text fontSize={"xs"}>{errors.new_password2?.message}</Text>
              </Box>
            </VStack>
            <VStack width={"full"}>
              <Button
                isLoading={isLoading}
                loadingText={"Submitting"}
                type="submit"
                w={"full"}
                rightIcon={<ArrowForwardIcon />}
                size="md"
                colorScheme="brand"
                justifyContent={"space-between"}
                variant="solid"
              >
                Change Password
              </Button>
            </VStack>
          </VStack>
        </form>
      </Container>
    </AuthLayout>
  );
}

export default PasswordResetConFirm;
