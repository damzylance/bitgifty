import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import SettingsLayout from "../SettingsLayout";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { AiFillPlusSquare } from "react-icons/ai";
import axios from "axios";
const Payout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [bankAccounts, setBankAccounts] = useState([]);
  const closeModal = () => {
    onClose();
    fetchBankAccounts();
  };
  const deleteBank = async (id) => {
    setLoading(true);
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}payouts/${id}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoading(false);
        fetchBankAccounts();
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const fetchBankAccounts = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}payouts/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBankAccounts(response.data.results);
        setLoading(false);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    fetchBankAccounts();
  }, []);

  return (
    <>
      <VStack width={"full"} gap={"20px"} alignItems={"flex-start"}>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          Payment/Withdrawal Methods
        </Text>
        <Box width={["full", "full", "80%", "70%"]}>
          <VStack gap={2} alignItems={"flex-start"}>
            <Text fontSize={"md"} color={"gray.700"}>
              Add Payment Method
            </Text>
            {loading ? (
              <Spinner />
            ) : bankAccounts.length > 0 ? (
              bankAccounts.map((bankAccount, index) => {
                const { bank_name, account_name, account_number, id } =
                  bankAccount;

                return (
                  <BankCard
                    key={index}
                    bank_name={bank_name}
                    account_name={account_name}
                    account_number={account_number}
                    action={() => deleteBank(id)}
                  />
                  // <VStack
                  //   width="full"
                  //   key={index}
                  //   gap={"10px"}
                  //   p={"20px"}
                  //   borderRadius={"lg"}
                  //   border={"1px solid #90d4e4"}
                  //   alignItems={"flex-start"}
                  //   position={"relative"}
                  // >
                  //   <Text
                  //     pl={"10px"}
                  //     lineHeight={"100%"}
                  //     color={"gray.600"}
                  //     fontWeight={"semibold"}
                  //     borderLeft={"2px solid #477FEB "}
                  //   >
                  //     {bankAccount.bank_name}
                  //   </Text>
                  //   <HStack
                  //     width={"full"}
                  //     alignItems={"center"}
                  //     justifyContent={"space-between"}
                  //   >
                  //     <Text color={"gray.500"}>{bankAccount.account_name}</Text>
                  //     <Text color={"gray.500"}>
                  //       {bankAccount.account_number}
                  //     </Text>
                  //   </HStack>

                  //   {bankAccount.toDelete === true ? (
                  //     <HStack position={"absolute"} top={0} right={2}>
                  //       <Button
                  //         _hover={{ bg: "red.500" }}
                  //         bg={"red.400"}
                  //         size={"xs"}
                  //         onClick={() => {
                  //           deleteBank(bankAccount.id);
                  //         }}
                  //       >
                  //         Confirm
                  //       </Button>
                  //       <Button
                  //         size={"xs"}
                  //         onClick={() => (bankAccount.toDelete = false)}
                  //       >
                  //         Cancel
                  //       </Button>
                  //     </HStack>
                  //   ) : (
                  //     <DeleteIcon
                  //       position={"absolute"}
                  //       top={0}
                  //       right={2}
                  //       color={"red.400"}
                  //       cursor={"pointer"}
                  //       aria-details="Delete account"
                  //       onClick={() => (bankAccount.toDelete = true)}
                  //     />
                  //   )}
                  // </VStack>
                );
              })
            ) : (
              <Text fontSize={"md"} color={"gray.700"}>
                You don't have a payment method. Please set one
              </Text>
            )}

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
                onOpen();
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
        </Box>
        <PayoutModal isOpen={isOpen} onClose={closeModal} />
      </VStack>
    </>
  );
};

export const PayoutModal = (props) => {
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  const [isloading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}payouts/`, data, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        setIsLoading(false);
        toast({
          title: "Bank added successfully",
          status: "success",
        });
        props.onClose();
      })
      .catch(function (error) {
        console.log(error)
        toast({ title: error.response.data.error||"An error occured", status: "error" });
        // if (error.response?.status === 400) {
        //   if (error.response?.data?.email) {
        //     toast({ title: "An error occured", status: "error" });
        //   }
        // }

        setIsLoading(false);
      });
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent py={"40px"}>
        <ModalHeader textAlign={"center"}>Set Payment Method</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack width={"full"} alignItems={"flex-start"} gap={"20px"}>
            <Text
              pl={"10px"}
              lineHeight={"100%"}
              color={"gray.600"}
              fontWeight={"semibold"}
              borderLeft={"2px solid #477FEB "}
            >
              Bank Transfer
            </Text>
            <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
              <VStack width={"full"} gap={"10px"} color={"gray.600"}>
                <FormControl>
                  <FormLabel>Account Name</FormLabel>
                  <Input
                    name="account_name"
                    {...register("account_name")}
                    required
                    placeholder={"John Doe"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Account Number</FormLabel>
                  <Input
                    name="number"
                    {...register("account_number")}
                    required
                    type="number"
                    minLength={"10"}
                    maxLength={"10"}
                    placeholder={"Account Number"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Bank name</FormLabel>
                  <Input
                    name="bank_name"
                    {...register("bank_name")}
                    required
                    placeholder={"Bank Name"}
                  />
                </FormControl>
              </VStack>
              <HStack width={"full"} mt={"40px"}>
                <Button
                  background={"gray.400"}
                  width={"full"}
                  size={"lg"}
                  _hover={{ bg: "gray.600" }}
                  onClick={props.onClose}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isloading}
                  width={"full"}
                  size={"lg"}
                  type="submit"
                >
                  Confirm
                </Button>
              </HStack>
            </form>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const BankCard = (props) => {
  const [toDelete, setToDelete] = useState();
  return (
    <VStack
      width="full"
      gap={"10px"}
      p={"20px"}
      borderRadius={"lg"}
      border={"1px solid #90d4e4"}
      alignItems={"flex-start"}
      position={"relative"}
    >
      <Text
        pl={"10px"}
        lineHeight={"100%"}
        color={"gray.600"}
        fontWeight={"semibold"}
        borderLeft={"2px solid #477FEB "}
      >
        {props.bank_name}
      </Text>
      <HStack
        width={"full"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text color={"gray.500"}>{props.account_name}</Text>
        <Text color={"gray.500"}>{props.account_number}</Text>
      </HStack>

      {toDelete === true ? (
        <HStack position={"absolute"} top={0} right={2}>
          <Button
            _hover={{ bg: "red.500" }}
            bg={"red.400"}
            size={"xs"}
            onClick={() => props.action(props.id)}
          >
            Confirm
          </Button>
          <Button size={"xs"} onClick={() => setToDelete(false)}>
            Cancel
          </Button>
        </HStack>
      ) : (
        <DeleteIcon
          position={"absolute"}
          top={0}
          right={2}
          color={"red.400"}
          cursor={"pointer"}
          aria-details="Delete account"
          onClick={() => setToDelete(true)}
        />
      )}
    </VStack>
  );
};

export default Payout;
