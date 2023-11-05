import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import {
  Button,
  Flex,
  VStack,
  Image,
  Text,
  SimpleGrid,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Box,
  Textarea,
  useToast,
  Spinner,
  Checkbox,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useWallets from "../../../Hooks/useWallets";
import { RxCardStack, RxPlus } from "react-icons/rx";
import { MdRedeem } from "react-icons/md";
import DashboardLayout from "../../../Components/DashboardLayout";

function Create() {
  const { userWallets } = useWallets();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const toast = useToast();
  const [confetti, setConfitti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const options = {
    headers: { "x-api-key": process.env.REACT_APP_RATE_KEY },
  };

  const [fee, setFee] = useState(0);
  const [amountMin, setAmountMin] = useState(0.0003);
  const [balance, setBalance] = useState(0);
  const [showBalance, setShowBalance] = useState("");
  const [isNaira, setIsNaira] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState();
  const [checkEmail, setCheckEmail] = useState(false);
  const [dollarAmount, setDollarAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [ribbonAmount, setRibbonAmount] = useState(0);
  // const fetchWallets = async () => {
  //   await axios
  //     .get(`${process.env.REACT_APP_BASE_URL}wallets/`, {
  //       headers: {
  //         Authorization: `Token ${localStorage.getItem("token")}`,
  //       },
  //     })
  //     .then(function (response) {
  //       if (response.data) {
  //         console.log(response.data);
  //         const entries = Object.entries(response.data);
  //         console.log(entries);
  //         setIsLoading(false);

  //         setWallets(entries);
  //         localStorage.setItem("wallets", JSON.stringify(entries));
  //       }
  //     })
  //     .catch(function (error) {});
  // };
  const fetchRate = async (network) => {
    if (network !== "naira") {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}swap/get_usdt/${network}`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setRate(response.data);
        })
        .catch((error) => {});
    } else {
      setRate(1);
    }
  };

  const handleCurrencyChange = async (e) => {
    const network = `${e.target.value}`;

    for (let index = 0; index < userWallets.length; index++) {
      if (userWallets[index][0] === network) {
        setBalance(userWallets[index][1].balance.availableBalance);

        if (network === "btc") {
          setIsNaira(false);

          await axios
            .post(
              "https://api.tatum.io/v3/tatum/rate/",
              [{ batchId: "one", basePair: "USD", currency: "BTC" }],
              options
            )
            .then((response) => {
              setAmountMin(
                parseFloat(100.0 / parseFloat(response.data[0].value))
              );
              setFee(0.0008);
              setTotalAmount(parseFloat(getValues("amount")) + 0.0008);
            })
            .catch((errors) => {
              toast({ title: "Error Fetching Fees", status: "warning" });
            });
        } else if (network === "celo") {
          setIsNaira(false);

          setFee(1);
          setAmountMin(10);
          setTotalAmount(parseFloat(getValues("amount")) + fee);
        } else if (network === "ethereum") {
          setIsNaira(false);

          setAmountMin(0.003);
          setFee(0.0004);
          setTotalAmount(parseFloat(getValues("amount")) + fee);
        } else if (network === "tron") {
          setIsNaira(false);

          setFee(1);
          setAmountMin(5);
          setTotalAmount(parseFloat(getValues("amount")) + fee);
        } else if (network === "naira") {
          setFee(100);
          setAmountMin(1000);
          setIsNaira(true);
          setTotalAmount(parseFloat(getValues("amount")) + fee);
        }
      }
      setTotalAmount(parseFloat(getValues("amount")) + fee);
    }
    await fetchRate(e.target.value);
  };
  const fetchCardTemplates = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}gift_cards/images`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setTemplatesLoading(false);
        setTemplates(response.data.results);
        setTemplate({
          link: "/assets/images/bitgifty-birthday01.jpg",
          // link: response.data.results[0].link,
          id: response.data.results[0].id,
        });
      })
      .catch((error) => {
        toast({ title: "Error fetching templates" });
      });
  };
  const onSubmit = async (data) => {
    data.image = template.id;
    data.amount = parseFloat(data.amount);
    data.quantity = 1;

    setIsLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}gift_cards/v2/create/`, data, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        setIsLoading(false);
        toast({
          title: "Giftcard created, check `My cards to view giftcard`",
          position: "top",
          status: "success",
        });
        setConfitti(true);
        setTimeout(() => {
          setConfitti(false);
          navigate("/giftcard/cards");
        }, 5000);
      })
      .catch(function (error) {
        if (error.response?.status === 400) {
          toast({ title: "Error", status: "error" });
        }

        setIsLoading(false);
      });
  };
  const handleWindowResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };
  useEffect(() => {
    window.onresize = () => handleWindowResize();
    fetchCardTemplates();
  }, []);
  useEffect(() => {
    setTotalAmount(parseFloat(getValues("amount")) + fee);
  }, [fee, totalAmount, getValues]);
  return (
    <DashboardLayout>
      {confetti && (
        <Box width={"full"}>
          <Confetti width={windowSize.width} height={windowSize.height} />
        </Box>
      )}
      <Flex
        height={"50px"}
        gap={5}
        my={"20px"}
        px={"6px"}
        display={["flex", "flex", "none"]}
      >
        <Button
          borderRadius={"none"}
          rightIcon={<RxPlus />}
          background={
            " linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)"
          }
          onClick={() => {}}
          variant={"solid"}
          size={["md", "md", "lg"]}
        >
          Create
        </Button>

        <Button
          onClick={() => {
            navigate("/giftcard/redeem");
          }}
          size={["md", "md", "lg"]}
          rightIcon={<MdRedeem />}
          variant={"outline"}
          borderRadius={"none"}
        >
          Reedeem
        </Button>

        <Button
          onClick={() => {
            navigate("/giftcard/cards");
          }}
          size={["md", "md", "lg"]}
          variant={"outline"}
          rightIcon={<RxCardStack />}
          borderRadius={"none"}
        >
          My Cards
        </Button>
      </Flex>
      <Flex
        width={"full"}
        my={0}
        flexDir={["column", "column", "row"]}
        gap={["20px", "20px", 0]}
        flexWrap={["wrap", "wrap", "nowrap"]}
      >
        <VStack
          width={"full"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"5"}
          flex={"1"}
          background={"brand.700"}
          px={"10px"}
          pt={"10px"}
          mt={[2, 2, 0]}
          height={["700px", "700px", "90vh"]}
          overflow={"scroll"}
          borderTop={[0, 0, "2px solid #38c7e7"]}
        >
          {templatesLoading ? (
            <Spinner />
          ) : templates.length > 0 ? (
            <VStack
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition="5s"
              height={"416px"}
              width={["350px", "350px", "400px"]}
              bg={"url(/assets/images/cardbg.png)"}
              bgRepeat={"no-repeat"}
              position={"relative"}
              padding={"3px"}
            >
              <Image
                src={`${template.link}`}
                width={["350px", "350px", "320px"]}
                height={"338px"}
                // objectFit={"cover"}
                position={"absolute"}
                left={["6%", "6%", "10%"]}
                top={"10%"}
              />
            </VStack>
          ) : (
            "No template"
          )}

          <HStack
            width={"194px"}
            justifyContent={"center"}
            position={"relative"}
            display={["none", "none", "flex"]}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="218"
              height="95"
              viewBox="0 0 218 95"
              fill="none"
            >
              <g filter="url(#filter0_d_1002_1971)">
                <path
                  d="M12 4H206C206 4 183.874 24.3 184.5 41C185.089 56.6988 206 75 206 75H12C12 75 30.4648 56.201 31 41C31.5715 24.7669 12 4 12 4Z"
                  fill="#103D96"
                />
                <path
                  d="M202.333 5.5C202.061 5.77935 201.771 6.07886 201.467 6.3974C199.376 8.58948 196.591 11.6917 193.822 15.3288C191.056 18.9615 188.283 23.1581 186.236 27.5385C184.195 31.9074 182.832 36.5539 183.001 41.0562C183.16 45.2861 184.678 49.598 186.777 53.6283C188.882 57.6698 191.616 61.5149 194.306 64.8318C196.998 68.1525 199.669 70.9707 201.665 72.9581C201.854 73.1462 202.037 73.3269 202.213 73.5H15.4195C15.6124 73.2821 15.8146 73.0517 16.0253 72.8095C17.7878 70.783 20.1453 67.9187 22.5226 64.5684C27.2223 57.9452 32.2147 49.1299 32.4991 41.0528C32.8029 32.422 27.7978 22.8223 22.9618 15.5796C20.5148 11.9149 18.0528 8.76943 16.2035 6.54063C15.8941 6.16772 15.6016 5.82023 15.329 5.5H202.333Z"
                  stroke="white"
                  strokeWidth="3"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_1002_1971"
                  x="0"
                  y="0"
                  width="218"
                  height="95"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="8" />
                  <feGaussianBlur stdDeviation="6" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_1002_1971"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_1002_1971"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <HStack
              position={"absolute"}
              width={"194px"}
              height={"71px"}
              pb={"10px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                fontSize={"24px"}
                fontStyle={"700"}
                color={"#fff"}
                width={"full"}
                textAlign={"center"}
              >
                {ribbonAmount}
              </Text>
            </HStack>
          </HStack>

          {/* <Text color={"brand.700"} fontSize={"lg"} fontWeight={700}>
            Giftcard Designs
          </Text>
          <SimpleGrid columns={3} spacing="4">
            {templatesLoading ? (
              <Spinner />
            ) : templates.length > 0 ? (
              templates.map((image) => {
                return (
                  <Image
                    key={image.id}
                    src={`${image.link}`}
                    style={{
                      width: "127px",
                      height: "117px",
                      borderRadius: "16px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border:
                        image.link === template.link ? "1px solid blue" : "",
                    }}
                    _hover={{ border: "1px solid blue" }}
                    onClick={() => {
                      setTemplate({ link: image.link, id: image.id });
                    }}
                  />
                );
              })
            ) : (
              <Text>No template available</Text>
            )}
          </SimpleGrid> */}
        </VStack>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%", flex: "2" }}
        >
          <VStack
            padding={["10px 10px 50px 10px", "10px 10px 50px 10px", "10px"]}
            color={"brand.600"}
            gap="10"
            width={["full", "full", "70%"]}
            mx={"auto"}
            alignItems={"flex-start"}
          >
            <Flex height={"50px"} gap={5} display={["none", "none", "flex"]}>
              <Button
                borderRadius={"none"}
                rightIcon={<RxPlus />}
                background={
                  " linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)"
                }
                _hover={{
                  background:
                    "linear-gradient(106deg, #103D96 27.69%, #306FE9 102.01%)",
                }}
                variant={"solid"}
                size={"lg"}
              >
                Create
              </Button>

              <Button
                onClick={() => {
                  navigate("/giftcard/redeem");
                }}
                size="lg"
                rightIcon={<MdRedeem />}
                variant={"outline"}
                borderRadius={"none"}
              >
                Reedeem
              </Button>

              <Button
                onClick={() => {
                  navigate("/giftcard/cards");
                }}
                size="lg"
                variant={"outline"}
                rightIcon={<RxCardStack />}
                borderRadius={"none"}
              >
                My Cards
              </Button>
            </Flex>
            <FormControl>
              <FormLabel>Select your gift card design</FormLabel>
              <HStack
                columns={4}
                gap={"4px"}
                width={["full", "full", "500px"]}
                overflowX={"scroll"}
              >
                {templatesLoading ? (
                  <Spinner />
                ) : templates.length > 0 ? (
                  templates.map((image, index) => {
                    return (
                      <Box key={index}>
                        <HStack
                          width={"100px"}
                          height={"70px "}
                          key={image.id}
                          bgImage={`url(${image.link})`}
                          backgroundSize={"contain"}
                          backgroundPosition={"center"}
                          borderRadius={"base"}
                          cursor={"pointer"}
                          border={
                            image.link === template.link ? "1px solid #fff" : ""
                          }
                          _hover={{ border: "1px solid blue" }}
                          onClick={() => {
                            setTemplate({ link: image.link, id: image.id });
                          }}
                        ></HStack>
                      </Box>
                    );
                  })
                ) : (
                  <Text>No template available</Text>
                )}
              </HStack>
            </FormControl>
            <HStack
              width={"full"}
              flexDir={["column", "column", "row"]}
              alignItems={"flex-start"}
              gap={"20px"}
            >
              <FormControl width={"full"}>
                <FormLabel>Select Currency</FormLabel>
                <Select
                  textTransform={"capitalize"}
                  required
                  name="currency"
                  {...register("currency", { onChange: handleCurrencyChange })}
                >
                  <option>Select Coin</option>;
                  {userWallets.map((wallet, index) => {
                    return (
                      <option value={wallet[0]} key={index}>
                        <Text textTransform={"capitalize"}>{wallet[0]}</Text>
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <VStack
                marginInlineStart={"0 !important"}
                width="full"
                alignItems="flex-start"
              >
                <FormControl isInvalid={errors.amount}>
                  <HStack
                    width={"full"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <FormLabel>Enter Amount</FormLabel>
                    <Text mt={"20px"} fontSize={"sm"}>
                      {isNaira ? "N" : "$"}
                      {isNaN(dollarAmount) ? 0 : dollarAmount.toFixed(2)}
                    </Text>
                  </HStack>

                  <Input
                    required
                    name="amount"
                    type={"text"}
                    {...register("amount", {
                      onChange: (e) => {
                        setTotalAmount(parseFloat(e.target.value) + fee);
                        setDollarAmount(parseFloat(e.target.value) * rate);
                        setRibbonAmount(e.target.value);
                      },
                      max: { value: balance, message: "Insufficient funds" },
                      min: {
                        value: amountMin,
                        message: `Minimum amount is ${amountMin}`,
                      },
                    })}
                  />

                  <FormErrorMessage>
                    {errors.amount && errors.amount.message}
                  </FormErrorMessage>
                </FormControl>
                {/* <Flex
                justifyContent={"space-between"}
                width="full"
                color={"brand.tx1"}
              >
                <Box
                  sx={{
                    py: "12px",
                    px: "24px",
                    textAlign: "center",
                    bg: "brand.200",
                    borderRadius: "4px",
                  }}
                >
                  25%
                </Box>
                <Box
                  sx={{
                    py: "12px",
                    px: "24px",
                    textAlign: "center",
                    bg: "brand.200",
                    borderRadius: "4px",
                  }}
                >
                  50%
                </Box>
                <Box
                  sx={{
                    py: "12px",
                    px: "24px",
                    textAlign: "center",
                    bg: "brand.200",
                    borderRadius: "4px",
                  }}
                >
                  75%
                </Box>
                <Box
                  sx={{
                    py: "12px",
                    px: "24px",
                    textAlign: "center",
                    bg: "brand.200",
                    borderRadius: "4px",
                  }}
                >
                  100%
                </Box>
              </Flex> */}
                <Flex color="brand.300" gap={2}>
                  <Text fontSize={"sm"}>Wallet Balance:</Text>
                  <Text fontSize={"sm"}>{balance}</Text>
                </Flex>
              </VStack>
            </HStack>

            <HStack
              width={"full"}
              flexDir={["column", "column", "row"]}
              alignItems={"flex-start"}
              gap={"20px"}
            >
              <FormControl>
                <FormLabel>Note (optional)</FormLabel>
                <Textarea
                  name="note"
                  background={"brand.50"}
                  {...register("note")}
                />
              </FormControl>
              {checkEmail ? (
                <FormControl>
                  <FormLabel>Receipent Email</FormLabel>
                  <Input
                    placeholder="friend@mail.com"
                    type="email"
                    name="note"
                    required
                    background={"brand.50"}
                    {...register("receipent_email")}
                  />
                </FormControl>
              ) : (
                ""
              )}
            </HStack>

            <Checkbox onChange={() => setCheckEmail(!checkEmail)}>
              Send to receipient email
            </Checkbox>

            <Flex width={"full"} justifyContent="space-between">
              <VStack width={"full"} alignItems="flex-start">
                <Flex width={"full"} justifyContent={"space-between"}>
                  <Text fontSize={"xs"}>Fees</Text>
                  <Text fontSize={"xs"}>{fee}</Text>
                </Flex>
                <Flex width={"full"} justifyContent={"space-between"}>
                  <Text fontSize={"s"}>Total Amount</Text>
                  <Text fontSize={"s"}>
                    {" "}
                    {isNaN(totalAmount) ? 0 : totalAmount}
                  </Text>
                </Flex>
              </VStack>
              <Box textAlign={"right"} width={"full"}>
                <Button
                  isLoading={isLoading}
                  type="submit"
                  size={"lg"}
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
                  Create {checkEmail && ` & Send`}
                </Button>
              </Box>
            </Flex>
          </VStack>
        </form>
      </Flex>
    </DashboardLayout>
  );
}

export default Create;
