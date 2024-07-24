
import { Box, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const GiftCardTemplate = ({image,title,strokeColor}) => {
  return (

                <VStack pl={"7px"}  alignItems={"flex-start"} position={"relative"}  >
                    <Box position={"absolute"} width={"276px"} height={"320px"} top={0} left={0}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="271" height="317" viewBox="0 0 271 317" fill="none">
                        <path d="M8.99308 78.282L8.98644 78.1907L8.97424 78.0999L4.29792 43.3062C1.47636 22.3125 17.8036 3.64404 38.986 3.64404H221.333C240.005 3.64404 255.389 18.3009 256.292 36.9507L267.902 276.628C268.938 298.028 250.676 315.329 229.363 313.138L59.4572 295.667C41.6074 293.832 28.0371 278.795 28.0371 260.851V251.845C28.0371 249.905 27.8994 247.967 27.625 246.046L14.5217 154.323L8.99308 78.282Z" fill="#F6F8FE" stroke={strokeColor?strokeColor:"#103D96"} stroke-width="6"/>
                    </svg>
                    </Box>
                    <VStack zIndex={1} marginTop={"0 !important"} pt={"50px"} gap={"30px"}  height={"312px"}  alignItems={"center"} borderRadius={"38px"} bg={"#E8EFFD"} width={"256px"}>
                        <Text fontSize={"16px"} fontWeight={"600"} color={"#050505"}>
                            {title?title:"Lorem Ipsum"}
                        </Text>
                        
                        <Image src={image?image:"/assets/images/client_giftcard_design.png"} />
                    </VStack>
                
                </VStack>
  )
}

export default GiftCardTemplate