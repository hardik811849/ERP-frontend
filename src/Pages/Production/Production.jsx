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
import {
  delete_production,
  get_production,
} from "../../Redux/production/action";
import useHandler from "../../hooks/useHandler";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { EditProduction } from "./Edit";
import { CreateProduction } from "./Create";

const Production = () => {
  const [productionData, setProductionData] = useState([]);
  const [openEditID, setOpenEditID] = useState(false);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [current, setCurrent] = useState(null);
  const { handleRes, handleError } = useHandler();
  const { isLoading, error, production } = useSelector(
    (store) => store.productionReducer
  );

  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  useEffect(() => {
    setProductionData(production);
  }, [production]);
  useEffect(() => {
    dispatch(get_production(handleError));
  }, []);

  const handleDelete = () => {
    if (current) {
      dispatch(delete_production(current, handleRes, handleError));
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
            Production
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
            // to={"/production/create"}
            onClick={onDrawerOpen}
          >
            <Plus style={{ marginRight: 4 }} />
            Create Production
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
                <Th sx={styles.tableHead}>Raw Product</Th>
                <Th sx={styles.tableHead}>Production Process</Th>
                <Th sx={styles.tableHead}>Final Check</Th>
                <Th sx={styles.tableHead}>Scraped</Th>
                <Th sx={styles.tableHead}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {productionData.length > 0 &&
                productionData.map((el, ind) => (
                  <Tr
                    key={ind}
                    sx={{
                      borderBottom:
                        ind !== productionData?.length - 1 &&
                        "1px solid #696969",
                    }}
                  >
                    <Td>{el.production_id}</Td>
                    <Td textAlign="center">{el.raw_product}</Td>
                    <Td textAlign="center">{el.production_process}</Td>
                    <Td textAlign="center">{el.final_check}</Td>
                    <Td textAlign="center">{el.scraped}</Td>
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
                          // to={`/production/edit/${el.production_id}`}
                          onClick={() => {
                            setOpenEditID(el.production_id);
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
                              setCurrent(el.production_id);
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
        <EditProduction id={openEditID} setOpenEditID={setOpenEditID} />
      )}

      {/* drawer */}

      <Drawer isOpen={isDrawerOpen} onClose={onDrawerClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {/* <DrawerHeader>Create a new Production</DrawerHeader> */}
          <DrawerBody>
            <CreateProduction onClose={onDrawerClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Layout>
  );
};

export default Production;
