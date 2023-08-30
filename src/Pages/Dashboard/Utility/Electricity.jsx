import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ProviderCard } from "./Airtime";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";

const Electricity = (props) => {
  const [page, setPage] = useState("list");
  const [merchants, setMerchants] = useState([
    { name: "Ikeja Electricity", id: 2 },
    { name: "Eko Electricity", id: 3 },
    { name: "Kano Electricity", id: 4 },
    {
      name: "Port Harcourt Electricity",
      id: 5,
    },
    {
      name: "Jos Electricity",
      id: 6,
    },
    {
      name: "Ibadan Electricity",
      id: 7,
    },
    {
      name: "Kaduna Electric",
      id: 8,
    },
    {
      name: "Abuja Electricity",
      id: 9,
    },
  ]);

  const [merchantName, setMerchantName] = useState(null);
  const [merchantId, setMerchantId] = useState(null);
  return (
    <>
      {page === "list" && (
        <VStack width={"full"} gap={"40px"} my={"40px"}>
          <Text fontSize={"2xl"} textAlign={"center"}>
            {" "}
            Plese Select Your Disco
          </Text>
          <VStack width={"full"} gap={"10px"}>
            {merchants.length > 0
              ? merchants.map((provider, id) => {
                  return (
                    <ProviderCard
                      key={id}
                      action={() => {
                        setPage("buy");
                        setMerchantId(provider.id);
                        setMerchantName(provider.name);
                      }}
                      name={provider.name}
                      logo={"/assets/images/idea.png"}
                    />
                  );
                })
              : ""}
          </VStack>
        </VStack>
      )}
      {page === "buy" && (
        <CableForm
          onClose={props.action}
          name={merchantName}
          disco={merchantId}
          back={() => setPage("list")}
        />
      )}
    </>
  );
};
const CableForm = (props) => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [wallets, setWallets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [nairaAmount, setNairaAmount] = useState();
  const [tokenToNairaRate, setTokenToNairaRate] = useState(0);
  const [currency, setCurrency] = useState("");
  const [walletBalance, setWalletBalance] = useState(null);

  //   const handlePlanChange = (e) => {
  //     const nairaAmount = parseInt(e.target.value.split(",")[1]);
  //     setNairaAmount(parseInt(e.target.value.split(",")[1]));
  //     setTokenAmount(tokenToNairaRate * nairaAmount);
  //   };
  const handleAmountChange = (e) => {
    setNairaAmount(e.target.value);
    setTokenAmount(e.target.value * tokenToNairaRate);
  };
  const handleCurrencyChange = async (e) => {
    const network = e.target.value;
    setCurrency(e.target.value);
    for (let index = 0; index < wallets.length; index++) {
      if (wallets[index][0] === network) {
        if (wallets[index][0] === "Celo") {
          setWalletBalance(wallets[index][1].info.celo);
        } else if (wallets[index][0] === "Tron") {
          setWalletBalance(wallets[index][1].info.balance / 1000000);
        } else if (wallets[index][0] === "naira") {
          setWalletBalance(wallets[index][1].balance);
          console.log(wallets[index]);
        }
      }
    }
    if (network === "naira") {
      setTokenAmount(0);
    } else {
      const rate = await fetchRate(e.target.value.toLowerCase());
      // alert(currency);

      setTokenAmount(rate * nairaAmount);
    }
  };

  const fetchWallets = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}wallets/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        if (response.data) {
          const entries = Object.entries(response.data);
          setIsLoading(false);

          setWallets(entries);
          localStorage.setItem("wallets", JSON.stringify(entries));
        }
      })
      .catch(function (error) {});
  };
  const fetchRate = async (currency) => {
    let rate;
    setIsLoading(true);
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}utilities/naira/${currency}`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setTokenToNairaRate(response.data);
        rate = response.data;
        setIsLoading(false);
      })
      .catch((error) => {});

    return rate;
  };
  const buyCable = async (data) => {
    data.disco = props.disco - 1;
    data.amount = parseInt(data.amount);
    data.bypass = false;
    data.meter_number = "0201001577638";
    data = { ...data, "request-id": "test123456" };

    delete data.wallet_from;

    // data.wallet_from = data.wallet_from.toLowerCase();
    // data.token_amount = data.data.split(",")[1];

    console.log(data);
    if (tokenAmount >= walletBalance) {
      toast({ title: "insufficient balance", status: "warning" });
    } else {
      setIsLoading(true);

      await axios
        .get(
          `https://arktivesub.com/api/bill/bill-validation?meter_number=${
            data.meter_number
          }&disco=${props.disco - 1}&meter_type=${data.meter_type}`
        )
        .then(async (response) => {
          console.log(response.data);
          toast({ title: "Payment successful", status: "success" });
          //   await axios
          //     .post(
          //       `${process.env.REACT_APP_BASE_URL}utilities/buy-electricity/`,
          //       data,
          //       {
          //         headers: {
          //           Authorization: `Token ${localStorage.getItem("token")}`,
          //         },
          //       }
          //     )
          //     .then((response) => {
          //       console.log(response);
          //       setIsLoading(false);
          //       toast({
          //         title: "Purchase successful",
          //         status: "success",
          //       });
          //       props.onClose();
          //     })
          //     .catch((error) => {
          //       console.log(error);
          //       setIsLoading(false);
          //       toast({
          //         title: error.response.data.error,
          //         status: "warning",
          //       });
          //     });
        })
        .catch((error) => {
          setIsLoading(false);
          toast({ title: error.response.data.message, status: "warning" });
          console.log(error);
        });
    }
  };
  useEffect(() => {
    fetchWallets();
  }, []);
  return (
    <VStack my={"40px"} gap={"20px"} width={"full"}>
      <HStack width={"full"} alignItems={"center"}>
        <ArrowBackIcon
          fontSize={"20px"}
          cursor={"pointer"}
          onClick={props.back}
        />
        <HStack width={"full"} justifyContent={"cener"}>
          <Text
            textAlign={"center"}
            fontSize={"2xl"}
            textTransform={"uppercase"}
            width={"full"}
          >
            {props.name}
          </Text>
        </HStack>
      </HStack>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(buyCable)}>
        <VStack width={"full"} gap={"20px"}>
          <FormControl>
            <FormLabel>Select Meter Type</FormLabel>
            <Select fontSize={"16px"} {...register("meter_type")} required>
              <option value={"prepaid"}>Prepaid</option>
              <option value={"postpaid"}>Postpaid</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel fontSize={"sm"} color={"blackAlpha.700"}>
              Meter Number
            </FormLabel>

            <Input
              fontSize={"16px"}
              border={"1px solid #f9f9f9"}
              outline={"none"}
              type="tel"
              required
              name="meter_number"
              {...register("meter_number")}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize={"sm"} color={"blackAlpha.700"}>
              Amount (₦)
            </FormLabel>

            <Input
              border={"1px solid #f9f9f9"}
              outline={"none"}
              fontSize={"16px"}
              type="number"
              min={50}
              required
              {...register("amount", {
                onChange: handleAmountChange,
                max: {
                  value: walletBalance / tokenToNairaRate,
                  message: "Insufficient funds",
                },
              })}
            />
            <HStack
              width={"full"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mt={"5px"}
            >
              <Text fontSize={"xs"} textAlign={"right"}>
                ≈ {tokenAmount.toFixed(2)} {currency}
              </Text>
              <Text color={"red"} fontSize={"xx-small"}>
                {errors.amount && errors.amount.message}
              </Text>
            </HStack>

            <FormErrorMessage>
              {errors.amount && errors.amount.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel fontSize={"sm"} color={"blackAlpha.700"}>
              Pay with: Select Wallet
            </FormLabel>

            <Select
              {...register("wallet_from", { onChange: handleCurrencyChange })}
              required
            >
              <option>Select Coin</option>;
              {wallets
                .filter((wallet, index) => {
                  return (
                    wallet[0] === "Celo" ||
                    wallet[0] === "Tron" ||
                    wallet[0] === "naira"
                  );
                })
                .map((wallet, index) => {
                  return (
                    <option value={wallet[0]} key={index}>
                      {wallet[0]}
                    </option>
                  );
                })}
            </Select>
            <Text mt={"10px"}>Balance: {walletBalance}</Text>
          </FormControl>
          <Button isLoading={isLoading} type="submit" width={"full"}>
            Pay
          </Button>
        </VStack>
      </form>
    </VStack>
  );
};

export default Electricity;
