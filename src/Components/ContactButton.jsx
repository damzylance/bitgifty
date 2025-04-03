import { Image, Text, VStack, Link } from "@chakra-ui/react";

const ContactButton = () => {
	return (
		<Link
			href={"https://wa.me/message/S7NTWRBRPFYWK1"}
			style={{ position: "fixed", bottom: "1%", right: "1%", zIndex: "99" }}
		>
			<VStack gap={"0px"}>
				<Text fontSize={"sm"} marginBottom={"-20px"}>
					Need help?
				</Text>
				<Image
					src={"/assets/images/whatsapplogo.png"}
					width={"80px"}
					height={"80px"}
					alt={"Whatsapp Logo"}
				/>
			</VStack>
		</Link>
	);
};

export default ContactButton;
