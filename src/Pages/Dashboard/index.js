import {
  Box,
  Flex,
  Image,
  VStack,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardLayout from "../../Components/DashboardLayout";
import { RxArrowRight } from "react-icons/rx";
function Dashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <Flex
        gap={10}
        alignItems={"center"}
        width={"full"}
        background={"brand.bg1"}
        my="20"
        flexDir={["column-reverse", "column-reverse", "row"]}
      >
        <VStack
          w={"full"}
          height="full"
          gap={["10", "10", "20"]}
          alignItems={["center", "center", "flex-start"]}
        >
          <VStack
            width={"full"}
            gap={"20px"}
            display={["none", "none", "flex"]}
          >
            <Text fontSize={"48px"} fontWeight={700} color="#121212">
              Send The Gift of <span style={{ color: "#103D96" }}>Crypto</span>{" "}
              With Ease
            </Text>
            <Text fontSize={"18px"} fontWeight={"400"} color={"#333"}>
              Give the Gift of Choice: Create and redeem your crypto gift cards
              here at BitGifty!
            </Text>
          </VStack>

          <VStack
            width={"full"}
            alignItems={["center", "center", "flex-start"]}
            gap="5"
          >
            <HStack
              width={"80%"}
              bg={"linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)"}
              fontSize="20px"
              cursor={"pointer"}
              padding={"25px 16px"}
              color={"#fff"}
              fontWeight={"700"}
              justifyContent={"space-between"}
              variant={"solid"}
              onClick={() => navigate("/giftcard/create")}
              _hover={{
                bg: "linear-gradient(106deg, #103D96 60.69%, #306FE9 102.01%)",
              }}
            >
              <Text>Create Gift Card</Text>
              <RxArrowRight />
            </HStack>
            <HStack
              width={"80%"}
              border={"#103D96 1px solid"}
              fontSize="20px"
              cursor={"pointer"}
              padding={"25px 16px"}
              color={"#103D96"}
              fontWeight={"700"}
              justifyContent={"space-between"}
              variant={"solid"}
              onClick={() => navigate("/giftcard/create")}
            >
              <Text>Redeem Gift Card</Text>
              <RxArrowRight />
            </HStack>
          </VStack>
        </VStack>
        <Box
          as={motion.div}
          w={"full"}
          height="full"
          p={2}
          whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
        >
          <Image width={"500px"} src="/assets/images/dashboard_hero.png" />
        </Box>
      </Flex>
    </DashboardLayout>
  );
}

export default Dashboard;
