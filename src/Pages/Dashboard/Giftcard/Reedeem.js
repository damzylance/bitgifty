import React, { useEffect, useState } from "react";
import {
  Container,
  VStack,
  Text,
  Button,
  Input,
  useToast,
  HStack,
  Flex,
} from "@chakra-ui/react";
import Confetti from "react-confetti";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../Components/DashboardLayout";
import { RxCardStack, RxPlus } from "react-icons/rx";
import { MdRedeem } from "react-icons/md";
import GiftCardTemplate from "./GiftCardTemplate";
function Reedeem() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const [confetti, setConfitti] = useState();
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const handleWindowResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };
  const handleRedeem = async (data) => {
    setIsLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}gift_cards/v2/redeem/`, data, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        setIsLoading(false);
        toast({
          title: "Giftcard redeemed to your wallet",
          position: "top",
          status: "success",
        });
        setConfitti(true);
        setTimeout(() => {
          setConfitti(false);
          navigate("/wallet");
        }, 5000);
      })
      .catch(function (error) {
        if (error.response?.status === 400) {
          if (error.response?.data?.error === "gift card not found") {
            toast({ title: "Gift card code invalid", status: "error" });
          } else {
            toast({ title: error.response?.data?.error, status: "error" });
          }
        }else{
          toast({ title: error.response?.data?.error, status: "error" });
        }
        setIsLoading(false);
      });
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}gift_cards/v2/redeem`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        setHistory(response.data.results);
      })
      .catch(function (error) {});
    handleWindowResize();
  }, []);
  return (
    <GiftCardTemplate>
      <Container
        py="52px"
        px={["32px"]}
        color={"brand.700"}
        borderRadius={"2xl"}
        bg={"brand.50"}
        mt="10"
        mb="5"
      >
        {confetti && (
          <Confetti width={windowSize.width} height={windowSize.height} />
        )}
        <VStack gap={"5"} alignItems="flex-start" width={"full"}>
          <Text>Enter Your Gift Card Code</Text>
          <form onSubmit={handleSubmit(handleRedeem)} style={{ width: "100%" }}>
            <VStack width={"full"} gap={"5"} alignItems="center">
              <Input
                type={"text"}
                borderColor={"brand.700"}
                width="80%"
                placeholder={"Paste code here"}
                size={"lg"}
                bg="bg1"
                required
                minLength={5}
                name="code"
                {...register("code")}
              />
              <Button
                size={"lg"}
                type="submit"
                borderRadius={"none"}
                background={
                  " linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)"
                }
                _hover={{
                  background:
                    "linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
                }}
                variant={"solid"}
                isLoading={isLoading}
              >
                Reedem
              </Button>
            </VStack>
          </form>
        </VStack>
      </Container>
      <Text
        mt={0}
        fontSize={"sm"}
        color={"brand.500"}
        width={"full"}
        cursor={"pointer"}
        textAlign={"center"}
        textDecor={"underline"}
        _hover={{ color: "brand.300" }}
        onClick={() => {
          setShowHistory(!showHistory);
        }}
      >
        {showHistory ? "Hide History" : "Show History"}
      </Text>
      {showHistory && (
        <Container mt={"10px"}>
          <VStack width={"full"} alignItems={"flex-start"}>
            {history.length > 0
              ? history.reverse().map((transaction) => {
                  return (
                    <HStack
                      padding={"24px"}
                      borderRadius={"10px"}
                      width={"full"}
                      justifyContent={"space-between"}
                      bg={"#fff"}
                      boxShadow={"0px 1px 4px 0px rgba(0, 0, 0, 0.10)"}
                      color={"#050505"}
                    >
                      <Text fontSize={"sm"}>{transaction.code}</Text>
                      <Text fontSize={"sm"}>{`${new Date(
                        transaction.redemption_date
                      ).toLocaleDateString()}`}</Text>
                    </HStack>
                  );
                })
              : "No transaction history"}
          </VStack>
        </Container>
      )}
    </GiftCardTemplate>
  );
}

export default Reedeem;

// Naira investment pool
// Money africa (MONI) investment pool
// Gamified saving pool to naira savings pool
//
