import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Select,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { update_employee } from "../../Redux/employee/action";
import axios from "axios";

const EditEmployee = ({ id, setOpenEditID }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const { employee } = useSelector((state) => state.employeeReducer);
  const [current, setCurrent] = useState({
    id_proof: "",
    address_proof: "",
    photo: "",
  });

  useEffect(() => {
    const filtered = employee.filter((item) => item._id === id);
    setCurrent(filtered[0]);
    onOpen();
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCurrent({ ...current, [id]: value });
  };
  console.log(current);

  const handleFileChange = async (e) => {
    const { id, files } = e.target;
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "dhvexfsd");
    formData.append("api_key", "df6bctdlx");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/df6bctdlx/image/upload",
        formData
      );
      setCurrent({ ...current, [`${id}_url`]: response.data.secure_url });
    } catch (error) {
      console.error("Error uploading file: ", error);
      toast({
        title: "Error uploading file.",
        description: "An error occurred while uploading the file.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    const formData = {
      _id: current._id,
      serial_no: current.serial_no,
      date: current.date,
      employee_id: current.employee_id,
      employee_name: current.employee_name,
      address: current.address,
      pincode: current.pincode,
      state: current.state,
      country: current.country,
      mobile_number: current.mobile_number,
      email_id: current.email_id,
      department: current.department,
      id_proof: current.id_proof,
      address_proof: current.address_proof,
      photo: current.photo,
      status: current.status,
    };

    dispatch(update_employee(formData))
      .then((res) => {
        toast({
          title: "Employee updated.",
          description: "The employee details have been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        setOpenEditID("");
        navigate("/employee");
      })
      .catch((err) => {
        toast({
          title: "Error updating employee.",
          description: "An error occurred while updating the employee details.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setOpenEditID("");
        navigate("/employee");
      }}
      size={"6xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Employee</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack gap={4} mt={12}>
            <form onSubmit={handleForm}>
              <Grid gridTemplateColumns={"repeat(3,1fr)"} gap={4}>
                <FormControl>
                  <FormLabel>Sr. No.</FormLabel>
                  <Input
                    type="text"
                    placeholder="Sr. No."
                    id="serial_no"
                    value={current.serial_no}
                    onChange={handleInputChange}
                    isReadOnly
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Date</FormLabel>
                  <Input
                    type="date"
                    placeholder="Date"
                    id="date"
                    value={current.date}
                    onChange={handleInputChange}
                    isReadOnly
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Employee Id</FormLabel>
                  <Input
                    type="text"
                    placeholder="Employee Id"
                    id="employee_id"
                    value={current.employee_id}
                    onChange={handleInputChange}
                    isReadOnly
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Employee Name"
                    id="employee_name"
                    value={current.employee_name}
                    onChange={handleInputChange}
                    isRequired
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Address</FormLabel>
                  <Input
                    type="text"
                    placeholder="Employee Address"
                    id="address"
                    value={current.address}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Pincode</FormLabel>
                  <Input
                    type="number"
                    placeholder="Pincode"
                    id="pincode"
                    value={current.pincode}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>State</FormLabel>
                  <Input
                    type="text"
                    placeholder="State"
                    id="state"
                    value={current.state}
                    onChange={handleInputChange}
                    isReadOnly
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Country</FormLabel>
                  <Input
                    type="text"
                    placeholder="Country"
                    id="country"
                    value={current.country}
                    onChange={handleInputChange}
                    isReadOnly
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Contact No</FormLabel>
                  <Input
                    type="number"
                    placeholder="Contact No."
                    id="mobile_number"
                    value={current.mobile_number}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email Id</FormLabel>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    id="email_id"
                    value={current.email_id}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Department</FormLabel>
                  <Select
                    id="department"
                    value={current.department}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Department</option>
                    <option value="Account">Account</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Production">Production</option>
                    <option value="Dispatch">Dispatch</option>
                    <option value="Sales">Sales</option>
                    <option value="Purchase">Purchase</option>
                    <option value="R&D">R&D</option>
                    <option value="HR">HR</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>ID Proof</FormLabel>
                  <Input
                    type="file"
                    id="id_proof"
                    onChange={handleFileChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Address Proof</FormLabel>
                  <Input
                    type="file"
                    id="address_proof"
                    onChange={handleFileChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>PhotoGraphs</FormLabel>
                  <Input type="file" id="photo" onChange={handleFileChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Status</FormLabel>
                  <Select
                    id="status"
                    value={current.status}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Status</option>
                    <option value="Working">Working</option>
                    <option value="Resign">Resign</option>
                  </Select>
                </FormControl>
                <Flex gap={2}>
                  <Button
                    as={Link}
                    to="/employee"
                    w={"fit-content"}
                    variant={"outline"}
                    onClick={() => {
                      onClose();
                      setOpenEditID("");
                      navigate("/employee");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    bg={"#319AF6"}
                    color={"white"}
                    w={"fit-content"}
                  >
                    Submit
                  </Button>
                </Flex>
              </Grid>
            </form>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditEmployee;
