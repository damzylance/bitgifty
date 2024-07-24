import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import PrimaryButton from "../../../Components/PrimaryButton";
import { NavBar } from "../../../Components/Navbar";
import GiftCardTemplate from "../../../Components/GiftCardTemplate";
import { FaGifts } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import { BsSendFill } from "react-icons/bs";
import TestimonialCard from "../../../Components/TestimonialCard";
import { Footer } from "../../../Components/Footer";

export const CustomerView = () => {
	return (
		<>
			<VStack width={"full"} bg={"#fff"} alignItems={"center"}>
				<NavBar />
				<VStack
					bg={"#E8EFFD"}
					gap={"80px"}
					width={"full"}
					alignItems={"center"}
					p={"70px 20px"}
					height={"720px"}
					position={"relative"}
				>
					<Image
						zIndex={[0, 0, 0, 9]}
						src={"/assets/images/client_hero_image.png"}
						position={"absolute"}
						right={[0]}
						bottom={[0]}
					/>

					<VStack
						width={"full"}
						alignItems={"center"}
						margin={"auto"}
						maxW={"1200px"}
					>
						<Image
							src={"/assets/images/client_hero_layer.png"}
							position={"absolute"}
							left={0}
							bottom={0}
						/>
						<HStack width={"full"} justifyContent={"center"}>
							<VStack
								width={"full"}
								gap={["40px", "60px", "80px"]}
								alignItems={["center", "center", "flex-start"]}
							>
								<VStack
									width={"full"}
									gap={"30px"}
									alignItems={["center", "center", "flex-start"]}
								>
									<Text
										color={"#050505"}
										width={["auto", "auto", "622px"]}
										fontSize={["32px", "38px", "48px"]}
										fontWeight={"600"}
										textTransform={"capitalize"}
										textAlign={["center", "center", "left"]}
									>
										The <span style={{ color: "#103D96" }}>crypto</span> gifting
										platform for daily lifestyle
									</Text>
									<Text
										color={"#333"}
										fontSize={"17px"}
										fontWeight={"400"}
										width={["auto", "auto", "400px"]}
										textAlign={["center", "center", "left"]}
									>
										Make any occasion special with a gift card that offers
										endless possibilities. It is the smart choice.
									</Text>
								</VStack>
								<HStack
									flexDir={["column", "row"]}
									width={["300px", "400px"]}
									gap={"20px"}
								>
									<PrimaryButton title={"Buy a Gift Card"} type={"primary"} />
									<PrimaryButton title={"Learn More"} />
								</HStack>
							</VStack>
							<HStack
								width={"full"}
								gap={"50px"}
								height={"full"}
								justifyContent={"center"}
								position={"relative"}
								display={["none", "none", "flex"]}
							>
								<Box
									width={["71px", "142px"]}
									height={["192px", "384px"]}
									bg={"#BFEDF7"}
									borderRadius={"80px"}
									transform={"rotate(40.59deg)"}
								></Box>
								<Box
									width={"142px"}
									height={"384px"}
									bg={"#A3BFF5"}
									borderRadius={"80px"}
									transform={"rotate(40.59deg)"}
								></Box>
							</HStack>
						</HStack>
					</VStack>
				</VStack>

				<VStack
					width={"full"}
					maxW={"1200px"}
					margin={"auto"}
					py={"100px"}
					alignItems={"center"}
					gap={"50px"}
				>
					<Text
						textAlign={["center", "center", "left"]}
						fontSize={["28px", "32px", "38px"]}
						color={"#050505"}
						fontWeight={"600"}
						textTransform={"capitalize"}
					>
						Top Gift cards for Today
					</Text>
					<HStack
						width={"full"}
						justifyContent={"space-evenly"}
						flexWrap={"wrap"}
						gap={"20px"}
					>
						<GiftCardTemplate title={"Green Life"} />
						<GiftCardTemplate
							title={"MacDonald"}
							image={"assets/images/client_giftcard_design2.png"}
							strokeColor={"#E75838"}
						/>
						<GiftCardTemplate
							title={"Google"}
							image={"assets/images/client_giftcard_design3.png"}
							strokeColor={"#38C7E7"}
						/>
						<GiftCardTemplate
							title={"Green Herbal Store"}
							strokeColor={"#968810"}
						/>
					</HStack>
					<Box width={"320px"}>
						<PrimaryButton title={"View All Cards"} type={"primary"} />
					</Box>
				</VStack>
				<Box
					width={"full"}
					backgroundColor={"#E8EFFD"}
					bgImage={`url('/assets/images/client_giftcard_section_layer.png')`}
					backgroundSize="cover"
					backgroundPosition="center"
				>
					<VStack
						width={"full"}
						maxW={"1200px"}
						margin={"auto"}
						py={"100px"}
						alignItems={"center"}
						gap={"50px"}
					>
						<VStack width={"full"} alignItems={"center"}>
							<Text
								textAlign={"center"}
								fontSize={["28px", "32px", "38px"]}
								color={"#050505"}
								fontWeight={"600"}
								textTransform={"capitalize"}
							>
								How it works
							</Text>
							<Text
								textAlign={"center"}
								fontSize={"16px"}
								fontWeight={"400"}
								color={"#333"}
								width={["auto", "auto", "476px"]}
							>
								Buy and send gift cards from over 200 merchants across Nigeria
								in 3 easy steps.
							</Text>
						</VStack>
						<HStack
							width={"full"}
							justifyContent={"space-between"}
							wrap={"wrap"}
							alignItems={"center"}
							gap={"10px"}
						>
							<VStack gap={"24px"} width={["full", "full", "auto"]}>
								<HStack
									justifyContent={"center"}
									padding={"32px"}
									bg={"#103D96"}
									borderRadius={"16px"}
								>
									<FaGifts size={"36px"} color="#fff" />
								</HStack>
								<Text
									textAlign={"center"}
									fontSize={"16px"}
									fontWeight={"400"}
									color={"#333"}
									width={"256px"}
								>
									Choose Gift Cards From Popular Brands
								</Text>
							</VStack>
							<VStack gap={"24px"} width={["full", "full", "auto"]}>
								<HStack
									justifyContent={"center"}
									padding={"32px"}
									bg={"#103D96"}
									borderRadius={"16px"}
								>
									<MdDesignServices size={"36px"} color="#fff" />
								</HStack>
								<Text
									textAlign={"center"}
									fontSize={"16px"}
									fontWeight={"400"}
									color={"#333"}
									width={"256px"}
								>
									Personalize Gift Cards by Adding Pictures and Message
								</Text>
							</VStack>
							<VStack gap={"24px"} width={["full", "full", "auto"]}>
								<HStack
									justifyContent={"center"}
									padding={"32px"}
									bg={"#103D96"}
									borderRadius={"16px"}
								>
									<BsSendFill size={"36px"} color="#fff" />
								</HStack>
								<Text
									textAlign={"center"}
									fontSize={"16px"}
									fontWeight={"400"}
									color={"#333"}
									width={"256px"}
								>
									Send Gift in any Currency in Seconds
								</Text>
							</VStack>
						</HStack>
					</VStack>
				</Box>
				<Box width={"full"} bg={"#fff"} position={"relative"} py={"100px"}>
					<Image
						position={"absolute"}
						top={0}
						left={0}
						src="assets/images/client_giftcard_section_layer2.png"
					/>
					<HStack
						width={"full"}
						maxW={"1200px"}
						mx={"auto"}
						py={"100px"}
						position={"relative"}
						justifyContent={"center"}
					>
						<Box position={"absolute"} top={"100px"} left={"40px"}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
							>
								<circle
									cx="10"
									cy="10"
									r="10"
									transform="matrix(-1 0 0 1 20 0)"
									fill="#38C7E7"
								/>
							</svg>
						</Box>
						<Box position={"absolute"} bottom={"100px"} left={"0px"}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="10"
								height="10"
								viewBox="0 0 10 10"
								fill="none"
							>
								<circle
									cx="5"
									cy="5"
									r="5"
									transform="matrix(-1 0 0 1 10 0)"
									fill="#103D96"
								/>
							</svg>
						</Box>
						<Box
							position={"absolute"}
							bottom={"0px"}
							left={["100px", "200px", "500px"]}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="15"
								height="15"
								viewBox="0 0 15 15"
								fill="none"
							>
								<circle
									cx="7.5"
									cy="7.5"
									r="7.5"
									transform="matrix(-1 0 0 1 15 0)"
									fill="#38C7E7"
								/>
							</svg>
						</Box>
						<Box position={"absolute"} top={"0px"} right={["500px"]}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="15"
								height="15"
								viewBox="0 0 15 15"
								fill="none"
							>
								<circle
									cx="7.5"
									cy="7.5"
									r="7.5"
									transform="matrix(-1 0 0 1 15 0)"
									fill="#103D96"
								/>
							</svg>
						</Box>
						<Box
							position={"absolute"}
							top={"100px"}
							right={["20px", "10px", "0px"]}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="10"
								height="10"
								viewBox="0 0 10 10"
								fill="none"
							>
								<circle
									cx="5"
									cy="5"
									r="5"
									transform="matrix(-1 0 0 1 10 0)"
									fill="#38C7E7"
								/>
							</svg>
						</Box>
						<Box
							position={"absolute"}
							bottom={"10px"}
							right={["20px", "10px", "0px"]}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
							>
								<circle
									cx="10"
									cy="10"
									r="10"
									transform="matrix(-1 0 0 1 20 0)"
									fill="#103D96"
								/>
							</svg>
						</Box>

						<VStack
							width={"full"}
							flex={1}
							gap={"66px"}
							display={["none", "none", "flex"]}
						>
							<HStack width={"full"} justifyContent={"flex-end"}>
								<Image src="assets/images/client_hero_ellipse1.svg" />
							</HStack>
							<HStack width={"full"} justifyContent={"flex-start"}>
								<Image src="assets/images/client_hero_ellipse2.svg" />
							</HStack>
							<HStack width={"full"} justifyContent={"flex-end"}>
								<Image src="assets/images/client_hero_ellipse1.svg" />
							</HStack>
						</VStack>
						<HStack flex={2} width={"full"} justifyContent={"center"}>
							<HStack
								width={["300px", "350px", "400px"]}
								height={["300px", "350px", "400px"]}
								borderRadius={"50%"}
								background={"#103D96"}
							>
								<Text
									color={"#fff"}
									fontSize={["28px", "30px", "32px"]}
									fontWeight={"500"}
									textAlign={"center"}
									padding={"10px"}
								>
									Gift Cards from over 200 merchants in Nigeria
								</Text>
							</HStack>
						</HStack>
						<VStack
							width={"full"}
							flex={1}
							gap={"66px"}
							display={["none", "none", "flex"]}
						>
							<HStack width={"full"} justifyContent={"flex-start"}>
								<Image src="assets/images/client_hero_ellipse1.svg" />
							</HStack>
							<HStack width={"full"} justifyContent={"flex-end"}>
								<Image src="assets/images/client_hero_ellipse2.svg" />
							</HStack>
							<HStack width={"full"} justifyContent={"flex-start"}>
								<Image src="assets/images/client_hero_ellipse1.svg" />
							</HStack>
						</VStack>
					</HStack>
					<HStack width={"full"} py={"80px"}>
						<HStack width={"full"} wrap={["wrap", "wrap", "nowrap"]}>
							<HStack
								justifyContent={"flex-start"}
								py={"34px"}
								width={"full"}
								bg={"#E8EFFD"}
							>
								<VStack width={"full"}>
									<Image src="assets/images/client_hero_voucher1.png" />
									<Image src="assets/images/client_hero_voucher2.png" />
								</VStack>
								<Box width={"full"}>
									<Image src="assets/images/client_hero_voucher3.png" />
								</Box>
							</HStack>
							<Box width={"full"} p={"34px"}>
								<VStack
									gap={"30px"}
									width={"full"}
									alignItems={["center", "center", "flex-start"]}
								>
									<Text
										textAlign={"center"}
										fontSize={["28px", "32px", "38px"]}
										fontWeight={"600"}
										color={"#050505"}
									>
										Loyalty Program
									</Text>
									<Text
										fontSize={["14px", "16px", "18px"]}
										fontWeight={400}
										textAlign={["center", "center", "left"]}
										color={"#333"}
										width={["auto", "400px", "500px"]}
									>
										Buy and send gift cards from over 200 merchants
										acrossNigeria in 3 easy steps. Buy and send gift cards from
										over 200 merchants across Nigeria in 3 easy steps. <br />
										Buy and send gift cards from over 200 merchants
										acrossNigeria in 3 easy steps. Buy and send gift cards from
										over 200 merchants across Nigeria in 3 easy steps.
										<br />
										Buy and send gift cards from over 200 merchants
										acrossNigeria in 3 easy steps. Buy and send gift cards from
										over 200 merchants across Nigeria in 3 easy steps.
									</Text>
									<Box width={"320px"}>
										<PrimaryButton type={"primary"} title={"Get Started"} />
									</Box>
								</VStack>
							</Box>
						</HStack>
					</HStack>
				</Box>
				<Box width={"full"} py={"50px"} position={"relative"}>
					<Box
						position={"absolute"}
						top={"0"}
						right={"13%"}
						display={["none", "none", "block"]}
					>
						<TestimonialCard rating={5} />
					</Box>
					<Box
						position={"absolute"}
						top={"40%"}
						right={"5%"}
						display={["none", "none", "block"]}
					>
						<TestimonialCard rating={5} />
					</Box>
					<Box
						position={"absolute"}
						bottom={"0"}
						right={"13%"}
						display={["none", "none", "block"]}
					>
						<TestimonialCard rating={5} />
					</Box>
					<VStack
						py={"100px"}
						px={["20px", "40px", "70px"]}
						justify={"center"}
						gap={"20px"}
						width={"full"}
						maxWidth={"1200px"}
						margin={"auto"}
						borderRadius={"40px"}
						alignItems={"flex-start"}
						bgImage={`url('/assets/images/client_giftcard_section_layer.png')`}
						bgColor={"#103D96"}
					>
						<Text
							textTransform={"capitalize"}
							color={"#fff"}
							fontSize={["28px", "32px", "38px"]}
							fontWeight={"600"}
							textAlign={["center", "center", "auto"]}
						>
							What our customers are saying
						</Text>
						<Text
							fontSize={["14px", "16px", "18px"]}
							fontWeight={400}
							color={"#F5F5F5"}
							width={["auto", "auto", "500px"]}
							textAlign={["center", "center", "auto"]}
						>
							Buy and send gift cards from over 200 merchants acrossNigeria in 3
							easy steps. Buy and send gift cards from over 200 merchants across
							Nigeria in 3 easy steps. Buy and send gift cards from over 200
							merchants acrossNigeria in 3 easy steps.
						</Text>
						<VStack display={["flex", "flex", "none"]}>
							<TestimonialCard rating={5} />
							<TestimonialCard rating={5} />
							<TestimonialCard rating={5} />
						</VStack>
					</VStack>
				</Box>
				<Box
					py={"100px"}
					width={"full"}
					backgroundColor={"#fff"}
					backgroundImage={`url("assets/images/client_hero_layer.png")`}
					backgroundPosition={"bottom"}
					backgroundSize={"cover"}
				>
					<VStack width={"full"} gap={"40px"} py={"100px"} maxW={"1200x"}>
						<Text
							color={"#050505"}
							width={["auto", "auto", "622px"]}
							fontSize={["32px", "38px", "48px"]}
							fontWeight={"600"}
							textTransform={"capitalize"}
							textAlign={["center", "center", "left"]}
							px={"4px"}
						>
							The <span style={{ color: "#103D96" }}>crypto</span> gifting
							platform for daily lifestyle
						</Text>
						<Box width={"320px"}>
							<PrimaryButton title={"Get Started"} type={"primary"} />
						</Box>
					</VStack>
				</Box>
				<Footer />
			</VStack>
		</>
	);
};
