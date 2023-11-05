import SettingsLayout from "./SettingsLayout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, useToast } from "@chakra-ui/react";
import {
  Button,
  HStack,
  Input,
  Text,
  VStack,
  Container,
  Spinner,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";

function UserSetting() {
  const navigate = useNavigate();
  const toast = useToast();
  const inputStyle = {
    padding: "20px 16px",
    border: "1px solid #144CB8",
    borderRadius: "8px",
  };
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const fetchUser = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}auth/user/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {
        if (error?.response?.status === 500) {
          toast({ title: "Server error", status: "error" });
        } else if (error.response?.status === 403) {
          toast({
            title: "session expired. Please sign in again",
            status: "warning",
          });
          navigate("/login");
        } else if (error.response?.status === 401) {
          toast({
            title: "Unautorised. Please sign in again",
            status: "warning",
          });
          navigate("/login");
        } else {
          toast({
            title: "An error occured",
            status: "warning",
          });
        }
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Text fontSize={"xl"} fontWeight={"bold"}>
        Update Profile
      </Text>

      <Box width={"full"}>
        <form
          onSubmit={handleSubmit((data) => {
            setIsLoading(true);
            axios
              .put(`${process.env.REACT_APP_BASE_URL}auth/user/`, data, {
                headers: {
                  Authorization: `Token ${localStorage.getItem("token")}`,
                },
              })
              .then(function (response) {
                setIsLoading(false);
              })
              .catch(function (error) {
                setIsLoading(false);
              });
          })}
        >
          <VStack gap={6} alignItems={"flex-start"}>
            <HStack width={"full"} gap={["5px", "5px", "20px"]}>
              <Input
                style={inputStyle}
                type="text"
                name={"first_name"}
                placeholder="First Name"
                {...register("first_name")}
                defaultValue={user?.first_name ? user.first_name : ""}
              />
              <Input
                style={inputStyle}
                type="text"
                name={"last_name"}
                {...register("last_name")}
                placeholder="Last Name"
                defaultValue={user?.last_name ? user.last_name : ""}
              />
            </HStack>
            <HStack width={"full"} gap={["5px", "5px", "20px"]}>
              {" "}
              <Input
                style={inputStyle}
                type="text"
                placeholder="Username"
                value={user?.username ? user.username : ""}
                disabled
              />
              <Input
                style={inputStyle}
                disabled={true}
                type="email"
                placeholder="Email Address"
                value={user?.email ? user.email : ""}
              />
            </HStack>

            <Input
              style={inputStyle}
              type="tel"
              name={"phone_number"}
              placeholder="Phone Number"
              defaultValue={user?.phone_number ? user.phone_number : ""}
              {...register("phone_number")}
            />
            <Button
              justifyContent={"center"}
              width={"260px"}
              type="submit"
              bg={"linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)"}
              padding={"30px 16px"}
              isLoading={isLoading}
            >
              Update
            </Button>
          </VStack>
        </form>
      </Box>
    </>
  );
}

export default UserSetting;
