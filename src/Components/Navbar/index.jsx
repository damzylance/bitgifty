import { Box, Button, Container, HStack, Image, Img, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { RxCaretRight, RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink, useNavigate } from "react-router-dom";


 export const NavBar =()=>{
    const navHoverStyle = {
        background: "brand.700",
        color: "#fff",
        transform: " skewX(-10deg)",
        borderBottomRightRadius: "10px",
        borderTopLeftRadius: "10px",
      };
      const navStyle = {
        fontSize: "16px",
        fontWeight: "500",
        padding: "10px",
        transition: "all 0.3s",
        cursor: "pointer",
      };
      const [openMenu, setOpenMenu] = useState(false);
  const showMobileMenu = () => {
    setOpenMenu(!openMenu);
  };
  const navigate = useNavigate();

    return (
        <Box
        width={"full"}
        position={["relative", "relative", "sticky"]}
        zIndex={"999"}
        top={["0", "0", "0"]}
        left={["none", "none", "0"]}
        p={"10px"}
        mt={0}
        background={["brand.700", "brand.700", "#FAFCFF"]}
        boxShadow={["none", "none", "2px 3px 5px -1px rgba(169,170,176,0.47)"]}
      >
        <Box
          width={"full"}
          bg={"brand.700"}
          color={"#fff"}
          zIndex={1}
          display={["block", "block", "none"]}
         
        >
          <HStack
            justifyContent={"space-between"}
            alignItems="center"
            pb={"10px"}
          >
            <Link to={"/"}>
              <Box>
                <Img
                  src="/assets/images/logo-inline-transparent.png"
                  width={"100px"}
                />
              </Box>
            </Link>
            {openMenu ? (
              <RxCross1 onClick={showMobileMenu} fontSize={"24px"} />
            ) : (
              <RxHamburgerMenu onClick={showMobileMenu} fontSize={"24px"} />
            )}
          </HStack>
          {openMenu && (
            <VStack
              width={"full"}
              alignItems={"flex-start"}
              mt="20px"
              justifyContent={"space-between"}
            >
              <VStack width={"full"} alignItems={"flex-start"}>
               

                <HStack
                  width={"full"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  py={"10px"}
                  borderBottom={"1px solid #eae8e8"}
                >
                 <Menu>
                    <MenuButton as={Text}  sx={navStyle}
                _hover={navHoverStyle}>
                    Enterprise
                </MenuButton>
                <MenuList>
                    <MenuItem color={"#000"}><a href={"https://server.bitgifty.com/enterprise/redoc/#tag/utilities"} target="_blank">Utility Payment</a></MenuItem>
                    <MenuItem color={"#000"}><a href={"https://server.bitgifty.com/enterprise/redoc/#tag/giftcard"} target="_blank">Gift Card</a></MenuItem>

                </MenuList>
                </Menu>
                  <RxCaretRight fontSize={"24px"} />
                </HStack>

                <HStack
                  width={"full"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  py={"10px"}
                  borderBottom={"1px solid #eae8e8"}
                 
                >
                  <NavLink to= {"/"}><Text
                sx={navStyle}
                _hover={navHoverStyle}
              >
                Business
              </Text></NavLink>
                  <RxCaretRight fontSize={"24px"} />
                </HStack>
                <HStack
                  width={"full"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  py={"10px"}
                  borderBottom={"1px solid #eae8e8"}
                 
                >
                  <NavLink to= {"/contact-us"}><Text
                sx={navStyle}
                _hover={navHoverStyle}
              >
                Contact
              </Text></NavLink>
                  <RxCaretRight fontSize={"24px"} />
                </HStack>
                <HStack
                  width={"full"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  py={"10px"}
                  borderBottom={"1px solid #eae8e8"}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <Text sx={navStyle} _hover={navHoverStyle}>
                    Login
                  </Text>
                  <RxCaretRight fontSize={"24px"} />
                </HStack>
                <HStack
                  width={"full"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  py={"10px"}
                  borderBottom={"1px solid #eae8e8"}
                 
                >
                  <Text sx={navStyle} _hover={navHoverStyle}>
                    Sign Up
                  </Text>
                  <RxCaretRight fontSize={"24px"} />
                </HStack>
              </VStack>
            </VStack>
          )}
        </Box>
        <Container maxWidth={["full", "full", "95%", "80%"]}>
          <HStack
            width={"full"}
            justifyContent={"space-between"}
            display={["none", "none", "flex", "flex"]}
            alignItems={"cener"}
          >
            <Box>
              <NavLink to={"/"}> <Image
                width={"150px"}
                src="/assets/images/logo-inline-whitebg.png"
              /></NavLink>
              
            </Box>
            <HStack gap={"20px"} alignItems={"center"}>
              
                <Menu>
                    <MenuButton as={Text}  sx={navStyle}
                _hover={navHoverStyle}>
                    Enterprise
                </MenuButton>
                <MenuList>
                    <MenuItem><a  href={"https://server.bitgifty.com/enterprise/redoc/#tag/utilities"} target="_blank">Utility Payment</a></MenuItem>
                    <MenuItem><a href={"https://server.bitgifty.com/enterprise/redoc/#tag/giftcard"} target="_blank" >Gift Card</a></MenuItem>

                </MenuList>
                </Menu>
              
              <NavLink to= {"/"}><Text
                sx={navStyle}
                _hover={navHoverStyle}
              >
                Business
              </Text></NavLink>
              <NavLink to= {"/contact-us"}><Text
                sx={navStyle}
                _hover={navHoverStyle}
              >
                Contact
              </Text></NavLink>
              <Button
                onClick={() => navigate("/login")}
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
                Login
              </Button>
              <Button
                onClick={() => navigate("/register")}
                background={"#fff"}
                color={"brand.700"}
                borderColor={"brand.700"}
                borderWidth={"1px"}
                borderStyle={"solid"}
                _hover={{ color: "brand.700" }}
              >
                Sign Up
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>
    )
}