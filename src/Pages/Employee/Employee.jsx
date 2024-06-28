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
  ModalCloseButton,
  ModalContent,
  ModalHeader,
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
import { delete_employee, get_employee } from "../../Redux/employee/action";
import useHandler from "../../hooks/useHandler";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import EditEmployee from "./Edit";
import CreateEmployee from "./Create";

const Employee = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [openEditID, setOpenEditID] = useState(false);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [current, setCurrent] = useState(null);
  const { handleRes, handleError } = useHandler();
  const { isLoading, error, employee } = useSelector(
    (store) => store.employeeReducer
  );

  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  useEffect(() => {
    setEmployeeData(employee);
  }, [employee]);
  useEffect(() => {
    dispatch(get_employee(handleError));
  }, []);

  const handleDelete = () => {
    if (current) {
      dispatch(delete_employee(current, handleRes, handleError));
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
            Employee
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
            // to={"/employee/create"}
            onClick={onDrawerOpen}
          >
            <Plus style={{ marginRight: 4 }} />
            Create Employee
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
                <Th>Employee Id</Th>
                <Th>Name</Th>
                <Th>Address</Th>
                <Th>Pincode</Th>
                <Th>State</Th>
                <Th>Country</Th>
                <Th>Contact No</Th>
                <Th>Email Id</Th>
                <Th>Department</Th>
                <Th>ID Proof</Th>
                <Th>Address Proof</Th>
                <Th>PhotoGraphs</Th>
                <Th>Status</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employeeData.length > 0 &&
                employeeData.map((el, ind) => (
                  <Tr
                    key={ind}
                    sx={{
                      borderBottom:
                        ind !== employeeData?.length - 1 && "1px solid #696969",
                    }}
                  >
                    <Td textAlign="center">{el.serial_no}</Td>
                    <Td textAlign="center">{el.date}</Td>
                    <Td textAlign="center">{el.employee_id}</Td>
                    <Td textAlign="center">{el.employee_name}</Td>
                    <Td textAlign="center">{el.address}</Td>
                    <Td textAlign="center">{el.pincode}</Td>
                    <Td textAlign="center">{el.state}</Td>
                    <Td textAlign="center">{el.country}</Td>
                    <Td textAlign="center">{el.mobile_number}</Td>
                    <Td textAlign="center">{el.email_id}</Td>
                    <Td textAlign="center">{el.department}</Td>
                    <Td textAlign="center">{el.id_proof}</Td>
                    <Td textAlign="center">{el.address_proof}</Td>
                    <Td textAlign="center">{el.photo}</Td>
                    <Td textAlign="center">{el.status}</Td>
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
                          // to={`/employee/edit/${el.employee_id}`}
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
        <EditEmployee id={openEditID} setOpenEditID={setOpenEditID} />
      )}

      {/* drawer */}

      {/* <Drawer isOpen={isDrawerOpen} onClose={onDrawerClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <CreateEmployee onClose={onDrawerClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer> */}

      {/* Modal */}
      <Modal isOpen={isDrawerOpen} onClose={onDrawerClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <CreateEmployee onClose={onDrawerClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default Employee;
