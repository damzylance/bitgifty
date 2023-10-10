import { Box, Flex, HStack, Text, Toast, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../Components/DashboardLayout";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const FiatHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const toTimeDate = (date) => {
    const day = date
      .toLocaleDateString("en-NG")
      .toString()
      .replaceAll("/", "-");
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${day} ${time}`;
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}transactions/fiat/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        if (response.data) {
          setIsLoading(false);

          setTransactions(Object.entries(response.data));
        }
      })
      .catch(function (error) {
        Toast({ title: "An error occured", status: "warning" });
      });
  }, []);
  return (
    <DashboardLayout>
      <VStack width={"full"}>
        <VStack width={"full"}>
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
          <Box
            width={"full"}
            visibility={["visible", "visible", "visible", "visible"]}
          >
            <Text textAlign={"center"}> Naira Withdrawal History</Text>
          </Box>
          <Flex
            justifyContent={"space-between"}
            width={"full"}
            bg={"brand.600"}
            py="24px"
            px={"4"}
            color={"brand.bg1"}
            display={["flex", "flex", "flex", "flex"]}
            fontWeight={"700"}
          >
            <Text fontSize={["xs", "xs", "sm", "sm"]} flex={2}>
              Time
            </Text>

            <Text fontSize={["xs", "xs", "sm", "sm"]} flex={1.5}>
              Amount
            </Text>
            <Text fontSize={["xs", "xs", "sm", "sm"]} flex={2}>
              To
            </Text>
            <Text
              textAlign={"right"}
              fontSize={["xs", "xs", "sm", "sm"]}
              flex={2}
            >
              Status
            </Text>
          </Flex>
          <VStack width={"full"} gap={"14px"}>
            {transactions.length > 0 ? (
              transactions[3][1].reverse().map((transaction, id) => {
                return (
                  <TransactionRow
                    time={toTimeDate(new Date(transaction.time))}
                    amount={transaction.amount}
                    status={transaction.status}
                    bankName={transaction.bank_name}
                    key={id}
                  />
                );
              })
            ) : (
              <Text>No swap transaction</Text>
            )}
          </VStack>
        </VStack>
      </VStack>
    </DashboardLayout>
  );
};

export default FiatHistory;

function TransactionRow(props) {
  return (
    <Flex
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      px={"24px"}
      py={"20px"}
      transition="1s"
      width={"full"}
      gap="2"
      justifyContent={"space-between"}
      alignItems={"center"}
      wrap="wrap"
      display={["flex", "flex", "flex", "flex"]}
      bg={"#fff"}
      boxShadow={"0px 1px 4px 0px rgba(0, 0, 0, 0.10)"}
      sx={{
        animation: "drop-in 1200ms ease 500ms backwards",
      }}
    >
      <Text fontSize={["xx-small", "xs", "sm", "sm"]} flex={2}>
        {props.time}
      </Text>

      <Text fontSize={["xs", "xs", "sm", "sm"]} flex={1.5}>
        &#8358;{props.amount}
      </Text>
      <Text fontSize={["xs", "xs", "sm", "sm"]} flex={2}>
        {props.bankName}
      </Text>
      <Text
        fontSize={["xs", "xs", "sm", "sm"]}
        flex={2}
        textAlign="right"
        textTransform={"capitalize"}
      >
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
          <Text>From: {props.from}</Text>
          <Text>{props.props.to}</Text>
        </HStack>
        <HStack
          width={"full"}
          justifyContent={"space-between"}
          py={"4px"}
          borderBottom={"1px solid #e5dede"}
        >
          <Text color={"green.500"} fontWeight="bold">
            Status
          </Text>
          <Text>{props.status}</Text>
        </HStack>
      </VStack>
    </>
  );
};
