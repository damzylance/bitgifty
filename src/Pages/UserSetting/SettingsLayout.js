import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Components/DashboardLayout";
import UserSetting from "./UserSettings";
import Payout from "./Payout";

function SettingsLayout(props) {
  const navStyle = {
    padding: ["5px 10px", "5px 10px", "24px 24px"],
    borderRadius: ["5px", "5px", "none"],
    width: ["auto", "auto", "256px"],
    fontWeight: "600",
    cursor: "pointer",
  };
  const [page, setPage] = useState("profile");

  return (
    <DashboardLayout>
      <Flex
        width={"full"}
        display={"flex"}
        flexDir={["column", "column", "row"]}
        alignItems={"flex-start"}
        mt={"40px"}
      >
        <Flex
          alignItems={["center", "center", "flex-start"]}
          flex={1}
          flexDir={["row", "row", "column"]}
          borderRadius={["none", "none", "10px"]}
          gap={["16px", "6px", "4px"]}
          justifyContent={["center", "center", "center"]}
          flexWrap={["wrap", "wrap", "none"]}
        >
          <Box
            onClick={() => setPage("profile")}
            sx={navStyle}
            bg={page === "profile" ? "brand.700" : "#fff"}
            color={page === "profile" ? "#fff" : ""}
            _hover={{ bg: "#103D96", color: "#fff" }}
          >
            <Text>Profile</Text>
          </Box>
          <Box sx={navStyle} _hover={{ bg: "#103D96", color: "#fff" }}>
            <Text>Security</Text>
          </Box>
          <Box
            onClick={() => setPage("payout")}
            sx={navStyle}
            bg={page === "payout" ? "brand.700" : "#fff"}
            color={page === "payout" ? "#fff" : ""}
            _hover={{ bg: "#103D96", color: "#fff" }}
          >
            <Text>Payout Details</Text>
          </Box>
          <Box sx={navStyle} _hover={{ bg: "#103D96", color: "#fff" }}>
            <Text>Logout</Text>
          </Box>
          <Box sx={navStyle} _hover={{ bg: "#103D96", color: "#fff" }}>
            <Text>Delete Account</Text>
          </Box>
        </Flex>
        <VStack
          alignItems={"flex-start"}
          gap={"20px"}
          mt={[10, 10, 0, 0]}
          flex={2}
          width={"full"}
        >
          {page === "profile" && <UserSetting />}
          {page === "payout" && <Payout />}
        </VStack>
      </Flex>
    </DashboardLayout>
  );
}

export default SettingsLayout;
