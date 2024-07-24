import { Avatar, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

const TestimonialCard = ({ image, title, text, rating }) => {
	const stars = new Array(rating).fill();
	return (
		<HStack
			width={"full"}
			maxWidth={"450px"}
			alignItems={"center"}
			padding={["10px", "16px", "20px"]}
			backgroundColor={"#fff"}
			borderRadius={"8px"}
			boxShadow={"0px 1px 4px 0px rgba(0, 0, 0, 0.10)"}
		>
			<Avatar />
			<VStack width={"full"}>
				<HStack width={"full"} justifyContent={"space-between"}>
					<Text fontSize={"18px"} fontWeight={"700"} color={"#333"}>
						John Doe
					</Text>
					<HStack>
						{stars.map((_, index) => {
							return <Image src="assets/icons/star.svg" key={index} />;
						})}
					</HStack>
				</HStack>
				<Text
					fontSize={["12px", "14px", "16px"]}
					fontWeight={"400"}
					color={"#333"}
				>
					Buy and send gift cards from over 200 merchants across
				</Text>
			</VStack>
		</HStack>
	);
};

export default TestimonialCard;
