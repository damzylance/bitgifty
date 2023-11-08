import { Box, Flex, HStack, Text, Toast, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../Components/DashboardLayout";
import axios from "axios";

const SwapHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}swap/v2`, {
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
          <Box
            width={"full"}
            visibility={["visible", "visible", "visible", "visible"]}
          >
            <Text textAlign={"center"}> Swap History</Text>
          </Box>
          <Flex
            justifyContent={"space-between"}
            width={"full"}
            bg={"brand.600"}
            py="2"
            px={"2"}
            color={"brand.bg1"}
            borderRadius={"md"}
            display={["flex", "flex", "flex", "flex"]}
          >
            <Text fontSize={["xs", "xs", "sm", "sm"]} flex={2}>
              Time
            </Text>
            <Text fontSize={["xs", "xs", "sm", "sm"]} flex={1.5}>
              From
            </Text>
            <Text fontSize={["xs", "xs", "sm", "sm"]} flex={1.5}>
              To
            </Text>
            <Text fontSize={["xs", "xs", "sm", "sm"]} flex={1.5}>
              Amount
            </Text>

            <Text
              textAlign={"right"}
              fontSize={["xs", "xs", "sm", "sm"]}
              flex={2}
            >
              Status
            </Text>
          </Flex>
          <VStack width={"full"}>
            {transactions.length > 0 ? (
              transactions[3][1].map((transaction) => {
                return (
                  <TransactionRow
                    time={"12/01/2023"}
                    from={transaction.swap_from.split(":")[1]}
                    to={transaction.swap_to.split(":")[1]}
                    amount={transaction.swap_amount}
                    status={"Filled"}
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

export default SwapHistory;

function TransactionRow(props) {
  return (
    <Flex
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition="1s"
      width={"full"}
      gap="2"
      justifyContent={"space-between"}
      alignItems={"center"}
      wrap="wrap"
      display={["flex", "flex", "flex", "flex"]}
      sx={{
        animation: "drop-in 1200ms ease 500ms backwards",
      }}
    >
      <Text fontSize={["xx-small", "xs", "sm", "sm"]} flex={2}>
        {props.time}
      </Text>
      <Text
        fontSize={["xs", "xs", "sm", "sm"]}
        flex={1.5}
        textTransform={"capitalize"}
      >
        {props.from}
      </Text>
      <Text
        fontSize={["xs", "xs", "sm", "sm"]}
        flex={1.5}
        textTransform={"capitalize"}
      >
        {props.to}
      </Text>
      <Text fontSize={["xs", "xs", "sm", "sm"]} flex={1.5}>
        {props.amount}
      </Text>
      <Text fontSize={["xs", "xs", "sm", "sm"]} flex={2} textAlign="right">
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
