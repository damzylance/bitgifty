import React, { useState } from "react";

import { Box, Button, Divider, Flex, VStack } from "@chakra-ui/react";
import DashboardLayout from "../../../Components/DashboardLayout";
import Reedeem from "./Reedeem";
import Create from "./Create";
import MyCards from "./MyCards";
import { useNavigate, useParams } from "react-router-dom";
import { RxCardStack, RxPlus } from "react-icons/rx";
import { MdRedeem } from "react-icons/md";
function GiftCardTemplate(props) {
  const navigate = useNavigate();
  var page = window.location.pathname.split("/")[2];

  return (
    <DashboardLayout>
      <Flex height={"50px"} gap={5} mt={"30px"}>
        <Button
          borderRadius={"none"}
          rightIcon={<RxPlus />}
          onClick={() => {
            navigate("/giftcard/create");
          }}
          variant={"outline"}
          size={["md", "md", "lg"]}
        >
          Create
        </Button>

        <Button
          onClick={() => {
            navigate("/giftcard/redeem");
          }}
          size={["md", "md", "lg"]}
          rightIcon={<MdRedeem />}
          variant={page === "redeem" ? "solid" : "outline"}
          bg={
            page === "redeem"
              ? " linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)"
              : ""
          }
          borderRadius={"none"}
        >
          Reedeem
        </Button>

        <Button
          onClick={() => {
            navigate("/giftcard/cards");
          }}
          size={["md", "md", "lg"]}
          rightIcon={<RxCardStack />}
          borderRadius={"none"}
          variant={page === "cards" ? "solid" : "outline"}
          bg={
            page === "cards"
              ? " linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)"
              : ""
          }
        >
          My Cards
        </Button>
      </Flex>
      <Box width={"full"}>{props.children}</Box>
    </DashboardLayout>
  );
}

export default GiftCardTemplate;
