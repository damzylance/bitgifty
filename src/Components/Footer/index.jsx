import { Box, Container, HStack, Text, VStack } from "@chakra-ui/react";
import { AiFillInstagram, AiFillLinkedin, AiFillTwitterSquare } from "react-icons/ai";
import { Link } from "react-router-dom";

export const Footer =()=>{
    return(
        <Box width={"full"} py={"40px"} bg={"#103D96"} color={"#fff"}>
        <Container maxWidth={["full", "full", "95%", "80%"]}>
          <HStack
            flexDir={["column", "column", "row", "row"]}
            gap={"20px"}
            width={"full"}
            justifyContent={"space-between"}
          >
            <VStack width={"full"} alignItems={"flex-start"} gap={"20px"}>
              <Text
                fontSize={["24px", "24px", "32px"]}
                fontWeight={"700"}
                textTransform={"uppercase"}
              >
                Bitgifty
              </Text>
              <Text fontSize={["14px", "14px", "16px"]} fontWeight={"500"}>
                Give the Gift of Choice: Create and redeem your crypto gift
                cards here at Gifty!
              </Text>
              <HStack width={"full"} alignItems={"center"}>
                <a href={"https://twitter.com/BitGifty"}>
                  <AiFillTwitterSquare fontSize={"24px"} />
                </a>
                <a href={"https://www.instagram.com/bitgifty/"}>
                  <AiFillInstagram fontSize={"24px"} />
                </a>
                <a href={"https://www.linkedin.com/company/bitgifty/"}>
                  <AiFillLinkedin fontSize={"24px"} />
                </a>
              </HStack>
            </VStack>
            <HStack
              flexDir={["column", "column", "row", "row"]}
              justifyContent={"space-between"}
              width={"full"}
              gap={"20px"}
            >
              <VStack width={"full"} alignItems={"flex-start"}>
                <Text fontSize={["16px", "16px", "24px"]} fontWeight={"700"}>
                  Legal
                </Text>
                <Link to={"/privacy-policy"} style={{ fontSize: "14px" }}>
                  Privacy Policy
                </Link>
                <Link to={"/aml"} style={{ fontSize: "14px" }}>AML</Link>
                <Link to={"/tnc"} style={{ fontSize: "14px" }}>Terms and Condition</Link>
              </VStack>
              <VStack width={"full"} alignItems={"flex-start"}>
                <Text fontSize={["16px", "16px", "24px"]} fontWeight={"700"}>
                  Company
                </Text>
                <Link>Enterprise</Link>
                <Link>Business</Link>
                <Link to={"/contact-us"}>Contact Us</Link>
              </VStack>
            </HStack>
          </HStack>
        </Container>
      </Box>
    )
}