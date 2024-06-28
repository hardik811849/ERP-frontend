import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Heading,
  Card,
  InputGroup,
  InputRightAddon,
  ButtonGroup,
  Divider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { delete_inquiry, get_inquiry } from "../../Redux/inquiry/action";
import useHandler from "../../hooks/useHandler";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { EditInquiry } from "./Edit";
import { CreateInquiry } from "./Create";

const Inquiry = () => {
  const [inquiryData, setInquiryData] = useState([]);
  const [openEditID, setOpenEditID] = useState(false);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [current, setCurrent] = useState(null);
  const { handleLoading, handleError } = useHandler();
  const { isLoading, error, inquiry } = useSelector(
    (store) => store.inquiryReducer
  );
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  useEffect(() => {
    if (isLoading) {
      handleLoading();
    }
    if (error != "") {
      handleError(error);
    }
    if (inquiry.length > 0) {
      setInquiryData(inquiry);
    }
  }, [isLoading, error, inquiry]);

  useEffect(() => {
    dispatch(get_inquiry());
  }, []);

  const handleDelete = () => {
    if (current) {
      dispatch(delete_inquiry(current, handleLoading, handleError));
    }
    onClose();
  };
  const styles = {
    tableHead: {
      textAlign: "center",
      textTransform: "none",
      fontSize: "14px",
    },
  };
  return (
    <Layout>
      <Card
        sx={{
          backgroundColor: "#FAFAFA",
          pb: 2,
          px: 5,
          mt: 10,
          border: "1px solid #d3d3d3",
          boxShadow: "none",
        }}
      >
        <Flex
          sx={{ justifyContent: "space-between", py: 1, alignItems: "center " }}
        >
          <Text as={"h3"} fontSize={"2xl"} fontWeight={400} color="#323232">
            Inquiry
          </Text>
          <Button
            sx={{
              backgroundColor: "#319AF6",
              color: "#fff",
              fontSize: "18px",
              fontWeight: 600,
              mt: 3,
            }}
            as={Link}
            // to={"/inquiry/create"}
            onClick={onDrawerOpen}
          >
            <Plus style={{ marginRight: 4 }} />
            Create Inquiry
          </Button>
        </Flex>
        <InputGroup size="sm" sx={{ mt: 5, mb: 5 }}>
          <Input
            placeholder="Search"
            type="text"
            w={"fit-content"}
            borderRight="none"
          />
          <InputRightAddon sx={{ backgroundColor: "#319AF6", border: "none" }}>
            <Search size={16} style={{ color: "#fff" }} />
          </InputRightAddon>
        </InputGroup>
        <TableContainer>
          <Table>
            <Thead>
              <Tr sx={{ backgroundColor: "#F1F5F9", fontWeight: 600 }}>
                <Th>Sr. No.</Th>
                <Th>Date</Th>
                <Th>Inquiry No.</Th>
                <Th>Client Name</Th>
                <Th>Total Price</Th>
                <Th>Total Price with Tax</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {inquiryData.length > 0 &&
                inquiryData.map((el, ind) => (
                  <Tr
                    key={ind}
                    sx={{
                      borderBottom:
                        ind !== inquiryData?.length - 1 && "1px solid #696969",
                    }}
                  >
                    <Td>{el.serial_no}</Td>
                    <Td>{el.date}</Td>
                    <Td>{el.inquiry_no}</Td>
                    <Td>{el.client_name}</Td>
                    <Td>{el.total_price}</Td>
                    <Td>{el.total_price_with_tax}</Td>
                    <Td>
                      <ButtonGroup
                        gap={0}
                        sx={{
                          backgroundColor: "#319AF6",
                          borderRadius: "4px !important",
                          my: -1,
                        }}
                      >
                        <Button
                          // as={Link}
                          // to={`/inquiry/edit/${el.inquiry_id}`}
                          onClick={() => {
                            setOpenEditID(el._id);
                          }}
                          sx={{
                            backgroundColor: "transparent",
                            ":hover": {
                              backgroundColor: "transparent",
                            },
                            px: 0,
                            py: 0,
                          }}
                        >
                          <Edit size={16} style={{ color: "#fff" }} />
                        </Button>
                        <Divider
                          my={1}
                          height="30px"
                          color={"white"}
                          orientation="vertical"
                        />
                        <Button
                          sx={{
                            backgroundColor: "transparent",
                            ":hover": {
                              backgroundColor: "transparent",
                            },
                            px: 0,
                            py: 0,
                          }}
                        >
                          <Trash2
                            size={16}
                            onClick={() => {
                              setCurrent(el._id);
                              onOpen();
                            }}
                            style={{ color: "#fff" }}
                          />
                        </Button>
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
      <Box mt={16}>
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
      {openEditID && (
        <EditInquiry id={openEditID} setOpenEditID={setOpenEditID} />
      )}

      {/* drawer */}

      {/* <Drawer isOpen={isDrawerOpen} onClose={onDrawerClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <CreateInquiry onClose={onDrawerClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer> */}

      <Modal isOpen={isDrawerOpen} onClose={onDrawerClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <CreateInquiry onClose={onDrawerClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default Inquiry;
