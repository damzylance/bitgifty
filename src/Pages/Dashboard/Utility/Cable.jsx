import {
  Button,
  FormControl,
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

const Cable = (props) => {
  const [page, setPage] = useState("list");
  const [merchants, setMerchants] = useState([
    { name: "DSTV", logo: "/assets/images/dstv.png", id: 2 },
    { name: "GoTV", logo: "/assets/images/gotv.png", id: 1 },
    { name: "Startime", logo: "/assets/images/startimes.png", id: 3 },
  ]);

  const [merchantName, setMerchantName] = useState(null);
  const [merchantId, setMerchantId] = useState(null);
  return (
    <>
      {page === "list" && (
        <VStack width={"full"} gap={"40px"} my={"40px"}>
          <Text fontSize={"2xl"} textAlign={"center"}>
            {" "}
            Plese Select Cable Provider
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
                      logo={provider.logo}
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
          cable={merchantId}
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

  const handlePlanChange = (e) => {
    const nairaAmount = parseInt(e.target.value.split(",")[1]);
    setNairaAmount(parseInt(e.target.value.split(",")[1]));
    setTokenAmount(tokenToNairaRate * nairaAmount);
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
  const fetchPlans = async () => {
    await axios
      .get(
        `${
          process.env.REACT_APP_BASE_URL
        }utilities/cable-plan/?cable__name=${props.name.toUpperCase()}`,
        {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        console.log(response);
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
  const buyCable = async (data) => {
    data.cable = props.cable;
    data.cable_plan = parseInt(data.plan.split(",")[0]);
    // data.token_amount = data.data.split(",")[1];
    delete data.network;
    delete data.data;
    console.log(data);
    if (tokenAmount >= walletBalance) {
      toast({ title: "insufficient balance", status: "warning" });
    } else {
      setIsLoading(true);

      axios
        .get(
          `https://arktivesub.com/api/cable/cable-validation?iuc=${data.iuc}&cable=${props.cable}`
        )
        .then(async (response) => {
          setIsLoading(false);
          console.log(response.data);
          toast({
            title: "Data purchase successful",
            status: "success",
          });

          // await axios
          //   .post(
          //     `${process.env.REACT_APP_BASE_URL}utilities/buy-data/`,
          //     data,
          //     {
          //       headers: {
          //         Authorization: `Token ${localStorage.getItem("token")}`,
          //       },
          //     }
          //   )
          //   .then((response) => {
          //     setIsLoading(false);
          //     toast({
          //       title: "Data purchase successful",
          //       status: "success",
          //     });
          //     props.onClose();
          //   })
          //   .catch((error) => {
          //     setIsLoading(false);
          //     toast({
          //       title: error.response.data.error,
          //       status: "warning",
          //     });
          //   });
        })
        .catch((error) => {
          setIsLoading(false);
          toast("iuc invalid");
          console.log(error);
        });
    }
  };
  useEffect(() => {
    fetchPlans();
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
            Subscribe For {props.name}
          </Text>
        </HStack>
      </HStack>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(buyCable)}>
        <VStack width={"full"} gap={"20px"}>
          <FormControl>
            <FormLabel>Select Cable Plan</FormLabel>
            <Select
              fontSize={"16px"}
              {...register("plan", { onChange: handlePlanChange })}
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
          </FormControl>
          <FormControl>
            <FormLabel fontSize={"sm"} color={"blackAlpha.700"}>
              Smart Card Number
            </FormLabel>

            <Input
              fontSize={"16px"}
              border={"1px solid #f9f9f9"}
              outline={"none"}
              type="tel"
              required
              name="phone"
              {...register("iuc")}
            />
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
          </FormControl>
          <Button isLoading={isLoading} type="submit" width={"full"}>
            Pay
          </Button>
        </VStack>
      </form>
    </VStack>
  );
};

export default Cable;
