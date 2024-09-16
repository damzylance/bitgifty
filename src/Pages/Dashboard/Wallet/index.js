import {
	Button,
	Container,
	Flex,
	Input,
	Text,
	VStack,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Box,
	useToast,
	Spinner,
	HStack,
	Image,
	Select,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";
import Countdown from "react-countdown";
import { NumericFormat } from "react-number-format";

import axios from "axios";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../Components/DashboardLayout";
import Authenticate from "../../../Helpers/Auth";
import { set, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { MdSwapVert } from "react-icons/md";
import { AiFillPlusSquare } from "react-icons/ai";
import { PayoutModal } from "../../UserSetting/Payout";
import useWallets from "../../../Hooks/useWallets";
import { RxEyeClosed } from "react-icons/rx";
import { AddIcon, ChevronRightIcon, CopyIcon } from "@chakra-ui/icons";
import PrimaryButton from "../../../Components/PrimaryButton";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartOptions = {
	plugins: {
		legend: {
			display: false,
		},
	},
};

function Wallet() {
	const { userWallets, walletsLoading, newWallets } = useWallets();
	const options = {
		headers: { "x-api-key": process.env.REACT_APP_RATE_KEY },
	};
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [isLoading, setIsLoading] = useState(walletsLoading);
	const [totalInDollars, setTotalInDollars] = useState(0);
	const navigate = useNavigate();
	const fonbankDeposit = () => {
		const cusdWallet = userWallets.find((wallet) => {
			return wallet[0] === "cusd";
		});
		window.open(
			`https://pay.fonbnk.com/?source=${process.env.REACT_APP_SOURCE_PARAM}&asset=CUSD&country=NG&provider=mobile_money&network=CELO&minAmount=1&address=${cusdWallet[1].address}&freezeWallet=1&freezeNetwork=1&redirectUrl=${process.env.REACT_APP_FRONTEND_BASE_URL}/wallet/{status}`,
			"_self"
		);
	};
	const fetchWallets = async () => {
		const labels = [];
		const balances = [];
		let sum = 0;
		for (let index = 0; index < userWallets.length; index++) {
			const coinWallet = userWallets[index];
			const balance = coinWallet[1].balance.availableBalance;
			if (coinWallet[0] === "btc") {
				const btcInDollar = await BalanceToDollar(
					`BTC`,
					isNaN(balance) ? 0 : balance
				);
				sum += btcInDollar;
				balances.push(btcInDollar);
				labels.push("BTC");
			} else if (coinWallet[0] === "celo") {
				const celoInDollar = await BalanceToDollar(
					`CELO`,
					isNaN(balance) ? 0 : balance
				);
				sum += celoInDollar;
				balances.push(celoInDollar);
				labels.push("CELO");
			} else if (coinWallet[0] === "cusd") {
				const cusdInDollar = await BalanceToDollar(
					`CUSD`,
					isNaN(balance) ? 0 : balance
				);
				sum += cusdInDollar;
				balances.push(cusdInDollar);
				labels.push("CUSD");
			} else if (coinWallet[0] === "ceur") {
				const ceurInDollar = await BalanceToDollar(
					`CEUR`,
					isNaN(balance) ? 0 : balance
				);
				sum += ceurInDollar;
				balances.push(ceurInDollar);
				labels.push("CEUR");
			} else if (coinWallet[0] === "usdt_tron") {
				const usdtInDollar = await BalanceToDollar(
					`USDT`,
					isNaN(balance) ? 0 : balance
				);
				sum += usdtInDollar;
				balances.push(usdtInDollar);
				labels.push("USDT");
			} else if (coinWallet[0] === "eth") {
				const ethInDollar = await BalanceToDollar(
					`ETH`,
					isNaN(balance) ? 0 : balance
				);
				sum += ethInDollar;
				balances.push(ethInDollar);
				labels.push("ETH");
			} else if (coinWallet[0] === "naira") {
				const dollarToNaira = await axios
					.get(`${process.env.REACT_APP_BASE_URL}swap/get-dollar-price`, {
						headers: {
							Authorization: `Token ${localStorage.getItem("token")}`,
						},
					})
					.then((response) => {
						setIsLoading(false);
						return response.data;
					})
					.catch((error) => {});
				const balance =
					Math.round(coinWallet[1].balance.availableBalance) / dollarToNaira;
				sum += isNaN(balance) ? 0 : balance;
				balances.push(balance);
				labels.push("NGN");
			}

			setTotalInDollars(sum.toFixed(2));
			setChartData({
				labels: labels,
				datasets: [
					{
						label: "Balance",
						data: balances,
						backgroundColor: [
							"#492b7c",
							"#ff8600",
							"#fff",
							"#f8a6e4",
							"#6A6BD5",
							"#624CAB",
							"#624CBB",
						],
						borderColor: [
							"rgba(255, 99, 132, 1)",
							"rgba(54, 162, 235, 1)",
							"rgba(255, 206, 86, 1)",
							"rgba(75, 192, 192, 1)",
							"rgba(153, 102, 255, 1)",
							"rgba(255, 159, 64, 1)",
							"rgba(255, 150, 63, 1)",
						],
						borderWidth: 1,
					},
				],
			});
		}
		setIsLoading(false);
	};
	const [chartData, setChartData] = useState({
		labels: [],
		datasets: [
			{
				label: "# of Votes",
				data: [],
				backgroundColor: [
					"rgba(255, 255, 251, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 1,
			},
		],
	});

	// const fetchVirtualWallets = async () => {
	//   await axios
	//     .get(`${process.env.REACT_APP_BASE_URL}wallets/virtual-accounts`, {
	//       headers: {
	//         Authorization: `Token ${localStorage.getItem("token")}`,
	//       },
	//     })
	//     .then((response) => {
	//       console.log(response);
	//       const entries = Object.entries(response.data);
	//       console.log(entries);
	//       setIsLoading(false);
	//       setWallets(entries);
	//       setFiatWallets(
	//         entries.filter((element) => {
	//           return element[1].type === "fiat";
	//         })
	//       );
	//     })
	//     .catch((error) => {
	//       console.log(error);
	//     });
	// };

	useEffect(() => {
		fetchWallets();
	}, [userWallets]);

	const BalanceToDollar = async (coin, balance) => {
		let rate;
		await axios
			.get(`https://api.tatum.io/v3/tatum/rate/${coin}?basePair=USD`, options)
			.then((response) => {
				rate = response.data.value;
			})
			.catch((error) => {});

		return parseFloat(balance) * parseFloat(rate);
	};
	return (
		<DashboardLayout>
			<VStack gap={"10"} my={"50px"} width="full" scrollBehavior={"smooth"}>
				<Container
					background={"#D1DFFA"}
					py={"4"}
					border={"0.5px solid #103D96"}
					borderRadius={"24px 8px"}
					maxWidth="500px"
					position={"relative"}
					backgroundImage={"assets/images/waves.svg"}
					bgSize={"cover"}
					color={"#0B2A65"}
					boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}
				>
					<VStack
						position={"relative"}
						alignItems={"flex-start"}
						gap={0}
						justifyContent={"flex-start"}
						width={"full"}
					>
						<HStack width={"full"} justifyContent={"space-between"}>
							<HStack justifyContent={"space-between"} alignItems={"center"}>
								<Text fontSize={"18px"} fontWeight={"400"}>
									Total Balance
								</Text>

								<RxEyeClosed cursor={"pointer"} />
							</HStack>
							<HStack
								cursor={"pointer"}
								_hover={{ borderBottom: "1px solid #0B2A65" }}
								onClick={() => {
									navigate(`/transaction-history/`);
								}}
							>
								<Text fontSize={"sm"} fontWeight={"500"}>
									Transaction History
								</Text>
								<ChevronRightIcon fontSize={"20px"} />
							</HStack>
						</HStack>

						<HStack
							width={"full"}
							justifyContent={"space-between"}
							alignItems={"center"}
						>
							<VStack gap={"4"} alignItems={"flex-start"}>
								<Text fontSize={"40px"} fontWeight={"600"}>
									{totalInDollars} cUSD
								</Text>
								{walletsLoading ? (
									<Spinner />
								) : (
									<Text fontSize={"18px"} fontWeight={"600"}>
										${totalInDollars}
									</Text>
								)}
							</VStack>
							<Box width={"150px"}>
								{walletsLoading ? (
									<Spinner />
								) : (
									<Doughnut options={chartOptions} data={chartData} />
								)}
							</Box>
						</HStack>
					</VStack>
				</Container>
				<Box width={"50%"} maxW={"500px"} margin={"auto"}>
					<PrimaryButton
						action={() => fonbankDeposit()}
						type={"primary"}
						title={"Deposit from Bank"}
					/>
				</Box>
				<VStack
					alignItems={"flex-start"}
					width="full"
					gap={"10"}
					px={["10px", "10px", "none"]}
				>
					<VStack alignItems={"flex-start"} width="full" gap={"2"}>
						<Flex
							justifyContent={"space-between"}
							display={["none", "none", "flex", "flex"]}
							width={"full"}
							bg={"brand.600"}
							py="24px"
							px={"30px"}
							fontWeight={"700"}
							color={"brand.bg1"}
						>
							<Text>Assets</Text>
							<Text>Balance</Text>
							<Text>Action</Text>
						</Flex>
						<VStack
							width={"full"}
							alignContent="flex-start"
							gap={"2"}
							borderBottom={"1px solid #A3BFF5"}
							pb="4"
						>
							<Text
								borderBottom={"1px solid #A3BFF5"}
								border
								width={"full"}
								py={"1"}
								color={"brand.700"}
								fontWeight="bold"
							>
								Fiat
							</Text>
							<VStack width={"full"} gap={"2"} alignContent="flex-start">
								{walletsLoading ? (
									<Spinner />
								) : (
									userWallets
										.filter((wallet) => {
											return wallet[1].type === "fiat";
										})
										.map((wallet, index) => {
											// const { address, network } = wallet;
											const coinWallet = wallet;
											const balance = parseFloat(
												coinWallet[1].balance.availableBalance
											).toFixed(2);
											return (
												<CoinRow
													key={index}
													currency={coinWallet[0].toUpperCase()}
													address={coinWallet[1].address}
													amount={isNaN(balance) ? 0 : balance}
													network={coinWallet[0]}
													qr={coinWallet[1].qrcode}
													type={coinWallet[1].type}
												/>
											);
										})
								)}
							</VStack>
						</VStack>
						<VStack
							width={"full"}
							alignContent="flex-start"
							gap={"2"}
							borderBottom={"1px solid #A3BFF5"}
							pb="4"
						>
							<Text
								borderBottom={"1px solid #A3BFF5"}
								border
								width={"full"}
								py={"1"}
								color={"brand.700"}
								fontWeight="bold"
							>
								Crypto
							</Text>
							<VStack width={"full"} gap={"2"} alignContent="flex-start">
								{walletsLoading ? (
									<Spinner />
								) : (
									userWallets
										.filter((wallet) => {
											return wallet[1].type !== "fiat";
										})
										.map((wallet, index) => {
											// const { address, network } = wallet;
											const coinWallet = wallet;
											const balance = parseFloat(
												coinWallet[1].balance.availableBalance
											).toFixed(4);
											return (
												<CoinRow
													key={index}
													currency={coinWallet[0].toUpperCase()}
													address={coinWallet[1].address}
													amount={isNaN(balance) ? 0 : balance}
													network={coinWallet[0]}
													qr={coinWallet[1].qrcode}
													type={"crypto"}
												/>
											);
										})
								)}
								{newWallets.length > 0 &&
									newWallets.map((wallet) => {
										console.log(wallet);
										return <InactiveCoinRow wallet={wallet} />;
									})}
								{newWallets.length > 0 && (
									<VStack
										bg={"brand.700"}
										color={"#fff"}
										width={"100px"}
										justifyContent={"center"}
										borderRadius={"full"}
										height={"100px"}
										alignItems={"center"}
										cursor={"pointer"}
										alignSelf={"flex-end"}
										onClick={() => onOpen()}
									>
										<AddIcon />
										<Text fontSize={"xs"}>Add Currency</Text>
									</VStack>
								)}
							</VStack>
						</VStack>
						<AddWalletModal
							isOpen={isOpen}
							onClose={onClose}
							wallets={newWallets}
						/>
					</VStack>
				</VStack>
			</VStack>
		</DashboardLayout>
	);
}

const InactiveCoinRow = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Flex
			width={"full"}
			gap="2"
			justifyContent={"space-between"}
			alignItems={"center"}
			flexDir={["column", "column", "row"]}
			background={"#fff"}
			padding={["24px 10px", "24px 10px", "24px 10px", "24px 30px"]}
			boxShadow={"0px 1px 4px 0px rgba(0, 0, 0, 0.10)"}
		>
			<HStack width={"full"} justifyContent="space-between">
				<Text textTransform={"uppercase"}>{props.wallet}</Text>
				<Text ml={["", "", "150px"]}>0</Text>
			</HStack>

			<HStack
				width={"full"}
				gap={["0", "0", "0"]}
				justifyContent={["space-between", "space-between", "flex-end"]}
			>
				<Button
					size={["xs", "sm", "md"]}
					borderRadius={"none"}
					background={
						" linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)"
					}
					_hover={{
						background:
							"linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
					}}
					variant={"solid"}
					onClick={() => {
						onOpen();
					}}
				>
					Spend
				</Button>
				<Button
					size={["xs", "sm", "md"]}
					borderRadius={"none"}
					_hover={{
						background:
							"linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
						color: "#fff",
					}}
					variant={"outline"}
					onClick={() => {}}
					disabled={
						props.currency === "NAIRA" ||
						props.currency === "ETHEREUM" ||
						props.currency === "BITCOIN"
							? true
							: false
					}
				>
					Deposit
				</Button>
				<Button
					size={["xs", "sm", "md"]}
					borderRadius={"none"}
					_hover={{
						background:
							"linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
						color: "#fff",
					}}
					variant={"outline"}
				>
					Swap
				</Button>
				<Button
					size={["xs", "sm", "md"]}
					borderRadius={"none"}
					_hover={{
						background:
							"linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
						color: "#fff",
					}}
					variant={"outline"}
					onClick={() => {}}
				>
					Withdraw
				</Button>

				<Button
					size={["xs", "sm", "md"]}
					borderRadius={"none"}
					_hover={{
						background:
							"linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
						color: "#fff",
					}}
					variant={"outline"}
					disabled
				>
					History
				</Button>
			</HStack>
			<AddWalletModal2
				isOpen={isOpen}
				onClose={onClose}
				wallet={props.wallet}
			/>
		</Flex>
	);
};

function CoinRow(props) {
	const navigate = useNavigate();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [page, setPage] = useState("deposit");
	const [swapFee, setSwapFee] = useState("");

	return (
		<Flex
			width={"full"}
			gap="2"
			justifyContent={"space-between"}
			alignItems={"center"}
			flexDir={["column", "column", "row"]}
			background={"#fff"}
			padding={["24px 10px", "24px 10px", "24px 10px", "24px 30px"]}
			boxShadow={"0px 1px 4px 0px rgba(0, 0, 0, 0.10)"}
		>
			<HStack width={"full"} justifyContent="space-between">
				<Text>{props.currency}</Text>
				<Text ml={["", "", "150px"]}>{props.amount}</Text>
			</HStack>

			<HStack
				width={"full"}
				gap={["0", "0", "0"]}
				justifyContent={["space-between", "space-between", "flex-end"]}
			>
				<Button
					size={["xs", "sm", "md"]}
					borderRadius={"none"}
					background={
						" linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)"
					}
					_hover={{
						background:
							"linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
					}}
					variant={"solid"}
					onClick={() => {
						navigate("/utilities");
					}}
					disabled={
						props.currency === "ETHEREUM" || props.currency === "BITCOIN"
							? true
							: false
					}
				>
					Spend
				</Button>
				<Button
					size={["xs", "sm", "md"]}
					borderRadius={"none"}
					_hover={{
						background:
							"linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
						color: "#fff",
					}}
					variant={"outline"}
					onClick={() => {
						if (props.type !== "fiat") {
							setPage("deposit");
							onOpen();
						}
					}}
					disabled={
						props.currency === "NAIRA" ||
						props.currency === "ETHEREUM" ||
						props.currency === "BITCOIN"
							? true
							: false
					}
				>
					Deposit
				</Button>
				<Button
					size={["xs", "sm", "md"]}
					borderRadius={"none"}
					_hover={{
						background:
							"linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
						color: "#fff",
					}}
					variant={"outline"}
					onClick={() => {
						if (props.type !== "fiat") {
							setPage("swap");
							onOpen();
						}
					}}
					disabled={
						props.currency === "NAIRA" ||
						props.currency === "ETHEREUM" ||
						props.currency === "BITCOIN"
							? true
							: false
					}
				>
					Swap
				</Button>
				<Button
					size={["xs", "sm", "md"]}
					borderRadius={"none"}
					_hover={{
						background:
							"linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
						color: "#fff",
					}}
					variant={"outline"}
					onClick={() => {
						setPage("withdraw");
						onOpen();
					}}
					disabled={
						props.currency === "ETHEREUM" || props.currency === "BITCOIN"
							? true
							: false
					}
				>
					Withdraw
				</Button>

				<Button
					size={["xs", "sm", "md"]}
					borderRadius={"none"}
					_hover={{
						background:
							"linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
						color: "#fff",
					}}
					variant={"outline"}
					onClick={() => {
						navigate(`/transaction-history/${props.currency.toLowerCase()}`);
					}}
					disabled={
						props.currency === "ETHEREUM" || props.currency === "BITCOIN"
							? true
							: false
					}
				>
					History
				</Button>
			</HStack>
			<WalletModal
				isOpen={isOpen}
				onClose={onClose}
				page={page}
				address={props.address}
				network={props.network}
				qr={props.qr}
				balance={props.amount}
				type={props.type}
			/>
		</Flex>
	);
}
const AddWalletModal2 = (props) => {
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm();
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [owner, setOwner] = useState("");
	const createNewWallet = async () => {
		const data = { manual: true, owner: owner, chain: props.wallet };
		data.manual = true;
		data.owner = owner;

		setIsLoading(true);
		await axios
			.post(
				`${process.env.REACT_APP_BASE_URL}wallets/virtual-account-create/`,
				data,
				{
					headers: {
						Authorization: `Token ${localStorage.getItem("token")}`,
					},
				}
			)
			.then(function (response) {
				setIsLoading(false);
				toast({
					title: "Wallet creation successfull",
					status: "success",
				});
				props.onClose();
			})
			.catch(function (error) {
				setIsLoading(false);
				toast({
					title: error?.response?.data?.error || "An error occured",
					status: "warning",
				});
			});
	};
	const fetchUser = async () => {
		await axios
			.get(`${process.env.REACT_APP_BASE_URL}auth/user/`, {
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
			})
			.then(function (response) {
				setOwner(response.data.pk);
			})
			.catch(function (error) {
				if (error?.response?.status === 500) {
					toast({ title: "Server error", status: "error" });
				} else if (error.response?.status === 403) {
					toast({
						title: "session expired. Please sign in again",
						status: "warning",
					});
					navigate("/login");
				} else if (error.response?.status === 401) {
					toast({
						title: "Unautorised. Please sign in again",
						status: "warning",
					});
					navigate("/login");
				} else {
					toast({
						title: error?.response?.data?.error || "An error occured",
						status: "warning",
					});
				}
			});
	};
	useEffect(() => {
		fetchUser();
	}, []);
	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent py={"40px"} width={"full"}>
				<ModalHeader textAlign={"center"}>Add New Wallet</ModalHeader>
				<ModalCloseButton />
				<ModalBody width={"full"}>
					<VStack
						width={"full"}
						gap={"10px"}
						alignItems={"center"}
						textAlign={"center"}
					>
						<Text fontSize={"xl"}>
							Create{" "}
							<span style={{ textTransform: "uppercase" }}>{props.wallet}</span>{" "}
							Wallet
						</Text>
						<Text>
							You need to create{" "}
							<span style={{ textTransform: "uppercase" }}>{props.wallet}</span>{" "}
							wallet receive, send or spend.
						</Text>
						<Button
							borderRadius={"none"}
							bg={"linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)"}
							_hover={{
								background:
									"linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
								color: "#fff",
							}}
							width={"full"}
							isLoading={isLoading}
							disabled={isLoading}
							onClick={() => createNewWallet()}
						>
							Create
						</Button>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
const AddWalletModal = (props) => {
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm();
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [owner, setOwner] = useState("");
	const createNewWallet = async (data) => {
		data.manual = true;
		data.owner = owner;
		setIsLoading(true);
		await axios
			.post(
				`${process.env.REACT_APP_BASE_URL}wallets/virtual-account-create/`,
				data,
				{
					headers: {
						Authorization: `Token ${localStorage.getItem("token")}`,
					},
				}
			)
			.then(function (response) {
				setIsLoading(false);
				toast({
					title: "Wallet creation successfull",
					status: "success",
				});
				props.onClose();
			})
			.catch(function (error) {
				setIsLoading(false);
				toast({
					title: error?.response?.data?.error || "An error occured",
					status: "warning",
				});
			});
	};
	const fetchUser = async () => {
		await axios
			.get(`${process.env.REACT_APP_BASE_URL}auth/user/`, {
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
			})
			.then(function (response) {
				setOwner(response.data.pk);
			})
			.catch(function (error) {
				if (error?.response?.status === 500) {
					toast({ title: "Server error", status: "error" });
				} else if (error.response?.status === 403) {
					toast({
						title: "session expired. Please sign in again",
						status: "warning",
					});
					navigate("/login");
				} else if (error.response?.status === 401) {
					toast({
						title: "Unautorised. Please sign in again",
						status: "warning",
					});
					navigate("/login");
				} else {
					toast({
						title: error?.response?.data?.error || "An error occured",
						status: "warning",
					});
				}
			});
	};
	useEffect(() => {
		fetchUser();
	}, []);
	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent py={"40px"} width={"full"}>
				<ModalHeader textAlign={"center"}>Add New Wallet</ModalHeader>
				<ModalCloseButton />
				<ModalBody width={"full"}>
					<form onSubmit={handleSubmit(createNewWallet)} width="100%">
						<VStack width={"full"} gap={"20px"}>
							{" "}
							<Select
								fontSize={"16px"}
								textTransform={"uppercase"}
								{...register("chain")}
								required
							>
								{" "}
								<option>Select Wallet</option>;
								{props.wallets.map((wallet, id) => {
									return (
										<option key={id} value={wallet}>
											{wallet}
										</option>
									);
								})}
							</Select>
							<Button
								isLoading={isLoading}
								borderRadius={"none"}
								background={
									" linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)"
								}
								_hover={{
									background:
										"linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
								}}
								variant={"solid"}
								type="submit"
								width={"full"}
							>
								Create
							</Button>
						</VStack>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
const WalletModal = (props) => {
	const [withdrawalFee, setWithdrawalFee] = useState("");
	const btnRef = React.useRef();
	const {
		onOpen: bankModalOpen,
		onClose: bankModalClose,
		isOpen: bankModalisOpen,
	} = useDisclosure();
	const {
		onOpen: withdrawalModalOpen,
		onClose: withdrawalModalClose,
		isOpen: withdrawalisOpen,
	} = useDisclosure();
	const { register, handleSubmit } = useForm();
	const [withdrawAmount, setWithdrawAmount] = useState("");
	const [floatAmount, setFloatAmount] = useState("");
	const [errors, setErrors] = useState([]);
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [bankAccounts, setBankAccounts] = useState([]);
	const [accountsLoading, setAccountsLoading] = useState(false);

	const navigate = useNavigate();
	const fetchBankAccounts = async () => {
		setAccountsLoading(true);
		await axios
			.get(`${process.env.REACT_APP_BASE_URL}payouts/`, {
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
			})
			.then((response) => {
				setBankAccounts(
					response.data.results.map((bank) => {
						return {
							...bank,
							label: `${bank.bank_name} -  ${bank.account_number} - ${bank.account_name}`,
						};
					})
				);
				setAccountsLoading(false);
			})
			.catch((error) => {
				setAccountsLoading(false);
				toast({
					title: error.response.data.error || "An error occured",
					status: "error",
				});
			});
	};
	const [exchangeRate, setExchangeRate] = useState();
	const fetchNairaRate = async (coin) => {
		let rate;

		if (coin === "usdt_tron" || coin === "cusd") {
			setIsLoading(true);
			await axios
				.get(`${process.env.REACT_APP_BASE_URL}swap/get-dollar-price`, {
					headers: {
						Authorization: `Token ${localStorage.getItem("token")}`,
					},
				})
				.then((response) => {
					setIsLoading(false);
					rate = response.data;
				})
				.catch((error) => {
					setIsLoading(false);
					toast({
						title: error.response.data.error || "Error Fetching Rates",
						status: "error",
					});
				});
		} else {
			if (coin === "btc") {
				coin = "bitcoin";
			}
			setIsLoading(true);
			await axios
				.get(`${process.env.REACT_APP_BASE_URL}swap/naira/${coin}`, {
					headers: {
						Authorization: `Token ${localStorage.getItem("token")}`,
					},
				})
				.then((response) => {
					setIsLoading(false);
					rate = response.data;
				})
				.catch((error) => {
					setIsLoading(false);
					toast({
						title: error.response.data.error || "An error occured",
						status: "error",
					});
				});
		}

		return rate;
	};
	const SwapToNaira = async (data) => {
		console.log(data);
		data.swap_amount = floatAmount;
		data.swap_to = "naira";
		data.swap_from = props.network;
		console.log(data);
		if (errors.length > 0) {
		} else {
			setIsLoading(true);
			await axios
				.post(`${process.env.REACT_APP_BASE_URL}swap/v2`, data, {
					headers: {
						Authorization: `Token ${localStorage.getItem("token")}`,
					},
				})
				.then(function (response) {
					setIsLoading(false);
					toast({
						title: "Swap Successful",
						status: "success",
					});
					props.onClose();
				})
				.catch(function (error) {
					setIsLoading(false);
					if (error.response.data.error.includes("Insufficient funds")) {
						toast({
							title: "insufficient funds",
							status: "warning",
						});
					} else {
						toast({ title: error.response?.data?.error, status: "error" });
					}
				});
		}
	};
	const WithdrawFiat = async (data) => {
		data.amount = withdrawAmount;
		data.network = props.network;
		console.log(data);
		if (errors.length > 0) {
		} else {
			setIsLoading(true);
			await axios
				.post(`${process.env.REACT_APP_BASE_URL}v2/withdraw/`, data, {
					headers: {
						Authorization: `Token ${localStorage.getItem("token")}`,
					},
				})
				.then(function (response) {
					setIsLoading(false);
					toast({
						title: "Withdrawal Successful",
						status: "success",
					});
					withdrawalModalOpen();
				})
				.catch(function (error) {
					console.log(error);
					setIsLoading(false);
					toast({
						title: error?.response?.data?.error || "An error occured",
						status: "warning",
					});
				});
		}
	};
	const WithdrawCrypto = async (data) => {
		data.amount = withdrawAmount.replaceAll(",", "");
		console.log(data);

		if (props.network === "btc") {
			data.network = "bitcoin";
		} else {
			data.network = props.network;
		}
		// data.fee = 0.0005;
		data.transaction_type = "crypto";
		if (errors.length > 0) {
		} else {
			setIsLoading(true);
			await axios
				.post(`${process.env.REACT_APP_BASE_URL}v2/withdraw/`, data, {
					headers: {
						Authorization: `Token ${localStorage.getItem("token")}`,
					},
				})
				.then(function (response) {
					setIsLoading(false);
					toast({
						title: "Withdrawal Successful",
						status: "success",
					});
					props.onClose();
				})
				.catch(function (error) {
					setIsLoading(false);
					toast({
						title: error.response?.data?.error,
						status: "error",
					});
				});
		}
	};

	useEffect(() => {
		if (props.type === "fiat") {
			fetchBankAccounts();
		}
	}, []);

	return (
		<Drawer
			isOpen={props.isOpen}
			placement="right"
			onClose={props.onClose}
			finalFocusRef={btnRef}
			size={"md"}
		>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				{props.page === "deposit" && (
					<>
						{" "}
						<DrawerHeader
							color={"brand.700"}
							textAlign={"center"}
							textTransform={"uppercase"}
						>
							{props.network} Wallet Address
						</DrawerHeader>
						<DrawerBody>
							<Box textAlign={"center"} mt={"40px"}>
								<VStack>
									<Image src={props.qr} />
									<Text
										fontSize={["sm", "md", "lg"]}
										color={"brand.500"}
										fontWeight={"bold"}
									>
										{props.address}
									</Text>
									<HStack>
										<Text fontSize={"s"}>
											Copy wallet address to deposit coin
										</Text>
										<CopyIcon
											fontSize={"2xl"}
											cursor={"pointer"}
											_hover={{ color: "blue" }}
											onClick={() => {
												navigator.clipboard.writeText(props.address);
												toast({
													title: "Wallet address copied",
													status: "success",
												});
											}}
										/>
									</HStack>
								</VStack>
							</Box>{" "}
						</DrawerBody>
					</>
				)}

				{props.page === "withdraw" && (
					<>
						<DrawerHeader color={"brand.700"} textAlign={"center"}>
							Withdraw{" "}
							<span style={{ textTransform: "capitalize" }}>
								{props.network}
							</span>
						</DrawerHeader>
						<DrawerBody>
							<Box width={"full"} textAlign={"center"} mt={"100px"}>
								{props.type === "fiat" ? (
									<form
										onSubmit={handleSubmit(WithdrawFiat)}
										style={{ width: "100%" }}
									>
										{bankAccounts.length > 0 ? (
											<VStack gap={"20px"}>
												<VStack gap={"20px"} width={"full"}>
													<VStack width={"full"} alignItems={"flex-start"}>
														<Text
															fontSize={"xs"}
															fontWeight={"semibold"}
															color={"gray.600"}
														>
															NGN Amount
														</Text>
														<NumericFormat
															value={withdrawAmount}
															placeholder="Amount"
															required
															thousandSeparator=","
															style={{
																width: "100%",
																outline: "2px solid transparent",
																border: "1px solid #e2e8f0",
																padding: "6px 14px",
																borderRadius: "5px",
															}}
															onChange={(e) => {
																let amount = e.target.value;
																setWithdrawAmount(amount);
																let toFloatAmount;
																toFloatAmount = parseFloat(
																	amount.replaceAll(",", "")
																);
																if (props.network === "naira") {
																	let coinErrors = [];
																	if (toFloatAmount > props.balance) {
																		coinErrors.push("Insufficient Balance");
																	} else {
																		if (toFloatAmount < 1000) {
																			coinErrors.push(
																				"Minimum withdrawal is 1000  "
																			);
																			setErrors(coinErrors);
																		} else {
																			setErrors([]);
																			setFloatAmount(
																				isNaN(toFloatAmount.toString())
																					? 0
																					: toFloatAmount
																			);
																			setWithdrawAmount(
																				isNaN(toFloatAmount.toString())
																					? 0
																					: toFloatAmount
																			);
																		}
																	}
																}
															}}
														/>
														<HStack width={"full"} justifyContent={"flex-end"}>
															<Text
																color={"blackAlpha.500"}
																fontSize={"xs"}
																textDecoration={"underline"}
																fontWeight={"semibold"}
																cursor={"pointer"}
																onClick={() => {
																	setWithdrawAmount(props.balance);
																}}
															>
																MAX
															</Text>
														</HStack>
													</VStack>

													<VStack width={"full"} alignItems={"flex-start"}>
														<Text
															fontSize={"xs"}
															fontWeight={"semibold"}
															color={"gray.600"}
														>
															Select Bank Account
														</Text>
														<Box width={"full"} textAlign={"left"}>
															<Select
																bg={"#fff"}
																borderRadius={"md"}
																name="account_number"
																{...register("account_number")}
															>
																{bankAccounts.map((bankAccount, id) => {
																	return (
																		<option
																			key={id}
																			value={`${bankAccount.account_number}`}
																		>
																			{bankAccount.label}
																		</option>
																	);
																})}
															</Select>
														</Box>
														<Box height={"10px"}></Box>
														<HStack
															width={"full"}
															border={"1px solid"}
															borderColor={"gray.300"}
															justifyContent={"space-between"}
															alignItems={"center"}
															padding={"10px"}
															borderRadius={"xl"}
															cursor={"pointer"}
															onClick={() => {
																bankModalOpen();
																fetchBankAccounts();
															}}
														>
															<Text
																pl={"10px"}
																lineHeight={"100%"}
																color={"gray.600"}
																fontSize={"sm"}
																fontWeight={"medium"}
																borderLeft={"2px solid #477FEB "}
															>
																Add another bank
															</Text>
															<AiFillPlusSquare
																color={"#103D96"}
																fontSize={"24px"}
																cursor={"pointer"}
															/>
														</HStack>
														<Box textAlign={"left"}>
															{errors.length > 0 && (
																<Text my={"2"} color={"red"} fontSize={"xs"}>
																	{errors[0]}
																</Text>
															)}
														</Box>
													</VStack>
												</VStack>
												<Button
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
													isLoading={isLoading}
													type="Submit"
												>
													{" "}
													Withdraw
												</Button>
											</VStack>
										) : (
											<VStack>
												<Text fontSize={"md"} color={"gray.700"}>
													You don't have a payment method. Please set one
												</Text>
												<HStack
													width={"full"}
													border={"1px solid"}
													borderColor={"gray.300"}
													justifyContent={"space-between"}
													alignItems={"center"}
													padding={"20px"}
													borderRadius={"xl"}
													cursor={"pointer"}
													onClick={() => {
														bankModalOpen();
														fetchBankAccounts();
													}}
												>
													<Text
														pl={"10px"}
														lineHeight={"100%"}
														color={"gray.600"}
														fontWeight={"semibold"}
														borderLeft={"2px solid #477FEB "}
													>
														Add Bank
													</Text>
													<AiFillPlusSquare
														color={"#103D96"}
														fontSize={"24px"}
														cursor={"pointer"}
													/>
												</HStack>
											</VStack>
										)}
									</form>
								) : (
									""
								)}
								{props.type === "crypto" ? (
									<form
										onSubmit={handleSubmit(WithdrawCrypto)}
										style={{ width: "100%" }}
									>
										<VStack gap={"20px"}>
											{/* <Input
                      name="amount"
                      type={"text"}
                      placeholder="Amount"
                      {...register("amount", {
                        onChange: (e) => {
                          console.log(e.target.value.toLocaleString("en-US"));
                        },
                      })}
                      required
                    /> */}
											<Box width={"full"}>
												<NumericFormat
													value={withdrawAmount}
													placeholder="Amount"
													required
													allowLeadingZeros
													thousandSeparator=","
													style={{
														width: "100%",
														outline: "2px solid transparent",
														border: "1px solid #e2e8f0",
														padding: "6px 14px",
														borderRadius: "5px",
													}}
													onChange={(e) => {
														let amount = e.target.value;
														setWithdrawAmount(amount);
														let toFloatAmount;
														toFloatAmount = parseFloat(
															amount.replaceAll(",", "")
														);

														if (props.network === "Bitcoin") {
															let btcErrors = [];

															if (toFloatAmount < 0.005) {
																btcErrors.push("Minimum withdrawal is 0.005 ");
																setErrors(btcErrors);
															} else {
																setErrors([]);
																setFloatAmount(toFloatAmount.toString());
															}
														} else if (props.network === "celo") {
															let coinErrors = [];
															if (toFloatAmount < 20) {
																coinErrors.push("Minimum withdrawal is 20");
																setErrors(coinErrors);
															} else {
																setErrors([]);
																setFloatAmount(toFloatAmount.toString());
															}
														} else if (props.network === "usdt_tron") {
															let coinErrors = [];
															if (toFloatAmount < 1) {
																coinErrors.push("Minimum withdrawal is 1  ");
																setErrors(coinErrors);
															} else {
																setErrors([]);
																setFloatAmount(toFloatAmount.toString());
															}
														} else if (props.network === "cusd") {
															let coinErrors = [];
															if (toFloatAmount < 10) {
																coinErrors.push("Minimum withdrawal is 10  ");
																setErrors(coinErrors);
															} else {
																setErrors([]);
																setFloatAmount(toFloatAmount);
															}
														} else if (props.network === "ethereum") {
															let coinErrors = [];
															if (toFloatAmount < 0.001) {
																coinErrors.push(
																	"Minimum withdrawal is 0.005  "
																);
																setErrors(coinErrors);
															} else {
																setErrors([]);
																setFloatAmount(toFloatAmount.toString());
															}
														} else if (props.network === "naira") {
															let coinErrors = [];
															if (toFloatAmount < 1000) {
																coinErrors.push("Minimum withdrawal is 1000  ");
																setErrors(coinErrors);
															} else {
																setErrors([]);
																setFloatAmount(toFloatAmount.toString());
															}
														}
													}}
												/>

												<Box textAlign={"left"}>
													{errors.length > 0 && (
														<Text my={"2"} color={"red"} fontSize={"xs"}>
															{errors[0]}
														</Text>
													)}
												</Box>
											</Box>
											<Input
												name="receiver_address"
												placeholder="Receiver address"
												{...register("receiver_address")}
												required
											/>

											<Button
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
												isLoading={isLoading}
												type="Submit"
											>
												{" "}
												Send
											</Button>
										</VStack>
									</form>
								) : (
									""
								)}

								{/* <Input
                  required
                  value={withdrawAmount}
                  onChange={(e) => {
                    let amount = e.target.value.split("");

                    for (let index = 0; index < amount.length; index++) {
                      const element = amount[index];
                      if (isNaN(element)) {
                        amount.pop(element);
                      }
                    }
                    console.log(amount);
                    let joinedAmount = amount.join("");
                    if (!isNaN(joinedAmount)) {
                      setWithdrawAmount(parseFloat(joinedAmount));
                    } else setWithdrawAmount(0);

                    console.log(withdrawAmount);
                  }}
                /> */}
							</Box>
							<PayoutModal isOpen={bankModalisOpen} onClose={bankModalClose} />
							<WithdrawalModal
								isOpen={withdrawalisOpen}
								onClose={withdrawalModalClose}
							/>
						</DrawerBody>
					</>
				)}
				{props.page === "swap" && (
					<>
						<DrawerHeader
							color={"brand.700"}
							textAlign={"center"}
							textTransform={"uppercase"}
						>
							Swap {props.network} to NGN
						</DrawerHeader>
						<DrawerBody>
							<Box width={"full"} textAlign={"center"} mt={"100px"}>
								<form
									onSubmit={handleSubmit(SwapToNaira)}
									style={{ width: "100%" }}
								>
									<VStack gap={"20px"}>
										{/* <Input
                      name="amount"
                      type={"text"}
                      placeholder="Amount"
                      {...register("amount", {
                        onChange: (e) => {
                          console.log(e.target.value.toLocaleString("en-US"));
                        },
                      })}
                      required
                    /> */}
										<Box
											width={"full"}
											background={"#d7eff4"}
											pt={"20px"}
											px={"10px"}
											borderRadius={"lg"}
										>
											<VStack
												width={"full"}
												gap={"10px"}
												alignItems={"flex-start"}
											>
												<Text
													fontSize={"xs"}
													fontWeight={"semibold"}
													color={"gray.600"}
												>
													From
												</Text>
												<HStack
													width={"full"}
													gap={"5px"}
													borderRadius={"5px"}
													padding={"6px 2px"}
												>
													<Select
														bg={"#fff"}
														borderRadius={"full"}
														width={"120px"}
														height={"40px"}
														size={"sm"}
														border={0}
													>
														<option value={`${props.network}`}>
															{props.network}
														</option>
													</Select>
													<NumericFormat
														value={withdrawAmount}
														placeholder="0.00"
														required
														allowLeadingZeros
														thousandSeparator=","
														style={{
															width: "100%",
															outline: "0px",
															border: "none",
															background: "none",
															padding: "6px 14px",
															borderRadius: "5px",
															fontSize: "22px",
														}}
														onChange={async (e) => {
															let amount = e.target.value;
															let toFloatAmount;
															const rate = await fetchNairaRate(
																props.network.toLowerCase()
															);

															toFloatAmount = parseFloat(
																amount.replaceAll(",", "")
															).toFixed(7);

															let balanceError = [];

															//  setExchangeRate(rate * toFloatAmount);
															setExchangeRate(Math.round(toFloatAmount * rate));
															if (toFloatAmount > parseFloat(props.balance)) {
																balanceError.push("Insufficient balance");
																setErrors(balanceError);
															} else {
																if (props.network === "btc") {
																	let btcErrors = [];

																	if (toFloatAmount < 0.0005) {
																		btcErrors.push("Minimum amount is 0.0005 ");
																		setErrors(btcErrors);
																	} else {
																		setErrors([]);
																		setFloatAmount(toFloatAmount.toString());
																	}
																} else if (props.network === "celo") {
																	let coinErrors = [];
																	if (toFloatAmount < 5) {
																		coinErrors.push("Minimum amount is 5");
																		setErrors(coinErrors);
																	} else {
																		setErrors([]);
																		setFloatAmount(toFloatAmount.toString());
																	}
																} else if (props.network === "ceur") {
																	let coinErrors = [];

																	if (toFloatAmount < 5) {
																		coinErrors.push("Minimum amount is 5  ");
																		setErrors(coinErrors);
																	} else {
																		setErrors([]);
																		setFloatAmount(toFloatAmount.toString());
																	}
																} else if (props.network === "usdt_tron") {
																	let coinErrors = [];

																	if (toFloatAmount < 5) {
																		coinErrors.push("Minimum amount is 5 ");
																		setErrors(coinErrors);
																	} else {
																		setErrors([]);
																		setFloatAmount(toFloatAmount.toString());
																	}
																} else if (props.network === "tron") {
																	let coinErrors = [];

																	if (toFloatAmount < 5) {
																		coinErrors.push("Minimum amount is 5 ");
																		setErrors(coinErrors);
																	} else {
																		setErrors([]);
																		setFloatAmount(toFloatAmount.toString());
																	}
																} else if (props.network === "cusd") {
																	let coinErrors = [];
																	if (toFloatAmount < 5) {
																		coinErrors.push(
																			"Minimum withdrawal is 5  "
																		);
																		setErrors(coinErrors);
																	} else {
																		setErrors([]);
																		setFloatAmount(toFloatAmount);
																	}
																} else if (props.network === "eth") {
																	let coinErrors = [];
																	if (toFloatAmount < 0.001) {
																		coinErrors.push(
																			"Minimum withdrawal is 0.001  "
																		);
																		setErrors(coinErrors);
																	} else {
																		setErrors([]);
																		setFloatAmount(toFloatAmount.toString());
																	}
																}
															}
														}}
													/>
												</HStack>

												<Box textAlign={"left"}>
													{errors.length > 0 && (
														<Text my={"2"} color={"red"} fontSize={"xs"}>
															{errors[0]}
														</Text>
													)}
												</Box>
											</VStack>
										</Box>
										<Box
											padding={"10px"}
											bg={"#eff6f7"}
											cursor={"pointer"}
											borderRadius={"full"}
										>
											<MdSwapVert fontSize={"28px"} />
										</Box>
										<Box
											width={"full"}
											background={"#d7eff4"}
											pt={"20px"}
											px={"10px"}
											borderRadius={"lg"}
										>
											<VStack
												width={"full"}
												gap={"10px"}
												alignItems={"flex-start"}
											>
												<Text
													fontSize={"xs"}
													fontWeight={"semibold"}
													color={"gray.600"}
												>
													To
												</Text>
												<HStack
													width={"full"}
													gap={"5px"}
													borderRadius={"5px"}
													padding={"6px 2px"}
												>
													<Select
														bg={"#fff"}
														borderRadius={"full"}
														width={"120px"}
														height={"40px"}
														size={"sm"}
														border={0}
													>
														<option value={`naira`}>NGN</option>
													</Select>
													<NumericFormat
														value={exchangeRate}
														placeholder="0.00"
														required
														allowLeadingZeros
														thousandSeparator=","
														disabled
														style={{
															width: "100%",
															outline: "0px",
															border: "none",
															background: "none",
															padding: "6px 14px",
															borderRadius: "5px",
															fontSize: "22px",
															cursor: "not-allowed",
														}}
													/>
												</HStack>

												<Box textAlign={"left"}>
													{errors.length > 0 && (
														<Text my={"2"} color={"red"} fontSize={"xs"}></Text>
													)}
												</Box>
											</VStack>
										</Box>
										<Box width={"full"} height={"40px"}></Box>
										<Button
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
											mt={"10px"}
											size={"lg"}
											isLoading={isLoading}
											disabled={errors.length > 0 ? true : false}
											type="Submit"
										>
											Swap
										</Button>
										<Link
											to={"/swap-history"}
											style={{ textDecoration: "underline", color: "GrayText" }}
										>
											View History
										</Link>
									</VStack>
								</form>
								{/* <Input
                  required
                  value={withdrawAmount}
                  onChange={(e) => {
                    let amount = e.target.value.split("");

                    for (let index = 0; index < amount.length; index++) {
                      const element = amount[index];
                      if (isNaN(element)) {
                        amount.pop(element);
                      }
                    }
                    console.log(amount);
                    let joinedAmount = amount.join("");
                    if (!isNaN(joinedAmount)) {
                      setWithdrawAmount(parseFloat(joinedAmount));
                    } else setWithdrawAmount(0);

                    console.log(withdrawAmount);
                  }}
                /> */}
							</Box>
						</DrawerBody>
					</>
				)}
			</DrawerContent>
		</Drawer>
	);
};

const WithdrawalModal = (props) => {
	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent py={"40px"}>
				<ModalHeader textAlign={"center"}>Withdrawal Processing</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack width={"full"} alignItems={"center"} gap={"20px"}>
						<Image
							src="/assets/images/withdrawal-success.gif"
							width={"200px"}
							filter={"grayscale(1)"}
						/>
						<Text textAlign={"center"}>
							Your withdrawal is being processed. It should arrive in your
							account in
						</Text>
						<Countdown date={Date.now() + 900000} renderer={renderer} />,
						<Button
							borderRadius={"none"}
							background={
								" linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)"
							}
							_hover={{
								background:
									"linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
							}}
							variant={"solid"}
							onClick={() => {
								props.onClose();
							}}
						>
							I have received payment
						</Button>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

const Completionist = () => <span>You are good to go!</span>;

const renderer = ({ hours, minutes, seconds, completed }) => {
	if (completed) {
		// Render a complete state
		return <Completionist />;
	} else {
		// Render a countdown
		return (
			<HStack>
				<Text
					borderRadius={"10px"}
					bg={"brand.400"}
					textAlign={"center"}
					width={"50px"}
					py={"10px"}
				>
					{hours}
				</Text>
				<Text>:</Text>
				<Text
					borderRadius={"10px"}
					bg={"brand.400"}
					textAlign={"center"}
					width={"50px"}
					py={"10px"}
				>
					{minutes}
				</Text>
				<Text>:</Text>
				<Text
					borderRadius={"10px"}
					bg={"brand.400"}
					textAlign={"center"}
					width={"50px"}
					py={"10px"}
				>
					{seconds}
				</Text>
			</HStack>
		);
	}
};

export default Wallet;
