import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Spinner,
  Toast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../Components/DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
const mobileStyle = {
  boxShadow: "0px 5px 7px rgb(234, 234, 234)",
  borderRadius: "10px",
};

const Wallet = () => {
  const navigate = useNavigate();

  const { currency } = useParams();
  const currencies = ["btc", "bnb", "celo", "cusd", "usdt_tron", "eth", "naira"];
  const paramsMatch = currencies.includes(currency);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}v2/transactions/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        if (response.data) {
          setIsLoading(false);
          if(paramsMatch){
            setTransactions(response.data.filter((transaction)=>{
              if (currency==="naira"){
                return transaction.currency === "VC__BITGIFTY_NAIRA"
              }else{
                return transaction.currency === currency.toUpperCase()
              }
              
            }))
          }else{
            setTransactions(response.data);
          }
          
        }
      })
      .catch(function (error) {});
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <>
      <DashboardLayout>
        <VStack>
          <HStack
            color={"brand.600"}
            _hover={{ color: "brand.500" }}
            cursor={"pointer"}
            onClick={() => navigate(-1)}
            justifyContent={"flex-start"}
            width={"full"}
          >
            <ArrowBackIcon fontSize={"24px"} />
            <Text>Back</Text>
          </HStack>
          <VStack alignItems={"flex-start"} width="full" gap={"2"}>
            <Box
              width={"full"}
              visibility={["visible", "visible", "visible", "hidden"]}
            >
              <Text textAlign={"center"}> {currency} Transaction History</Text>
            </Box>

            <Flex
              justifyContent={"space-between"}
              width={"full"}
              bg={"brand.600"}
              py="24px"
              px={"30px"}
              color={"brand.bg1"}
              display={["none", "none", "none", "flex"]}
            >
              <Text fontSize={["xs", "xs", "sm", "sm"]} flex={2}>
                Time
              </Text>
              <Text fontSize={["xs", "xs", "sm", "sm"]} flex={1.5}>
                Type
              </Text>
              <Text fontSize={["xs", "xs", "sm", "sm"]} flex={1.5}>
                Asset
              </Text>
              <Text fontSize={["xs", "xs", "sm", "sm"]} flex={1.5}>
                Amount
              </Text>
              <Text fontSize={["xs", "xs", "sm", "sm"]} flex={2}>
                Wallet
              </Text>
              <Text fontSize={["xs", "xs", "sm", "sm"]} flex={2}>
                Reference
              </Text>
              <Text
                textAlign={"right"}
                fontSize={["xs", "xs", "sm", "sm"]}
                flex={2}
              >
                Status
              </Text>
            </Flex>

            <VStack
              width={"full"}
              alignContent="flex-start"
              gap={"2"}
              borderBottom={["none", "none", "none", "1px solid #A3BFF5"]}
              boxShadow={[
                mobileStyle.boxShadow,
                mobileStyle.boxShadow,
                mobileStyle.boxShadow,
                "none",
              ]}
              borderRadius={[
                mobileStyle.borderRadius,
                mobileStyle.borderRadius,
                mobileStyle.borderRadius,
                "none",
              ]}
              pb="4"
            >
              <VStack width={"full"} gap={"2"} alignContent="flex-start">
                {isLoading ? (
                  <Spinner />
                ) : transactions.length > 0 ? (
                  transactions.map((transaction, index) => {
                    let wallet;
                    let date;

                    let day;
                    let time;

                    date = new Date(transaction.created);
                    day = date
                      .toLocaleDateString("en-NG")
                      .toString()
                      .replaceAll("/", "-");
                    time = date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    date = `${day} ${time}`;
                    wallet = transaction.address
                      ? `${transaction?.address
                          ?.toString()
                          .slice(0, 6)}...${transaction?.address?.slice(
                          19,
                          20
                        )}`
                      : "";

                    return (
                      <Box width={"full"} key={index}>
                        {" "}
                        <TransactionRow
                          time={date.toString()}
                          type={
                            transaction.senderNote
                              ? transaction.senderNote
                              : transaction.operationType
                          }
                          asset={
                            transaction.currency === "VC__BITGIFTY_NAIRA"
                              ? "NAIRA"
                              : transaction.currency
                          }
                          amount={parseFloat(transaction.amount).toFixed(3)}
                          wallet={wallet}
                          txid={transaction.reference}
                          status="Completed"
                        />
                        <MobileTransactionRow
                          time={date.toString()}
                          type={transaction.operationType}
                          asset={transaction.currency}
                          amount={transaction.amount}
                          wallet={wallet}
                          txid={transaction.reference}
                          status="Completed"
                        />
                      </Box>
                    );
                  })
                ) : (
                  <Text>No recent Transaction</Text>
                )}
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </DashboardLayout>
    </>
  );
};
function TransactionRow(props) {
  return (
    <Flex
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition="1s"
      width={"full"}
      gap="2"
      justifyContent={"space-between"}
      alignItems={"center"}
      wrap="wrap"
      display={["none", "none", "none", "flex"]}
      sx={{
        animation: "drop-in 1200ms ease 500ms backwards",
      }}
      boxShadow={"0px 1px 4px 0px rgba(0, 0, 0, 0.10)"}
      bg={"#fff"}
      px={"24px"}
      py={"23px"}
    >
      <Text fontSize={["xx-small", "xs", "sm", "sm"]} flex={2}>
        {props.time}
      </Text>
      <Text fontSize={["xs", "xs", "sm", "sm"]} flex={1.5}>
        {props.type}
      </Text>
      <Text fontSize={["xs", "xs", "sm", "sm"]} flex={1.5}>
        {props.asset}
      </Text>
      <Text fontSize={["xs", "xs", "sm", "sm"]} flex={1.5}>
        {props.amount}
      </Text>
      <Text fontSize={["xs", "xs", "sm", "sm"]} flex={2}>
        {props.wallet}
      </Text>
      <Text fontSize={["xs", "xs", "sm", "sm"]} flex={3} color={"brand.600"}>
        {`${props.txid}`}
      </Text>
      <Text fontSize={["xs", "xs", "sm", "sm"]} flex={1.5} textAlign="right">
        {props.status}
      </Text>
    </Flex>
  );
}
const MobileTransactionRow = (props) => {
  return (
    <>
      <VStack
        width={"full"}
        fontSize={"xs"}
        display={["flex", "flex", "flex", "none"]}
        px={"10px"}
      >
        <HStack fontSize={"xs"} width={"full"} justifyContent={"space-between"}>
          <Text>{props.time}</Text>
          <Text>{props.amount}</Text>
        </HStack>
        <HStack width={"full"} justifyContent={"space-between"}>
          <Text>Type: {props.type}</Text>
          <Text>{props.wallet}</Text>
        </HStack>
        <HStack
          width={"full"}
          justifyContent={"space-between"}
          py={"4px"}
          borderBottom={"1px solid #e5dede"}
        >
          <Text color={"green.500"} fontWeight="normal" fontSize={"2xs"}>
            {`${props.txid}`}
          </Text>
          <Text>{props.status}</Text>
        </HStack>
      </VStack>
    </>
  );
};
export default Wallet;
