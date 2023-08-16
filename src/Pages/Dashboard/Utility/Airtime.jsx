import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Airtime = (props) => {
  const telcos = [
    { name: "mtn", logo: "/assets/images/mtn_logo.png", id: 1 },
    { name: "glo", logo: "/assets/images/glo_logo.webp", id: 2 },
    { name: "airtel", logo: "/assets/images/airtel_logo.png", id: 3 },
    { name: "9mobile", logo: "/assets/images/9mobile_logo.jpeg", id: 4 },
  ];

  const [page, setPage] = useState("list");
  const [telco, setTelco] = useState(null);
  const [networkId, setNetworkID] = useState(null);

  return (
    <>
      {page === "list" && (
        <VStack width={"full"} gap={"40px"} my={"40px"}>
          <Text fontSize={"2xl"} textAlign={"center"}>
            {" "}
            Plese Select Telco Provider
          </Text>
          <VStack width={"full"} gap={"10px"}>
            {telcos.length > 0
              ? telcos.map((provider) => {
                  return (
                    <ProviderCard
                      action={() => {
                        setPage("buy");
                        setTelco(provider.name);
                        setNetworkID(provider.id);
                      }}
                      name={provider.name}
                      logo={provider.logo}
                    />
                  );
                })
              : ""}
          </VStack>
        </VStack>
      )}
      {page === "buy" && (
        <AirtimeForm
          telco={telco}
          onClose={props.action}
          networkId={networkId}
          back={() => setPage("list")}
        />
      )}
    </>
  );
};

export const ProviderCard = (props) => {
  return (
    <HStack
      width={"full"}
      padding={"10px"}
      borderRadius={"10px"}
      background={"#fff"}
      _hover={{ background: "#f0f0f0" }}
      cursor={"pointer"}
      gap={"10px"}
      onClick={props.action}
      border={"1px solid #bbcdf1"}
    >
      <Image width={"50px"} src={props.logo} />
      <Text fontSize={"lg"} textTransform={"uppercase"}>
        {props.name}
      </Text>
    </HStack>
  );
};

const AirtimeForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [nairaAmount, setNairaAmount] = useState();
  const [tokenToNairaRate, setTokenToNairaRate] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [currency, setCurrency] = useState("");

  const [wallets, setWallets] = useState([]);
  const buyAirtime = async (data) => {
    data.network = props.networkId;
    // data.token_amount = tokenAmount;
    console.log(data);
    setIsLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}utilities/buy-airtime/`, data, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        toast({ title: "Airtime purchase successful", status: "success" });
        props.onClose();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        toast({
          title: error.response.data.error,
          status: "warning",
        });
      });
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
  const handleAmountChange = (e) => {
    setNairaAmount(e.target.value);
    setTokenAmount(e.target.value * tokenToNairaRate);
  };
  const fetchRate = async (currency) => {
    let rate;
    setIsLoading(true);
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}utilities/naira/${currency}`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response);
        setTokenToNairaRate(response.data);
        setIsLoading(false);
        rate = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return rate;
  };
  //   const handleCurrencyChange = (e) =>
  const handleCurrencyChange = async (e) => {
    const network = e.target.value;
    setCurrency(e.target.value);
    console.log(network);
    for (let index = 0; index < wallets.length; index++) {
      if (wallets[index][0] === network) {
        if (wallets[index][0] === "Celo") {
          setWalletBalance(wallets[index][1].info.celo);
        } else if (wallets[index][0] === network) {
          setWalletBalance(wallets[index][1].info.balance / 1000000);
        }
      }
    }
    const rate = await fetchRate(e.target.value.toLowerCase());
    // alert(currency);

    setTokenAmount(rate * nairaAmount);
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
            BUY {props.telco} AIRTIME
          </Text>
        </HStack>
      </HStack>

      <form style={{ width: "100%" }} onSubmit={handleSubmit(buyAirtime)}>
        <VStack width={"full"} gap={"20px"}>
          <FormControl>
            <FormLabel fontSize={"sm"} color={"blackAlpha.700"}>
              Beneficiary Phone Number
            </FormLabel>

            <Input
              border={"1px solid #f9f9f9"}
              outline={"none"}
              fontSize={"14px"}
              type="tel"
              required
              name="phone"
              minLength={11}
              maxLength={11}
              {...register("phone")}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel fontSize={"sm"} color={"blackAlpha.700"}>
              Amount
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
              fontSize={"16px"}
              {...register("wallet_from", { onChange: handleCurrencyChange })}
              required
            >
              <option>Select Coin</option>;
              {wallets
                .filter((wallet, index) => {
                  return wallet[0] === "Celo" || wallet[0] === "Tron";
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
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <Button isLoading={isLoading} type="submit" width={"full"}>
            Buy Airtime
          </Button>
        </VStack>
      </form>
    </VStack>
  );
};
export default Airtime;
