import React, { useEffect } from "react";
import { Box, Flex, HStack, Text, VStack, Spinner } from "@chakra-ui/react";
import DashboardLayout from "../../../Components/DashboardLayout";
import axios from "axios";
function RedeemHistory() {
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}gift_cards/v2/redeem`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {})
      .catch(function (error) {});
  }, []);
  return (
    <DashboardLayout>
      <VStack width={"full"}>
        <Text>Redeem History</Text>
      </VStack>
    </DashboardLayout>
  );
}

export default RedeemHistory;
