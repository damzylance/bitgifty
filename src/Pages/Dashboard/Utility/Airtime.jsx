import { ArrowBackIcon } from "@chakra-ui/icons";
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Image,
	Input,
	InputGroup,
	InputLeftElement,
	Select,
	Text,
	VStack,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useWallets from "../../../Hooks/useWallets";

const Airtime = (props) => {
	const telcos = [
		{ name: "mtn", logo: "/assets/images/mtn_logo.png", id: "BIL099" },
		{ name: "glo", logo: "/assets/images/glo_logo.webp", id: "BIL102" },
		{ name: "airtel", logo: "/assets/images/airtel_logo.png", id: "BIL100" },
		{ name: "9mobile", logo: "/assets/images/9mobile_logo.jpeg", id: "BIL103" },
	];

	const [page, setPage] = useState("list");
	const [telco, setTelco] = useState(null);
	const [networkId, setNetworkID] = useState(null);

	return (
		<>
			{page === "list" && (
				<VStack width={"full"} gap={"40px"} my={"40px"}>
					<Text fontSize={"2xl"} textAlign={"center"}>
						{" "}
						Plese Select Telco Provider
					</Text>
					<VStack width={"full"} gap={"10px"}>
						{telcos.length > 0
							? telcos.map((provider) => {
									return (
										<ProviderCard
											action={() => {
												setPage("buy");
												setTelco(provider.name);
												setNetworkID(provider.id);
											}}
											name={provider.name}
											logo={provider.logo}
											key={provider.id}
										/>
									);
							  })
							: ""}
					</VStack>
				</VStack>
			)}
			{page === "buy" && (
				<AirtimeForm
					telco={telco}
					onClose={props.action}
					networkId={networkId}
					back={() => setPage("list")}
				/>
			)}
		</>
	);
};

export const ProviderCard = (props) => {
	return (
		<HStack
			width={"full"}
			padding={"10px"}
			borderRadius={"10px"}
			background={"#fff"}
			_hover={{ background: "#f0f0f0" }}
			cursor={"pointer"}
			gap={"10px"}
			onClick={props.action}
			border={"1px solid #bbcdf1"}
		>
			<Image width={"50px"} src={props.logo} />
			<Text fontSize={"lg"} textTransform={"uppercase"}>
				{props.name}
			</Text>
		</HStack>
	);
};

const AirtimeForm = (props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm();
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [walletBalance, setWalletBalance] = useState(0);
	const [nairaAmount, setNairaAmount] = useState();
	const [tokenToNairaRate, setTokenToNairaRate] = useState(0);
	const [tokenAmount, setTokenAmount] = useState(0);
	const [currency, setCurrency] = useState("");
	const [minAmount, setMinAmount] = useState("");

	const { userWallets, walletsLoading } = useWallets();

	const buyAirtime = async (data) => {
		// data.type = "AIRTIME";
		// data.bill_type = props.networkId;
		data.bill_type = "AIRTIME";
		data.country = "NG";
		// data.token_amount = tokenAmount;
		setIsLoading(true);
		await axios
			.post(
				`${process.env.REACT_APP_BASE_URL}utilities/v2/initialize-payment/`,
				data,
				{
					headers: { Authorization: `Token ${localStorage.getItem("token")}` },
				}
			)
			.then((response) => {
				setIsLoading(false);
				toast({ title: "Airtime purchase successful", status: "success" });
				props.onClose();
			})
			.catch((error) => {
				setIsLoading(false);
				toast({
					title: error.response.data.error,
					status: "warning",
				});
			});
	};

	const handleAmountChange = (e) => {
		const tempNairaAmount = e.target.value;
		setNairaAmount(tempNairaAmount);
		if (currency === "stellar_usdc" || currency === "cusd") {
			setTokenAmount(tempNairaAmount / tokenToNairaRate);
		} else {
			setTokenAmount(tokenToNairaRate * tempNairaAmount);
		}
	};
	const fetchRate = async (currency) => {
		let rate;
		if (currency === "btc") {
			currency = "bitcoin";
		}

		if (currency === "naira") {
			rate = 1;
			setTokenToNairaRate(parseFloat(1));
		} else if (currency === "usdt_tron" || currency === "cusd") {
			setIsLoading(true);
			await axios
				.get(`${process.env.REACT_APP_BASE_URL}swap/get-dollar-price`, {
					headers: {
						Authorization: `Token ${localStorage.getItem("token")}`,
					},
				})
				.then((response) => {
					setTokenToNairaRate(parseFloat(response.data));
					setIsLoading(false);
					rate = parseFloat(response.data);
				})
				.catch((error) => {
					setIsLoading(false);
					toast({
						title: error.response.data.error,
						status: "warning",
					});
				});
		} else {
			setIsLoading(true);
			await axios
				.get(
					`${process.env.REACT_APP_BASE_URL}utilities/v2/naira/${currency}`,
					{
						headers: {
							Authorization: `Token ${localStorage.getItem("token")}`,
						},
					}
				)
				.then((response) => {
					setTokenToNairaRate(parseFloat(response.data));
					setIsLoading(false);
					rate = parseFloat(response.data);
				})
				.catch((error) => {
					setIsLoading(false);
					toast({
						title: error.response.data.error,
						status: "warning",
					});
				});
		}

		return rate;
	};
	//   const handleCurrencyChange = (e) =>
	const handleCurrencyChange = async (e) => {
		const network = e.target.value;
		setCurrency(e.target.value);
		for (let index = 0; index < userWallets.length; index++) {
			if (userWallets[index][0] === network) {
				if (userWallets[index][0] === "stellar_usdc") {
					setWalletBalance(userWallets[index][1].balance);
				} else {
					setWalletBalance(userWallets[index][1].balance.availableBalance);
				}
			}
		}
		if (network === "btc") {
			setMinAmount(5000);
		} else {
			setMinAmount(100);
		}
		const rate = await fetchRate(network === "stellar_usdc" ? "cusd" : network);
		// alert(currency);
		if (network === "usdc" || network === "cusd") {
			setTokenAmount(nairaAmount / rate);
		} else {
			setTokenAmount(rate * nairaAmount);
		}
	};

	return (
		<VStack my={"40px"} gap={"20px"} width={"full"}>
			<HStack width={"full"} alignItems={"center"}>
				<ArrowBackIcon
					fontSize={"20px"}
					cursor={"pointer"}
					onClick={props.back}
				/>
				<HStack width={"full"} justifyContent={"cener"}>
					<Text
						textAlign={"center"}
						fontSize={"2xl"}
						textTransform={"uppercase"}
						width={"full"}
					>
						BUY {props.telco} AIRTIME
					</Text>
				</HStack>
			</HStack>

			<form style={{ width: "100%" }} onSubmit={handleSubmit(buyAirtime)}>
				<VStack width={"full"} gap={"20px"}>
					<FormControl>
						<FormLabel fontSize={"sm"} color={"blackAlpha.700"}>
							Beneficiary Phone Number
						</FormLabel>

						<Input
							border={"1px solid #f9f9f9"}
							outline={"none"}
							fontSize={"16px"}
							type="tel"
							required
							name="phone"
							minLength={11}
							maxLength={11}
							{...register("customer")}
						/>
						<FormErrorMessage></FormErrorMessage>
					</FormControl>
					<FormControl>
						<FormLabel fontSize={"sm"} color={"blackAlpha.700"}>
							Amount
						</FormLabel>

						<Input
							border={"1px solid #f9f9f9"}
							outline={"none"}
							fontSize={"16px"}
							type="number"
							required
							{...register("amount", {
								onChange: handleAmountChange,
								// max: {
								//   value: walletBalance / tokenToNairaRate,
								//   message: "Insufficient funds",
								// },
								min: {
									value: minAmount,
									message: `Minimum recharge amount is ${minAmount}`,
								},
							})}
						/>
						<HStack
							width={"full"}
							alignItems={"center"}
							justifyContent={"space-between"}
							mt={"5px"}
						>
							<Text fontSize={"xs"} textAlign={"right"}>
								≈{" "}
								{currency === "btc"
									? tokenAmount.toFixed(6)
									: tokenAmount.toFixed(4)}{" "}
								{currency === "stellar_usdc" ? "USDC" : currency}
							</Text>
							<Text color={"red"} fontSize={"xx-small"}>
								{errors.amount && errors.amount.message}
							</Text>
						</HStack>

						<FormErrorMessage>
							{errors.amount && errors.amount.message}
						</FormErrorMessage>
					</FormControl>
					<FormControl>
						<FormLabel fontSize={"sm"} color={"blackAlpha.700"}>
							Pay with: Select Wallet
						</FormLabel>

						<Select
							fontSize={"16px"}
							textTransform={"uppercase"}
							{...register("chain", { onChange: handleCurrencyChange })}
							required
						>
							<option>Select Coin</option>;
							{userWallets
								.filter((wallet) => {
									return wallet[0] !== "eth";
								})
								.reverse()
								.map((wallet, index) => {
									return (
										<option value={wallet[0]} key={index}>
											{wallet[0] === "stellar_usdc" ? "USDC" : wallet[0]}
										</option>
									);
								})}
						</Select>
						<Text mt={"10px"}>Balance: {walletBalance}</Text>
						<FormErrorMessage></FormErrorMessage>
					</FormControl>
					<Button
						isLoading={isLoading}
						type="submit"
						width={"full"}
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
						Buy Airtime
					</Button>
				</VStack>
			</form>
		</VStack>
	);
};
export default Airtime;
