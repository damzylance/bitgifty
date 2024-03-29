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
import { ArrowBackIcon, InfoIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import useWallets from "../../../Hooks/useWallets";

const Electricity = (props) => {
  const [page, setPage] = useState("list");
  const [merchants, setMerchants] =  useState([
    { name: "IKEDC  PREPAID", id: "BIL113", item_code: "UB159" },
    { name: "EKEDC PREPAID TOPUP", id: "BIL112", item_code: "UB157" },
    {
      name: "ABUJA DISCO Prepaid",
      id: "BIL204",
      item_code: "UB584",
    },
    {
      name: "IBADAN DISCO ELECTRICITY PREPAID",
      id: "BIL114",
      item_code: "UB161",
    },
    { name: "KANO DISCO PREPAID TOPUP", id: "BIL120", item_code: "UB169" },

    {
      name: "KADUNA DISCO ELECTRICITY BILLS",
      id: "BIL119",
      item_code: "UB602",
    },
    {
      name: "ENUGU DISCO ELECTRIC BILLS PREPAID TOPUP",
      id: "BIL115",
      item_code: "UB163",
    },
  ]);

  const [merchantName, setMerchantName] = useState(null);
  const [merchantId, setMerchantId] = useState(null);
  const [itemCode, setItemCode] = useState("");

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
                        setMerchantName(provider.name)
                        setItemCode(provider.item_code);;
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
          item_code={itemCode}
          name={merchantName}
          disco={merchantId}
          back={() => setPage("list")}
        />
      )}
    </>
  );
};
const CableForm = (props) => {
  const { userWallets } = useWallets();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [nairaAmount, setNairaAmount] = useState();
  const [tokenToNairaRate, setTokenToNairaRate] = useState(0);
  const [currency, setCurrency] = useState("");
  const [walletBalance, setWalletBalance] = useState(null);
  const [loadingMessage,setLoadingMessage] = useState("")
  const [customerDetails,setCustomerDetails] = useState("")

  //   const handlePlanChange = (e) => {
  //     const nairaAmount = parseInt(e.target.value.split(",")[1]);
  //     setNairaAmount(parseInt(e.target.value.split(",")[1]));
  //     setTokenAmount(tokenToNairaRate * nairaAmount);
  //   };
  const handleAmountChange = (e) => {
    const tempNairaAmount = e.target.value;
    setNairaAmount(tempNairaAmount);
    if (currency === "usdt_tron" || currency === "cusd") {
      setTokenAmount(tempNairaAmount / tokenToNairaRate);
    } else {
      setTokenAmount(tokenToNairaRate * tempNairaAmount);
    }
  };
  const handleCurrencyChange = async (e) => {
    const network = e.target.value;
    setCurrency(e.target.value);
    for (let index = 0; index < userWallets.length; index++) {
      if (userWallets[index][0] === network) {
        setWalletBalance(userWallets[index][1].balance.availableBalance);
      }
    }

    const rate = await fetchRate(e.target.value);
    // alert(currency);
    if (network === "usdt_tron" || network === "cusd") {
      setTokenAmount(nairaAmount / rate);
    } else {
      setTokenAmount(rate * nairaAmount);
    }
  };
  const rotateMessages = ()=>{
    if(loadingMessage === "Connecting To Provider..."){
      setTimeout(()=>{
        setLoadingMessage("Processing Payment...")
      },2000)
      
    }
    
  }

  setInterval(rotateMessages, 1000);
  const fetchRate = async (currency) => {
    let rate;
    if (currency === "btc") {
      currency = "bitcoin";
    }

    if (currency === "naira") {
      rate = 1;
      setTokenToNairaRate(parseFloat(1));
    } else if (currency === "usdt_tron" || currency === "cusd") {
      setIsLoading(true);
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}swap/get-dollar-price`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setTokenToNairaRate(parseFloat(response.data));
          setIsLoading(false);
          rate = parseFloat(response.data);
        })
        .catch((error) => {
          setIsLoading(false);
          toast({
            title: error.response.data.error,
            status: "warning",
          });
        });
    } else {
      setIsLoading(true);
      await axios
        .get(
          `${process.env.REACT_APP_BASE_URL}utilities/v2/naira/${currency}`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setTokenToNairaRate(parseFloat(response.data));
          setIsLoading(false);
          rate = parseFloat(response.data);
        })
        .catch((error) => {
          setIsLoading(false);
          toast({
            title: error.response.data.error,
            status: "warning",
          });
        });
    }

    return rate;
  };
  const validateMeter = async (e)=>{
    setLoadingMessage("Validating Meter Number...");
    setIsLoading(true)
    const customer =e.target.value
    if(customer.length===11){
      const validate = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}utilities/v2/validate-bill-service/?item-code=${props.item_code}&biller-code=${props.disco}&customer=${customer}`,
        {headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        }}
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      }).finally(()=>{
        setIsLoading(false)
      });
    console.log(validate);
    if (validate?.data?.data?.response_message === "Successful") {
      console.log(validate.data.data.response_message)
      setCustomerDetails(`${validate.data.data.name}`)
    } else {
      setIsLoading(false);
      toast({
        title: "Could not verify meter number",
        status: "warning",
      });
    }
    }else{
      setIsLoading(false)
      setCustomerDetails("")
    }
    
  }
  const buyCable = async (data) => {
     setLoadingMessage("Validating Meter Number...");
    data.bill_type = props.name;
    data.country = "NG";

    // data.wallet_from = data.wallet_from.toLowerCase();
    // data.token_amount = data.data.split(",")[1];
    
    if (tokenAmount >= walletBalance) {
      toast({ title: "insufficient balance", status: "warning" });
    } else {
      setIsLoading(true);
      setLoadingMessage("Connecting To Provider...")
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}utilities/v2/initialize-payment/`,
          data,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setIsLoading(false);
          toast({
            title: "Purchase successful",
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
            <FormLabel fontSize={"sm"} color={"blackAlpha.700"}>
              Meter Number
            </FormLabel>

            <Input
              fontSize={"16px"}
              border={"1px solid #f9f9f9"}
              outline={"none"}
              type="tel"
              required
              name="customer"
              {...register("customer",{onChange:validateMeter,minLength:{value:11,message:"Meter number should be 11 digits"},maxLength:{value:11,message:"Meter number should be 11 digits"}})}
            />
            <HStack width={"fulll"} mt={"5px"} justifyContent={"space-between"}>

<Text fontSize={"xs"} color={"blackAlpha.700"}>
    {customerDetails}
</Text>
  
  <Text color={"red"} fontSize={"xs"}>
    {errors.customer && errors.customer.message}
  </Text>
  </HStack>
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
              min={1000}
              required
              {...register("amount", {
                onChange: handleAmountChange,
                min: {
                  value: 1000,
                  message: `Minimum recharge amount is N1000`,
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
                ≈{" "}
                {currency === "btc"
                  ? tokenAmount.toFixed(6)
                  : tokenAmount.toFixed(3)}{" "}
                {currency}
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
              {...register("chain", { onChange: handleCurrencyChange })}
              required
            >
              <option>Select Coin</option>;
              {userWallets
                .filter((wallet) => {
                  return wallet[0] !== "eth";
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
          <Button
            isLoading={isLoading}
            loadingText={loadingMessage}

            type="submit"
            width={"full"}
            borderRadius={"none"}
            background={
              " linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)"
            }
            _hover={{
              background:
                "linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
            }}
            variant={"solid"}
          >
            Buy Electricity
          </Button>
          
          <HStack fontSize={"sm"} fontWeight={400} color={"#4d4c4c"}> <InfoIcon/> <Text>This may take up to 15 seconds</Text> </HStack>

        </VStack>
      </form>
    </VStack>
  );
};

export default Electricity;
