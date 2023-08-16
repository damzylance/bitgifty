import React, { useEffect, useState } from "react";
import { ProviderCard } from "./Airtime";
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
import { useForm } from "react-hook-form";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";

const Data = (props) => {
  const telcos = [
    { name: "mtn", logo: "/assets/images/mtn_logo.png", id: 1 },
    { name: "glo", logo: "/assets/images/glo_logo.webp", id: 2 },
    { name: "airtel", logo: "/assets/images/airtel_logo.png", id: 3 },
    { name: "9mobile", logo: "/assets/images/9mobile_logo.jpeg", id: 4 },
  ];

  const [page, setPage] = useState("list");
  const [telco, setTelco] = useState(null);
  return (
    <>
      {page === "list" && (
        <VStack width={"full"} gap={"40px"} my={"40px"}>
          <Text fontSize={"2xl"}>Plese Select Telco Provider</Text>

          <VStack width={"full"} gap={"10px"}>
            {telcos.length > 0
              ? telcos.map((provider) => {
                  return (
                    <ProviderCard
                      action={() => {
                        setPage("buy");
                        setTelco(provider.name);
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
        <DataForm
          telco={telco}
          onClose={props.action}
          back={() => setPage("list")}
        />
      )}
    </>
  );
};

const DataForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState();
  const [using, setUsing] = useState(null);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [nairaAmount, setNairaAmount] = useState();
  const [tokenToNairaRate, setTokenToNairaRate] = useState(0);
  const [currency, setCurrency] = useState("");
  const [plans, setPlans] = useState([]);
  const [networkId, setNetworkId] = useState([]);
  const [wallets, setWallets] = useState([]);
  const buyData = async (data) => {
    data.network = props.telco;
    data.data_plan = parseInt(data.data.split(",")[0]);
    // data.token_amount = data.data.split(",")[1];
    delete data.network;
    delete data.data;

    if (tokenAmount >= walletBalance) {
      toast({ title: "insufficient balance", status: "warning" });
    } else {
      setIsLoading(true);
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}utilities/buy-data/`, data, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setIsLoading(false);
          toast({
            title: "Data purchase successful",
            status: "success",
          });
          props.onClose();
        })
        .catch((error) => {
          setIsLoading(false);
          toast({
            title: error.response.data.error,
            status: "warning",
          });
        });
    }
  };
  const fetchDataPlans = async () => {
    await axios
      .get(
        `${
          process.env.REACT_APP_BASE_URL
        }utilities/data-plan/?network__name=${props.telco.toUpperCase()}`,
        {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        setPlans(response.data.results);
      })
      .catch((error) => {});
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
  const handleCurrencyChange = async (e) => {
    const network = e.target.value;
    setCurrency(e.target.value);
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

  const handlePlanChange = (e) => {
    const nairaAmount = parseInt(e.target.value.split(",")[1]);
    setNairaAmount(parseInt(e.target.value.split(",")[1]));
    setTokenAmount(tokenToNairaRate * nairaAmount);
  };

  useEffect(() => {
    fetchWallets();
    fetchDataPlans();
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
            BUY {props.telco} DATA
          </Text>
        </HStack>
      </HStack>

      <form style={{ width: "100%" }} onSubmit={handleSubmit(buyData)}>
        <VStack width={"full"} gap={"20px"}>
          <FormControl>
            <FormLabel fontSize={"sm"} color={"blackAlpha.700"}>
              Data Plans
            </FormLabel>

            <Select
              fontSize={"16px"}
              {...register("data", { onChange: handlePlanChange })}
              required
            >
              <option>Choose Plan</option>;
              {plans.map((plan, index) => {
                return (
                  <option value={[plan.plan_id, plan.amount]} key={index}>
                    {plan.plan_name} {plan.validity} (N{plan.amount})
                  </option>
                );
              })}
            </Select>
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
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel fontSize={"sm"} color={"blackAlpha.700"}>
              Beneficiary Phone Number
            </FormLabel>

            <Input
              fontSize={"16px"}
              border={"1px solid #f9f9f9"}
              outline={"none"}
              type="tel"
              required
              name="phone"
              minLength={11}
              maxLength={11}
              {...register("phone")}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>

          {/* <FormControl>
            <FormLabel fontSize={"sm"} color={"blackAlpha.700"}>
              Amount
            </FormLabel>

            <Input
              border={"1px solid #f9f9f9"}
              value={amount}
              outline={"none"}
              fontSize={"14px"}
              type="number"
              min={100}
              required
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl> */}

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
            Buy Data
          </Button>
        </VStack>
      </form>
    </VStack>
  );
};
export default Data;
