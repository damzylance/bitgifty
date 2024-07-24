import { Button, HStack } from "@chakra-ui/react";
import React from "react";

const PrimaryButton = ({ title, type }) => {
	return (
		<Button
			// onClick={() => navigate("/login")}
			borderRadius={"none"}
			border={"1px solid #103D96"}
			fontSize={"16px"}
			p={"24px 24px"}
			width={"full"}
			background={
				type === "primary"
					? " linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)"
					: "#fff"
			}
			color={type === "primary" ? "#fff" : "#103D96"}
			_hover={
				type === "primary"
					? { background: "#fff", color: "#103D96" }
					: {
							background:
								"linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
							color: "#fff",
					  }
			}
			variant={"solid"}
		>
			{title ? title : "Button"}
		</Button>
	);
};

export default PrimaryButton;
