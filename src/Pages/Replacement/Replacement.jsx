import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
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
import {
  delete_replacement,
  get_replacement,
} from "../../Redux/replacement/action";
import useHandler from "../../hooks/useHandler";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { EditReplacement } from "./Edit";
import { CreateReplacement } from "./Create";

const Replacement = () => {
  const [replacementData, setReplacementData] = useState([]);
  const [openEditID, setOpenEditID] = useState(false);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [current, setCurrent] = useState(null);
  const { handleRes, handleError } = useHandler();
  const { isLoading, error, replacement } = useSelector(
    (store) => store.replacementReducer
  );

  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  useEffect(() => {
    setReplacementData(replacement);
  }, [replacement]);
  useEffect(() => {
    dispatch(get_replacement(handleError));
  }, []);

  const handleDelete = () => {
    if (current) {
      dispatch(delete_replacement(current, handleRes, handleError));
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
            Replacement
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
            // to={"/replacement/create"}
            onClick={onDrawerOpen}
          >
            <Plus style={{ marginRight: 4 }} />
            Create Replacement
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
                <Th sx={styles.tableHead}>Check Warranty</Th>
                <Th sx={styles.tableHead}>Fault Analysis</Th>
                <Th sx={styles.tableHead}>Client Receipt</Th>
                <Th sx={styles.tableHead}>Check Product</Th>
                <Th sx={styles.tableHead}>Client Update</Th>
                <Th sx={styles.tableHead}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {replacementData.length > 0 &&
                replacementData.map((el, ind) => (
                  <Tr
                    key={ind}
                    sx={{
                      borderBottom:
                        ind !== replacementData?.length - 1 &&
                        "1px solid #696969",
                    }}
                  >
                    <Td>{el.replacement_id}</Td>
                    <Td textAlign="center">{el.check_warranty}</Td>
                    <Td textAlign="center">{el.fault_analysis}</Td>
                    <Td textAlign="center">{el.client_receipt}</Td>
                    <Td textAlign="center">{el.check_product}</Td>
                    <Td textAlign="center">{el.client_update}</Td>
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
                          // to={`/replacement/edit/${el.replacement_id}`}
                          onClick={() => {
                            setOpenEditID(el.replacement_id);
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
                              setCurrent(el.replacement_id);
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
        <EditReplacement id={openEditID} setOpenEditID={setOpenEditID} />
      )}

      {/* drawer */}

      <Drawer isOpen={isDrawerOpen} onClose={onDrawerClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {/* <DrawerHeader>Create a new Store</DrawerHeader> */}
          <DrawerBody>
            <CreateReplacement onClose={onDrawerClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Layout>
  );
};

export default Replacement;
