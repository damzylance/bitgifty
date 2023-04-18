import {
  Button,
  Container,
  Flex,
  Input,
  Text,
  VStack,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  useToast,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";

import axios from "axios";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../Components/DashboardLayout";
import Authenticate from "../../../Helpers/Auth";
import { useForm } from "react-hook-form";
import { json, useNavigate } from "react-router-dom";

function Wallet() {
  Authenticate();
  const [wallets, setWallets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}wallets/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data) {
          setIsLoading(false);
          setWallets(response.data);

          localStorage.setItem("wallets", JSON.stringify(response.data));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <DashboardLayout>
      <VStack gap={"10"} width="full">
        <Flex
          wrap={"wrap"}
          gap="10px"
          alignItems="center"
          width="full"
          justifyContent={"space-between"}
        >
          <Text fontWeight={"bold"} color="brand.700">
            Wallet
          </Text>
          <ButtonGroup>
            <Button size={["sm", "sm", "md"]} variant={"outline"}>
              Deposit
            </Button>
            <Button size={["sm", "sm", "md"]} variant={"outline"}>
              Withdraw
            </Button>
            <Button size={["sm", "sm", "md"]} variant={"outline"}>
              Transaction History
            </Button>
          </ButtonGroup>
        </Flex>
        <Container
          background={"brand.50"}
          py={"12"}
          border={"1px solid #A3BFF5"}
          borderRadius={"12px"}
          maxWidth="400px"
        >
          <VStack gap={"12"}>
            <Text>Total Balance</Text>
            <Flex gap={"4"}>
              <Text> 0.01 BTC</Text>
              <Text> =</Text>
              <Text> #50000</Text>
            </Flex>
          </VStack>
        </Container>
        <VStack alignItems={"flex-start"} width="full" gap={"10"}>
          <Input placeholder="search coin" width={"sm"} type={"text"} />
          <VStack alignItems={"flex-start"} width="full" gap={"2"}>
            <Flex
              justifyContent={"space-between"}
              display={["none", "none", "flex", "flex"]}
              width={"full"}
              bg={"brand.600"}
              py="2"
              px={"2"}
              color={"brand.bg1"}
              borderRadius={"md"}
            >
              <Text>Assets</Text>
              <Text>Balance</Text>
              <Text>Action</Text>
            </Flex>
            <VStack
              width={"full"}
              alignContent="flex-start"
              gap={"2"}
              borderBottom={"1px solid #A3BFF5"}
              pb="4"
            >
              <Text
                borderBottom={"1px solid #A3BFF5"}
                border
                width={"full"}
                py={"1"}
                color={"brand.700"}
                fontWeight="bold"
              >
                Fiat
              </Text>
              <VStack width={"full"} gap={"2"} alignContent="flex-start">
                <CoinRow currency={"NGN"} amount={5000} />
                <CoinRow currency={"GHC"} amount={5000} />
              </VStack>
            </VStack>
            <VStack
              width={"full"}
              alignContent="flex-start"
              gap={"2"}
              borderBottom={"1px solid #A3BFF5"}
              pb="4"
            >
              <Text
                borderBottom={"1px solid #A3BFF5"}
                border
                width={"full"}
                py={"1"}
                color={"brand.700"}
                fontWeight="bold"
              >
                Coins
              </Text>
              <VStack width={"full"} gap={"2"} alignContent="flex-start">
                {isLoading ? (
                  <Spinner />
                ) : (
                  wallets.map((wallet, index) => {
                    const { address, network } = wallet;

                    if (network === "Bitcoin") {
                      wallet.balance =
                        wallet.info.incoming - wallet.info.outgoing;
                    } else if (network === "Bnb") {
                      wallet.balance = wallet.info.balance;
                    } else if (network === "Celo") {
                      wallet.balance = wallet.info.celo;
                    } else if (network === "Ethereum") {
                      wallet.balance = wallet.info.balance;
                    } else if (network === "Tron") {
                      wallet.balance = wallet.info.balance / 1000000;
                    }
                    return (
                      <CoinRow
                        key={index}
                        currency={network}
                        address={address}
                        amount={wallet.balance}
                        network={network}
                      />
                    );
                  })
                )}
              </VStack>
            </VStack>
          </VStack>

          {/* <WithdrawModal isOpen={isOpen} onClose={onClose} /> */}
        </VStack>
      </VStack>
    </DashboardLayout>
  );
}

function CoinRow(props) {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState("deposit");
  return (
    <Flex
      width={"full"}
      gap="2"
      justifyContent={"space-between"}
      alignItems={"center"}
      flexDir={["column", "column", "row"]}
    >
      <HStack width={"full"} justifyContent="space-between">
        <Text>{props.currency}</Text>
        <Text ml={["", "", "150px"]}>{props.amount}</Text>
      </HStack>

      <HStack
        width={"full"}
        gap={["0", "0", "4"]}
        justifyContent={["space-between", "space-between", "flex-end"]}
      >
        <Button
          onClick={() => {
            setPage("withdraw");
            onOpen();
          }}
        >
          Withdraw
        </Button>
        <Button
          onClick={() => {
            setPage("deposit");
            onOpen();
          }}
          variant={"outline"}
        >
          Deposit
        </Button>
        <Button
          onClick={() => {
            navigate(`/coin-details/${props.currency.toLowerCase()}`);
          }}
          variant={"outline"}
        >
          History
        </Button>
      </HStack>
      <WalletModal
        isOpen={isOpen}
        onClose={onClose}
        page={page}
        address={props.address}
        network={props.network}
      />
    </Flex>
  );
}
const WalletModal = (props) => {
  const userWallet = localStorage.getItem("wallet");
  const btnRef = React.useRef();
  const { register, handleSubmit } = useForm();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [floatAmount, setFloatAmount] = useState("");
  const [errors, setErrors] = useState([]);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Drawer
      isOpen={props.isOpen}
      placement="right"
      onClose={props.onClose}
      finalFocusRef={btnRef}
      size={"md"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        {props.page === "deposit" && (
          <>
            {" "}
            <DrawerHeader color={"brand.700"} textAlign={"center"}>
              {props.network} Wallet Address
            </DrawerHeader>
            <DrawerBody>
              <Box textAlign={"center"} mt={"100px"}>
                <VStack>
                  <Text fontSize="lg" color={"brand.500"} fontWeight={"bold"}>
                    {props.address}
                  </Text>
                  <Text fontSize={"s"}>
                    Copy wallet address to deposit coin
                  </Text>
                </VStack>
              </Box>{" "}
            </DrawerBody>
          </>
        )}

        {props.page === "withdraw" && (
          <>
            <DrawerHeader color={"brand.700"} textAlign={"center"}>
              Withdraw {props.network}
            </DrawerHeader>
            <DrawerBody>
              <Box width={"full"} textAlign={"center"} mt={"100px"}>
                <form
                  onSubmit={handleSubmit(async (data) => {
                    data.amount = floatAmount;
                    data.network = props.network;
                    if (errors.length > 0) {
                      console.log("error");
                    } else {
                      setIsLoading(true);
                      console.log(data);
                      await axios
                        .post(
                          `${process.env.REACT_APP_BASE_URL}withdraw/`,
                          data,
                          {
                            headers: {
                              Authorization: `Token ${localStorage.getItem(
                                "token"
                              )}`,
                            },
                          }
                        )
                        .then(function (response) {
                          console.log(response);
                          setIsLoading(false);
                          toast({
                            title: "Withdrawal Successful",
                            status: "success",
                          });
                        })
                        .catch(function (error) {
                          setIsLoading(false);
                          toast({
                            title: "An error occured",
                            status: "warning",
                          });
                          console.log(error);
                        });
                    }
                  })}
                  style={{ width: "100%" }}
                >
                  <VStack gap={"20px"}>
                    {/* <Input
                      name="amount"
                      type={"text"}
                      placeholder="Amount"
                      {...register("amount", {
                        onChange: (e) => {
                          console.log(e.target.value.toLocaleString("en-US"));
                        },
                      })}
                      required
                    /> */}
                    <Box width={"full"}>
                      <NumericFormat
                        value={withdrawAmount}
                        placeholder="Amount"
                        required
                        allowLeadingZeros
                        thousandSeparator=","
                        style={{
                          width: "100%",
                          outline: "2px solid transparent",
                          border: "1px solid #e2e8f0",
                          padding: "6px 14px",
                          borderRadius: "5px",
                        }}
                        onChange={(e) => {
                          let amount = e.target.value;
                          let floatAmount;
                          floatAmount = parseFloat(
                            amount.replaceAll(",", "")
                          ).toFixed(18);
                          if (props.network === "Bitcoin") {
                            let btcErrors = [];

                            if (floatAmount < 0.0005) {
                              btcErrors.push("Minimum withdrawal is 0.0005 ");
                              setErrors(btcErrors);
                              console.log(btcErrors);
                            } else {
                              setErrors([]);
                              setFloatAmount(floatAmount.toString());
                              console.log(floatAmount);
                            }
                          } else if (props.network === "Celo") {
                            let coinErrors = [];
                            if (floatAmount < 2) {
                              coinErrors.push("Minimum withdrawal is 2  ");
                              setErrors(coinErrors);
                              console.log(coinErrors);
                            } else {
                              setErrors([]);
                              setFloatAmount(floatAmount.toString());
                              console.log(floatAmount);
                            }
                          } else if (props.network === "Tron") {
                            let coinErrors = [];
                            if (floatAmount < 4) {
                              coinErrors.push("Minimum withdrawal is 2  ");
                              setErrors(coinErrors);
                              console.log(coinErrors);
                            } else {
                              setErrors([]);
                              setFloatAmount(floatAmount.toString());
                              console.log(floatAmount);
                            }
                          }
                        }}
                      />
                      <Box textAlign={"left"}>
                        {errors.length > 0 && (
                          <Text my={"2"} color={"red"} fontSize={"xs"}>
                            {errors[0]}
                          </Text>
                        )}
                      </Box>
                    </Box>
                    <Input
                      name="receiver_address"
                      placeholder="Receiver address"
                      {...register("receiver_address")}
                      required
                    />

                    <Button width={"full"} isLoading={isLoading} type="Submit">
                      {" "}
                      Send
                    </Button>
                  </VStack>
                </form>
                {/* <Input
                  required
                  value={withdrawAmount}
                  onChange={(e) => {
                    let amount = e.target.value.split("");

                    for (let index = 0; index < amount.length; index++) {
                      const element = amount[index];
                      if (isNaN(element)) {
                        amount.pop(element);
                      }
                    }
                    console.log(amount);
                    let joinedAmount = amount.join("");
                    if (!isNaN(joinedAmount)) {
                      setWithdrawAmount(parseFloat(joinedAmount));
                    } else setWithdrawAmount(0);

                    console.log(withdrawAmount);
                  }}
                /> */}
              </Box>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default Wallet;