import {
  Button,
  Container,
  Flex,
  Input,
  Text,
  VStack,
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
  Image,
  Select,
} from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";

import axios from "axios";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../Components/DashboardLayout";
import Authenticate from "../../../Helpers/Auth";
import { set, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { MdSwapVert } from "react-icons/md";
import { AiFillPlusSquare } from "react-icons/ai";
import { PayoutModal } from "../../UserSetting/Payout";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

function Wallet() {
  const options = {
    headers: { "x-api-key": process.env.REACT_APP_RATE_KEY },
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: [
          "rgba(255, 255, 251, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });
  const [wallets, setWallets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fiatWallets, setFiatWallets] = useState([]);
  const [totalInDollars, setTotalInDollars] = useState(0);

  const fetchWallets = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}wallets/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(async function (response) {
        const entries = Object.entries(response.data);
        if (response.data) {
          setIsLoading(false);
          setWallets(entries);
          setFiatWallets(
            entries.filter((element) => {
              return element[1].type === "fiat";
            })
          );
          const labels = [];
          const balances = [];
          let sum = 0;
          for (let index = 0; index < entries.length; index++) {
            const coinWallet = entries[index];
            if (coinWallet[0] === "Bitcoin") {
              const balance =
                coinWallet[1].info.incoming - coinWallet[1].info.outgoing;
              const btcInDollar = await BalanceToDollar(
                `BTC`,
                isNaN(balance) ? 0 : balance
              );
              sum += btcInDollar;
              balances.push(btcInDollar);
              labels.push("BTC");
            } else if (coinWallet[0] === "Bnb") {
              sum += 0;
              balances.push(0);
              labels.push("BNB");
            } else if (coinWallet[0] === "Celo") {
              const balance = coinWallet[1].info.celo;

              const celoInDollar = await BalanceToDollar(
                `CELO`,
                isNaN(balance) ? 0 : balance
              );
              sum += celoInDollar;
              balances.push(celoInDollar);
              labels.push("CELO");
            } else if (coinWallet[0] === "Ethereum") {
              const balance = coinWallet[1].info.balance;
              const ethInDollar = await BalanceToDollar(
                `ETH`,
                isNaN(balance) ? 0 : balance
              );
              sum += ethInDollar;
              balances.push(ethInDollar);
              labels.push("ETH");
            } else if (coinWallet[0] === "Tron") {
              const balance = coinWallet[1].info.balance / 1000000;
              const trxInDollar = await BalanceToDollar(
                `TRON`,
                isNaN(balance) ? 0 : balance
              );
              sum += trxInDollar;
              balances.push(trxInDollar);
              labels.push("TRON");
            } else if (coinWallet[0] === "naira") {
              const balance = Math.round(coinWallet[1].balance) / 850;
              sum += isNaN(balance) ? 0 : balance;
              balances.push(balance);
              labels.push("NGN");
            }

            setTotalInDollars(sum.toFixed(2));
            setChartData({
              labels: labels,
              datasets: [
                {
                  label: "Balance",
                  data: balances,
                  backgroundColor: [
                    "#492b7c",
                    "#ff8600",
                    "#fff",
                    "#f8a6e4",
                    "#6A6BD5",
                    "#624CAB",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            });
          }
        }
      })
      .catch(function (error) {});
  };
  useEffect(() => {
    fetchWallets();
  }, []);

  const BalanceToDollar = async (coin, balance) => {
    let rate;
    await axios
      .get(`https://api.tatum.io/v3/tatum/rate/${coin}?basePair=USD`, options)
      .then((response) => {
        rate = response.data.value;
      })
      .catch((error) => {});

    return parseFloat(balance) * parseFloat(rate);
  };
  return (
    <DashboardLayout>
      <VStack gap={"10"} width="full" scrollBehavior={"smooth"}>
        <Container
          background={"#202f44"}
          py={"4"}
          border={"1px solid #A3BFF5"}
          borderRadius={"12px"}
          maxWidth="400px"
          position={"relative"}
          backgroundImage={"assets/images/waves.svg"}
          bgSize={"cover"}
        >
          <VStack
            position={"relative"}
            alignItems={"flex-start"}
            gap={0}
            justifyContent={"flex-start"}
            width={"full"}
          >
            <Text
              fontStyle={"italic"}
              color={"whiteAlpha.900"}
              fontSize={"lg"}
              fontWeight={"600"}
            >
              Total Balance
            </Text>

            <HStack
              width={"full"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <VStack gap={"4"} alignItems={"flex-start"}>
                <Text
                  fontSize={"2xl"}
                  fontWeight={"900"}
                  color={"whiteAlpha.900"}
                >
                  {totalInDollars} cUSD
                </Text>
                <Text
                  color={"whiteAlpha.800"}
                  fontSize={"2xl"}
                  fontWeight={"900"}
                >
                  ${totalInDollars}
                </Text>
              </VStack>
              <Box width={"150px"}>
                {" "}
                <Doughnut options={chartOptions} data={chartData} />
              </Box>
            </HStack>
          </VStack>
        </Container>
        <VStack
          alignItems={"flex-start"}
          width="full"
          gap={"10"}
          px={["10px", "10px", "none"]}
        >
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
                {isLoading ? (
                  <Spinner />
                ) : (
                  wallets
                    .filter((wallet) => {
                      return wallet[1].type === "fiat";
                    })
                    .map((wallet, index) => {
                      // const { address, network } = wallet;
                      const coinWallet = wallet;
                      const balance = Math.floor(coinWallet[1].balance);

                      return (
                        <CoinRow
                          key={index}
                          currency={coinWallet[0].toUpperCase()}
                          address={coinWallet[1].address}
                          amount={isNaN(balance) ? 0 : balance}
                          network={coinWallet[0]}
                          qr={coinWallet[1].qrcode}
                          refresh={() => {
                            fetchWallets();
                          }}
                          type={coinWallet[1].type}
                        />
                      );
                    })
                )}
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
                  wallets
                    .filter((wallet) => {
                      return wallet[1].type !== "fiat";
                    })
                    .map((wallet, index) => {
                      // const { address, network } = wallet;
                      const coinWallet = wallet;
                      let balance;
                      if (coinWallet[0] === "Bitcoin") {
                        balance =
                          coinWallet[1].info.incoming -
                          coinWallet[1].info.outgoing;
                      } else if (coinWallet[0] === "Bnb") {
                        balance = 0;
                      } else if (coinWallet[0] === "Celo") {
                        balance = coinWallet[1].info.celo;
                      } else if (coinWallet[0] === "Ethereum") {
                        balance = coinWallet[1].info.balance;
                      } else if (coinWallet[0] === "Tron") {
                        balance = coinWallet[1].info.balance / 1000000;
                      } else if (coinWallet[0] === "naira") {
                        balance = Math.round(coinWallet[1].balance);
                      }
                      return (
                        <CoinRow
                          key={index}
                          currency={coinWallet[0].toUpperCase()}
                          address={coinWallet[1].address}
                          amount={isNaN(balance) ? 0 : balance}
                          network={coinWallet[0]}
                          qr={coinWallet[1].qrcode}
                          refresh={() => {
                            fetchWallets();
                          }}
                          type={"crypto"}
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
      background={"#fff"}
      padding={"20px 10px"}
      borderRadius={"10px"}
      boxShadow={"0px 2px 8px rgba(199, 199, 199, 0.6)"}
    >
      <HStack width={"full"} justifyContent="space-between">
        <Text>{props.currency}</Text>
        <Text ml={["", "", "150px"]}>{props.amount}</Text>
      </HStack>

      <HStack
        width={"full"}
        gap={["0", "0", "0"]}
        justifyContent={["space-between", "space-between", "flex-end"]}
      >
        <Button
          size={["sm", "sm", "md"]}
          onClick={() => {
            setPage("withdraw");
            onOpen();
          }}
          disabled={
            props.currency === "ETHEREUM" || props.currency === "BITCOIN"
              ? true
              : false
          }
        >
          Withdraw
        </Button>
        <Button
          size={["sm", "sm", "md"]}
          onClick={() => {
            if (props.type !== "fiat") {
              setPage("deposit");
              onOpen();
            }
          }}
          variant={"outline"}
          disabled={
            props.currency === "NAIRA" ||
            props.currency === "ETHEREUM" ||
            props.currency === "BITCOIN"
              ? true
              : false
          }
        >
          Deposit
        </Button>
        <Button
          size={["sm", "sm", "md"]}
          onClick={() => {
            if (props.type !== "fiat") {
              setPage("swap");
              onOpen();
            }
          }}
          variant={"outline"}
          disabled={
            props.currency === "NAIRA" ||
            props.currency === "ETHEREUM" ||
            props.currency === "BITCOIN"
              ? true
              : false
          }
        >
          Swap
        </Button>
        <Button
          size={["sm", "sm", "md"]}
          onClick={() => {
            navigate("/utilities");
          }}
          variant={"outline"}
          disabled={
            props.currency === "NAIRA" ||
            props.currency === "ETHEREUM" ||
            props.currency === "BITCOIN"
              ? true
              : false
          }
        >
          Spend
        </Button>
        <Button
          size={["sm", "sm", "md"]}
          onClick={() => {
            if (props.type === "fiat") {
              navigate(`/fiat-history/`);
            } else {
              navigate(`/coin-details/${props.currency.toLowerCase()}`);
            }
          }}
          variant={"outline"}
          disabled={
            props.currency === "ETHEREUM" || props.currency === "BITCOIN"
              ? true
              : false
          }
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
        qr={props.qr}
        refresh={props.refresh}
        balance={props.amount}
        type={props.type}
      />
    </Flex>
  );
}
const WalletModal = (props) => {
  const btnRef = React.useRef();
  const {
    onOpen: bankModalOpen,
    onClose: bankModalClose,
    isOpen: bankModalisOpen,
  } = useDisclosure();
  const { register, handleSubmit } = useForm();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [floatAmount, setFloatAmount] = useState("");
  const [errors, setErrors] = useState([]);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [accountsLoading, setAccountsLoading] = useState(false);

  const navigate = useNavigate();
  const fetchBankAccounts = async () => {
    setAccountsLoading(true);
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}payouts/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBankAccounts(
          response.data.results.map((bank) => {
            return {
              ...bank,
              label: `${bank.bank_name} -  ${bank.account_number} - ${bank.account_name}`,
            };
          })
        );
        setAccountsLoading(false);
      })
      .catch((error) => {
        setAccountsLoading(false);
      });
  };
  const [exchangeRate, setExchangeRate] = useState();
  const fetchNairaRate = async (coin) => {
    let rate;
    setIsLoading(true);
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}swap/naira/${coin}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setIsLoading(false);
        rate = response.data;
      })
      .catch((error) => {});
    return rate;
  };
  const SwapToNaira = async (data) => {
    data.swap_amount = floatAmount;
    data.swap_to = "naira";
    data.swap_from = props.network;
    if (errors.length > 0) {
    } else {
      setIsLoading(true);
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}swap/`, data, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then(function (response) {
          setIsLoading(false);
          toast({
            title: "Swap Successful",
            status: "success",
          });
          props.refresh();
          props.onClose();
        })
        .catch(function (error) {
          setIsLoading(false);
          if (error.response.data.error.includes("Insufficient funds")) {
            toast({
              title: "insufficient funds",
              status: "warning",
            });
          } else {
            toast({
              title: "An error occured",
              status: "warning",
            });
          }
        });
    }
  };
  const WithdrawFiat = async (data) => {
    data.amount = withdrawAmount;
    data.network = props.network;
    if (errors.length > 0) {
    } else {
      setIsLoading(true);
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}withdraw/`, data, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then(function (response) {
          setIsLoading(false);
          toast({
            title: "Withdrawal Successful",
            status: "success",
          });
          props.refresh();
          props.onClose();
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
          toast({
            title: "An error occured",
            status: "warning",
          });
        });
    }
  };
  const WithdrawCrypto = async (data) => {
    data.amount = floatAmount;
    data.network = props.network;
    if (errors.length > 0) {
    } else {
      setIsLoading(true);
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}withdraw/`, data, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then(function (response) {
          setIsLoading(false);
          toast({
            title: "Withdrawal Successful",
            status: "success",
          });
          props.refresh();
          props.onClose();
        })
        .catch(function (error) {
          setIsLoading(false);
          toast({
            title: "An error occured",
            status: "warning",
          });
        });
    }
  };

  useEffect(() => {
    if (props.type === "fiat") {
      fetchBankAccounts();
    }
  }, []);

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
              {props.network} Wallet Address (
              {props.network === "Celo"
                ? "Celo Network"
                : props.network === "Ethereum"
                ? "ERC 20"
                : props.network === "Tron"
                ? "TRC 20"
                : props.network === "Bnb"
                ? "Binance Chain"
                : "Bitcoin"}
              )
            </DrawerHeader>
            <DrawerBody>
              <Box textAlign={"center"} mt={"40px"}>
                <VStack>
                  <Image src={props.qr} />
                  <Text
                    fontSize={["sm", "md", "lg"]}
                    color={"brand.500"}
                    fontWeight={"bold"}
                  >
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
              Withdraw{" "}
              <span style={{ textTransform: "capitalize" }}>
                {props.network}
              </span>
            </DrawerHeader>
            <DrawerBody>
              <Box width={"full"} textAlign={"center"} mt={"100px"}>
                {props.type === "fiat" ? (
                  <form
                    onSubmit={handleSubmit(WithdrawFiat)}
                    style={{ width: "100%" }}
                  >
                    {bankAccounts.length > 0 ? (
                      <VStack gap={"20px"}>
                        <VStack gap={"20px"} width={"full"}>
                          <VStack width={"full"} alignItems={"flex-start"}>
                            <Text
                              fontSize={"xs"}
                              fontWeight={"semibold"}
                              color={"gray.600"}
                            >
                              NGN Amount
                            </Text>
                            <NumericFormat
                              value={withdrawAmount}
                              placeholder="Amount"
                              required
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
                                setWithdrawAmount(amount);
                                let toFloatAmount;
                                toFloatAmount = parseFloat(
                                  amount.replaceAll(",", "")
                                );
                                if (props.network === "naira") {
                                  let coinErrors = [];
                                  if (toFloatAmount > props.balance) {
                                    coinErrors.push("Insufficient Balance");
                                  } else {
                                    if (toFloatAmount < 5) {
                                      coinErrors.push(
                                        "Minimum withdrawal is 5  "
                                      );
                                      setErrors(coinErrors);
                                    } else {
                                      setErrors([]);
                                      setFloatAmount(
                                        isNaN(toFloatAmount.toString())
                                          ? 0
                                          : toFloatAmount
                                      );
                                      setWithdrawAmount(
                                        isNaN(toFloatAmount.toString())
                                          ? 0
                                          : toFloatAmount
                                      );
                                    }
                                  }
                                }
                              }}
                            />
                            <HStack width={"full"} justifyContent={"flex-end"}>
                              <Text
                                color={"blackAlpha.500"}
                                fontSize={"xs"}
                                textDecoration={"underline"}
                                fontWeight={"semibold"}
                                cursor={"pointer"}
                                onClick={() => {
                                  setWithdrawAmount(props.balance);
                                }}
                              >
                                MAX
                              </Text>
                            </HStack>
                          </VStack>

                          <VStack width={"full"} alignItems={"flex-start"}>
                            <Text
                              fontSize={"xs"}
                              fontWeight={"semibold"}
                              color={"gray.600"}
                            >
                              Select Bank Account
                            </Text>
                            <Box width={"full"} textAlign={"left"}>
                              <Select
                                bg={"#fff"}
                                borderRadius={"md"}
                                name="account_number"
                                {...register("account_number")}
                              >
                                {bankAccounts.map((bankAccount, id) => {
                                  return (
                                    <option
                                      key={id}
                                      value={`${bankAccount.account_number}`}
                                    >
                                      {bankAccount.label}
                                    </option>
                                  );
                                })}
                              </Select>
                            </Box>
                            <Box height={"10px"}></Box>
                            <HStack
                              width={"full"}
                              border={"1px solid"}
                              borderColor={"gray.300"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              padding={"10px"}
                              borderRadius={"xl"}
                              cursor={"pointer"}
                              onClick={() => {
                                bankModalOpen();
                                fetchBankAccounts();
                              }}
                            >
                              <Text
                                pl={"10px"}
                                lineHeight={"100%"}
                                color={"gray.600"}
                                fontSize={"sm"}
                                fontWeight={"medium"}
                                borderLeft={"2px solid #477FEB "}
                              >
                                Add another bank
                              </Text>
                              <AiFillPlusSquare
                                color={"#103D96"}
                                fontSize={"24px"}
                                cursor={"pointer"}
                              />
                            </HStack>
                            <Box textAlign={"left"}>
                              {errors.length > 0 && (
                                <Text my={"2"} color={"red"} fontSize={"xs"}>
                                  {errors[0]}
                                </Text>
                              )}
                            </Box>
                          </VStack>
                        </VStack>
                        <Button
                          width={"full"}
                          isLoading={isLoading}
                          type="Submit"
                        >
                          {" "}
                          Withdraw
                        </Button>
                      </VStack>
                    ) : (
                      <VStack>
                        <Text fontSize={"md"} color={"gray.700"}>
                          You don't have a payment method. Please set one
                        </Text>
                        <HStack
                          width={"full"}
                          border={"1px solid"}
                          borderColor={"gray.300"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          padding={"20px"}
                          borderRadius={"xl"}
                          cursor={"pointer"}
                          onClick={() => {
                            bankModalOpen();
                            fetchBankAccounts();
                          }}
                        >
                          <Text
                            pl={"10px"}
                            lineHeight={"100%"}
                            color={"gray.600"}
                            fontWeight={"semibold"}
                            borderLeft={"2px solid #477FEB "}
                          >
                            Add Bank
                          </Text>
                          <AiFillPlusSquare
                            color={"#103D96"}
                            fontSize={"24px"}
                            cursor={"pointer"}
                          />
                        </HStack>
                      </VStack>
                    )}
                  </form>
                ) : (
                  ""
                )}
                {props.type === "crypto" ? (
                  <form
                    onSubmit={handleSubmit(WithdrawCrypto)}
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
                            setWithdrawAmount(amount);

                            let toFloatAmount;
                            toFloatAmount = parseFloat(
                              amount.replaceAll(",", "")
                            ).toFixed(7);
                            if (props.network === "Bitcoin") {
                              let btcErrors = [];

                              if (toFloatAmount < 0.0005) {
                                btcErrors.push("Minimum withdrawal is 0.0005 ");
                                setErrors(btcErrors);
                              } else {
                                setErrors([]);
                                setFloatAmount(toFloatAmount.toString());
                              }
                            } else if (props.network === "Celo") {
                              let coinErrors = [];
                              if (toFloatAmount < 2) {
                                coinErrors.push("Minimum withdrawal is 2");
                                setErrors(coinErrors);
                              } else {
                                setErrors([]);
                                setFloatAmount(toFloatAmount.toString());
                              }
                            } else if (props.network === "Tron") {
                              let coinErrors = [];
                              if (toFloatAmount < 2) {
                                coinErrors.push("Minimum withdrawal is 2  ");
                                setErrors(coinErrors);
                              } else {
                                setErrors([]);
                                setFloatAmount(toFloatAmount.toString());
                              }
                            } else if (props.network === "Bnb") {
                              let coinErrors = [];
                              if (toFloatAmount < 0.002) {
                                coinErrors.push(
                                  "Minimum withdrawal is 0.002  "
                                );
                                setErrors(coinErrors);
                              } else {
                                setErrors([]);
                                setFloatAmount(toFloatAmount);
                              }
                            } else if (props.network === "Ethereum") {
                              let coinErrors = [];
                              if (toFloatAmount < 0.001) {
                                coinErrors.push(
                                  "Minimum withdrawal is 0.001  "
                                );
                                setErrors(coinErrors);
                              } else {
                                setErrors([]);
                                setFloatAmount(toFloatAmount.toString());
                              }
                            } else if (props.network === "naira") {
                              let coinErrors = [];
                              if (toFloatAmount < 5) {
                                coinErrors.push("Minimum withdrawal is 5  ");
                                setErrors(coinErrors);
                              } else {
                                setErrors([]);
                                setFloatAmount(toFloatAmount.toString());
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

                      <Button
                        width={"full"}
                        isLoading={isLoading}
                        type="Submit"
                      >
                        {" "}
                        Send
                      </Button>
                    </VStack>
                  </form>
                ) : (
                  ""
                )}

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
              <PayoutModal isOpen={bankModalisOpen} onClose={bankModalClose} />
            </DrawerBody>
          </>
        )}
        {props.page === "swap" && (
          <>
            <DrawerHeader color={"brand.700"} textAlign={"center"}>
              Swap {props.network} to NGN
            </DrawerHeader>
            <DrawerBody>
              <Box width={"full"} textAlign={"center"} mt={"100px"}>
                <form
                  onSubmit={handleSubmit(SwapToNaira)}
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
                    <Box
                      width={"full"}
                      background={"#d7eff4"}
                      pt={"20px"}
                      px={"10px"}
                      borderRadius={"lg"}
                    >
                      <VStack
                        width={"full"}
                        gap={"10px"}
                        alignItems={"flex-start"}
                      >
                        <Text
                          fontSize={"xs"}
                          fontWeight={"semibold"}
                          color={"gray.600"}
                        >
                          From
                        </Text>
                        <HStack
                          width={"full"}
                          gap={"5px"}
                          borderRadius={"5px"}
                          padding={"6px 2px"}
                        >
                          <Select
                            bg={"#fff"}
                            borderRadius={"full"}
                            width={"120px"}
                            height={"40px"}
                            size={"sm"}
                            border={0}
                          >
                            <option value={`${props.network}`}>
                              {props.network}
                            </option>
                          </Select>
                          <NumericFormat
                            value={withdrawAmount}
                            placeholder="0.00"
                            required
                            allowLeadingZeros
                            thousandSeparator=","
                            style={{
                              width: "100%",
                              outline: "0px",
                              border: "none",
                              background: "none",
                              padding: "6px 14px",
                              borderRadius: "5px",
                              fontSize: "22px",
                            }}
                            onChange={async (e) => {
                              let amount = e.target.value;
                              let toFloatAmount;
                              const rate = await fetchNairaRate(
                                props.network.toLowerCase()
                              );

                              toFloatAmount = parseFloat(
                                amount.replaceAll(",", "")
                              ).toFixed(7);

                              let balanceError = [];

                              //  setExchangeRate(rate * toFloatAmount);
                              setExchangeRate(Math.round(toFloatAmount * rate));
                              if (toFloatAmount > parseFloat(props.balance)) {
                                balanceError.push("Insufficient balance");
                                setErrors(balanceError);
                              } else {
                                if (props.network === "Bitcoin") {
                                  let btcErrors = [];

                                  if (toFloatAmount < 0.0005) {
                                    btcErrors.push("Minimum amount is 0.0005 ");
                                    setErrors(btcErrors);
                                  } else {
                                    setErrors([]);
                                    setFloatAmount(toFloatAmount.toString());
                                  }
                                } else if (props.network === "Celo") {
                                  let coinErrors = [];
                                  if (toFloatAmount < 1) {
                                    coinErrors.push("Minimum amount is 1");
                                    setErrors(coinErrors);
                                  } else {
                                    setErrors([]);
                                    setFloatAmount(toFloatAmount.toString());
                                  }
                                } else if (props.network === "Tron") {
                                  let coinErrors = [];

                                  if (toFloatAmount < 2) {
                                    coinErrors.push("Minimum amount is 2  ");
                                    setErrors(coinErrors);
                                  } else {
                                    setErrors([]);
                                    setFloatAmount(toFloatAmount.toString());
                                  }
                                } else if (props.network === "Bnb") {
                                  let coinErrors = [];
                                  if (toFloatAmount < 0.002) {
                                    coinErrors.push(
                                      "Minimum withdrawal is 0.002  "
                                    );
                                    setErrors(coinErrors);
                                  } else {
                                    setErrors([]);
                                    setFloatAmount(toFloatAmount);
                                  }
                                } else if (props.network === "Ethereum") {
                                  let coinErrors = [];
                                  if (toFloatAmount < 0.001) {
                                    coinErrors.push(
                                      "Minimum withdrawal is 0.001  "
                                    );
                                    setErrors(coinErrors);
                                  } else {
                                    setErrors([]);
                                    setFloatAmount(toFloatAmount.toString());
                                  }
                                }
                              }
                            }}
                          />
                        </HStack>

                        <Box textAlign={"left"}>
                          {errors.length > 0 && (
                            <Text my={"2"} color={"red"} fontSize={"xs"}>
                              {errors[0]}
                            </Text>
                          )}
                        </Box>
                      </VStack>
                    </Box>
                    <Box
                      padding={"10px"}
                      bg={"#eff6f7"}
                      cursor={"pointer"}
                      borderRadius={"full"}
                    >
                      <MdSwapVert fontSize={"28px"} />
                    </Box>
                    <Box
                      width={"full"}
                      background={"#d7eff4"}
                      pt={"20px"}
                      px={"10px"}
                      borderRadius={"lg"}
                    >
                      <VStack
                        width={"full"}
                        gap={"10px"}
                        alignItems={"flex-start"}
                      >
                        <Text
                          fontSize={"xs"}
                          fontWeight={"semibold"}
                          color={"gray.600"}
                        >
                          To
                        </Text>
                        <HStack
                          width={"full"}
                          gap={"5px"}
                          borderRadius={"5px"}
                          padding={"6px 2px"}
                        >
                          <Select
                            bg={"#fff"}
                            borderRadius={"full"}
                            width={"120px"}
                            height={"40px"}
                            size={"sm"}
                            border={0}
                          >
                            <option value={`naira`}>NGN</option>
                          </Select>
                          <NumericFormat
                            value={exchangeRate}
                            placeholder="0.00"
                            required
                            allowLeadingZeros
                            thousandSeparator=","
                            disabled
                            style={{
                              width: "100%",
                              outline: "0px",
                              border: "none",
                              background: "none",
                              padding: "6px 14px",
                              borderRadius: "5px",
                              fontSize: "22px",
                              cursor: "not-allowed",
                            }}
                          />
                        </HStack>

                        <Box textAlign={"left"}>
                          {errors.length > 0 && (
                            <Text my={"2"} color={"red"} fontSize={"xs"}></Text>
                          )}
                        </Box>
                      </VStack>
                    </Box>
                    <Box width={"full"} height={"40px"}></Box>
                    <Button
                      width={"full"}
                      mt={"10px"}
                      size={"lg"}
                      isLoading={isLoading}
                      disabled={errors.length > 0 ? true : false}
                      type="Submit"
                    >
                      Swap
                    </Button>
                    <Link
                      to={"/swap-history"}
                      style={{ textDecoration: "underline", color: "GrayText" }}
                    >
                      View History
                    </Link>
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
