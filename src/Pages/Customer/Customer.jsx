import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout";
import { delete_customer, get_customer } from "../../Redux/customer/action";
import useHandler from "../../hooks/useHandler";

const Customer = () => {
  const [customerData, setCustomerData] = useState([]);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [current, setCurrent] = useState(null);
  const { handleRes, handleError } = useHandler();
  const { isLoading, error, customer } = useSelector(
    (store) => store.customerReducer
  );
  useEffect(() => {
    setCustomerData(customer);
  }, [customer]);
  useEffect(() => {
    dispatch(get_customer(handleError));
  }, []);

  const handleDelete = () => {
    if (current) {
      dispatch(delete_customer(current, handleRes, handleError));
    }
    onClose();
  };
  return (
    <Layout>
      <Flex
        justifyContent={"space-between"}
        gap={4}
        alignItems={"center"}
        mx={8}
      >
        <Text as={"h3"} fontSize={"3xl"} fontWeight={"bold"}>
          Customer
        </Text>
        <Input
          placeholder="Search"
          type="text"
          w={"fit-content"}
          border={"2px solid skyblue"}
        />
        <Button as={Link} to={"/customer/create"}>
          Create New
        </Button>
      </Flex>
      <Box mt={16}>
        <TableContainer>
          <Table variant="striped" colorScheme="blue" textAlign={"center"}>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Invoice Generation</Th>
                <Th>Expenses</Th>
                <Th>Price Prefix</Th>
                <Th>Client Update</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {customerData.length > 0 &&
                customerData.map((el, ind) => (
                  <Tr key={ind}>
                    <Td>{el.customer_id}</Td>
                    <Td>{el.invoice_generation}</Td>
                    <Td>{el.expenses}</Td>
                    <Td>{el.price_prefix}</Td>
                    <Td>{el.client_update}</Td>
                    <Td>
                      <Flex gap={4}>
                        <Button
                          as={Link}
                          to={`/customer/edit/${el.customer_id}`}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            setCurrent(el.customer_id);
                            onOpen();
                          }}
                        >
                          Delete
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody mb={4} textAlign={"center"}>
              <Heading as="h4" my={8} size="md">
                Are you sure you want to delete?
              </Heading>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Layout>
  );
};

export default Customer;
