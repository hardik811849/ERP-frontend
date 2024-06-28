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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { delete_store, get_store } from "../../Redux/store/action";
import useHandler from "../../hooks/useHandler";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { EditStore } from "./Edit";
import { CreateStore } from "./Create";

const Store = () => {
  const [storeData, setStoreData] = useState([]);
  const [openEditID, setOpenEditID] = useState(false);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [current, setCurrent] = useState(null);
  const { handleLoading, handleError } = useHandler();
  const { isLoading, error, store } = useSelector(
    (store) => store.storeReducer
  );
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  useEffect(() => {
    setStoreData(store);
  }, [store]);
  useEffect(() => {
    dispatch(get_store());
  }, []);

  const handleDelete = () => {
    if (current) {
      dispatch(delete_store(current, handleLoading, handleError));
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
            Store
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
            // to={"/store/create"}
            onClick={onDrawerOpen}
          >
            <Plus style={{ marginRight: 4 }} />
            Create Store
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
                <Th sx={{ textTransform: "none", fontSize: "14px" }}>ID</Th>
                <Th sx={styles.tableHead}>Ready Products</Th>
                <Th sx={styles.tableHead}>Product Placed Guide</Th>
                <Th sx={styles.tableHead}>Min Stock Level</Th>
                <Th sx={styles.tableHead}>Product Id</Th>
                <Th sx={styles.tableHead}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {storeData.length > 0 &&
                storeData.map((el, ind) => (
                  <Tr
                    key={ind}
                    sx={{
                      borderBottom:
                        ind !== storeData?.length - 1 && "1px solid #696969",
                    }}
                  >
                    <Td>{el.store_id}</Td>
                    <Td textAlign="center">{el.ready_products}</Td>
                    <Td textAlign="center">{el.product_placed_guide}</Td>
                    <Td textAlign="center">{el.minimum_stock_level}</Td>
                    <Td textAlign="center">{el.product_id}</Td>
                    <Td textAlign="center">
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
                          // to={`/store/edit/${el.store_id}`}
                          onClick={() => {
                            setOpenEditID(el.store_id);
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
                              setCurrent(el.store_id);
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
        <EditStore id={openEditID} setOpenEditID={setOpenEditID} />
      )}

      {/* drawer */}

      <Drawer isOpen={isDrawerOpen} onClose={onDrawerClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {/* <DrawerHeader>Create a new Store</DrawerHeader> */}
          <DrawerBody>
            <CreateStore onClose={onDrawerClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Layout>
  );
};

export default Store;
