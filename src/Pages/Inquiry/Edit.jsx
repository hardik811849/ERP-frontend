import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Grid,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit_inquiry } from "../../Redux/inquiry/action";
import useHandler from "../../hooks/useHandler";
import { Link, useNavigate } from "react-router-dom";

export const EditInquiry = ({ id, setOpenEditID }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { handleRes, handleError } = useHandler();
  const [current, setCurrent] = useState({});
  const { isLoading, error, inquiry } = useSelector(
    (store) => store.inquiryReducer
  );

  useEffect(() => {
    const filtered = inquiry.filter((item) => item._id == id);
    setCurrent(filtered[0]);
    onOpen();
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCurrent({ ...current, [id]: value });
  };

  const handleForm = (e) => {
    e.preventDefault();
    dispatch(edit_inquiry(current))
      .then((res) => {
        toast({
          title: "Inquiry updated.",
          description: "The inquiry has been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        setOpenEditID("");
        navigate("/inquiry");
      })
      .catch((err) => {
        handleError(err);
        toast({
          title: "Error updating inquiry.",
          description: "An error occurred while updating the inquiry.",
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
        navigate("/inquiry");
      }}
      size={"6xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Edit Inquiry</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack alignItems={"center"} justifyContent={"center"}>
            <Stack gap={4} mt={12}>
              <form onSubmit={handleForm}>
                <Grid gridTemplateColumns={"repeat(4,1fr)"} gap={4}>
                  <FormControl>
                    <FormLabel>Sr. No.</FormLabel>
                    <Input
                      type="text"
                      placeholder="Sr. No."
                      id="serial_no"
                      value={current.serial_no || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Date</FormLabel>
                    <Input
                      type="date"
                      placeholder="Date"
                      id="date"
                      value={current.date || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Inquiry No.</FormLabel>
                    <Input
                      type="text"
                      placeholder="Inquiry No."
                      id="inquiry_no"
                      value={current.inquiry_no || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Client Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Client Name"
                      id="client_name"
                      value={current.client_name || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Client Details</FormLabel>
                    <Input
                      type="text"
                      placeholder="Client Details"
                      id="client_details"
                      value={current.client_details || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Payment Terms</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter Payment Terms"
                      id="payment_terms"
                      value={current.payment_terms || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Validity of Inquiry</FormLabel>
                    <Input
                      type="text"
                      placeholder="Validity of Inquiry"
                      id="validity_of_inquiry"
                      value={current.validity_of_inquiry || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Delivery Time</FormLabel>
                    <Input
                      type="text"
                      placeholder="Delivery Time"
                      id="delivery_time"
                      value={current.delivery_time || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Inquiry Date</FormLabel>
                    <Input
                      type="date"
                      placeholder="Inquiry Date"
                      id="inquiry_date"
                      value={current.inquiry_date || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Item Id</FormLabel>
                    <Input
                      type="text"
                      placeholder="Item Id"
                      id="item_id"
                      value={current.item_id || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Product</FormLabel>
                    <Input
                      type="text"
                      placeholder="Product"
                      id="product"
                      value={current.product || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Item Description</FormLabel>
                    <Input
                      type="text"
                      placeholder="Item Description"
                      id="item_description"
                      value={current.item_description || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>HSN Code</FormLabel>
                    <Input
                      type="text"
                      placeholder="HSN Code"
                      id="hsn_code"
                      value={current.hsn_code || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Quantity</FormLabel>
                    <Input
                      type="number"
                      placeholder="Quantity"
                      id="quantity"
                      value={current.quantity || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Unit</FormLabel>
                    <Input
                      type="text"
                      placeholder="Unit"
                      id="unit"
                      value={current.unit || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Unit Price</FormLabel>
                    <Input
                      type="number"
                      placeholder="Unit Price"
                      id="unit_price"
                      value={current.unit_price || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Discount</FormLabel>
                    <Input
                      type="number"
                      placeholder="Discount"
                      id="discount"
                      value={current.discount || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Tax</FormLabel>
                    <Input
                      type="number"
                      placeholder="Tax"
                      id="tax"
                      value={current.tax || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Total Price</FormLabel>
                    <Input
                      type="number"
                      placeholder="Total Price"
                      id="total_price"
                      value={current.total_price || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Total Price with Tax</FormLabel>
                    <Input
                      type="number"
                      placeholder="Total Price with Tax"
                      id="total_price_with_tax"
                      value={current.total_price_with_tax || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Comments</FormLabel>
                    <Textarea
                      placeholder="Enter your comments"
                      id="comments"
                      value={current.comments || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Grid>
              </form>
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            as={Link}
            to="/inquiry"
            w="fit-content"
            variant="outline"
            onClick={() => {
              onClose();
              setOpenEditID("");
              navigate("/inquiry");
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            w="fit-content"
            backgroundColor="#319AF6"
            color="#fff"
            onClick={handleForm}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
