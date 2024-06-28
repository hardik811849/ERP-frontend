import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { update_purchase } from "../../Redux/purchase/action";
import useHandler from "../../hooks/useHandler";

export const EditPurchase = ({ id, setOpenEditID }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { handleRes, handleError } = useHandler();
  const [current, setCurrent] = useState({});
  const { isLoading, error, purchase } = useSelector(
    (purchase) => purchase.purchaseReducer
  );

  useEffect(() => {
    const filtered = purchase.filter((item) => item._id == id);
    setCurrent(filtered[0]);
    onOpen();
  }, [id, purchase, onOpen]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCurrent({ ...current, [id]: value });
  };

  const handleForm = (e) => {
    e.preventDefault();
    dispatch(update_purchase(current))
      .then((res) => {
        toast({
          title: "Purchase updated.",
          description: "The Purchase has been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        setOpenEditID("");
        navigate("/purchase");
      })
      .catch((err) => {
        handleError(err);
        toast({
          title: "Error updating Purchase.",
          description: "An error occurred while updating the Purchase.",
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
        navigate("/purchase");
      }}
      size={"6xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Edit Purchase</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack alignItems={"center"} justifyContent={"center"}>
            <Stack gap={4} mt={12}>
              <form onSubmit={handleForm}>
                <Grid gridTemplateColumns={"repeat(3,1fr)"} gap={4}>
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
                      placeholder="Indent No."
                      id="indent_no"
                      value={current.indent_no || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Purchase Order No.</FormLabel>
                    <Input
                      type="text"
                      placeholder="Purchase Order No."
                      id="purchase_order_no"
                      value={current.purchase_order_no || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Vender Details</FormLabel>
                    <Input
                      type="text"
                      placeholder="Vender Details"
                      id="vender_details"
                      value={current.vender_details || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Delivery Date</FormLabel>
                    <Input
                      type="date"
                      placeholder="Delivery Date"
                      id="delivery_date"
                      value={current.delivery_date || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Payment Terms</FormLabel>
                    <Input
                      type="text"
                      placeholder="Payment Terms"
                      id="payment_terms"
                      value={current.payment_terms || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Store</FormLabel>
                    <Input
                      type="text"
                      placeholder="Store"
                      id="store"
                      value={current.store || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Item Id</FormLabel>
                    <Input
                      type="date"
                      placeholder="Item Id"
                      id="item_id"
                      value={current.item_id || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Item Details</FormLabel>
                    <Input
                      type="text"
                      placeholder="Item Details"
                      id="item_details"
                      value={current.item_details || ""}
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
                  <FormControl>
                    <FormLabel>Quantity</FormLabel>
                    <Input
                      type="text"
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
                  <FormControl isRequired>
                    <FormLabel>Tax Details</FormLabel>
                    <Input
                      type="text"
                      placeholder="Tax Details"
                      id="tax_details"
                      value={current.tax_details || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Price before Tax</FormLabel>
                    <Input
                      type="number"
                      placeholder="Price before Tax"
                      id="price_before_tax"
                      value={current.price_before_tax || ""}
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
                    <FormLabel>Terms and Conditions</FormLabel>
                    <Input
                      type="text"
                      placeholder="Terms and Conditions"
                      id="terms_and_conditions"
                      value={current.terms_and_conditions || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Comments</FormLabel>
                    <Input
                      type="text"
                      placeholder="Comments"
                      id="comments"
                      value={current.total_price || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Attachment</FormLabel>
                    <Input
                      type="number"
                      placeholder="Attachment"
                      id="attachments"
                      value={current.attachments || ""}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Grid>
                <ModalFooter>
                  <Button
                    as={Link}
                    to="/purchase"
                    w="fit-content"
                    variant="outline"
                    onClick={() => {
                      onClose();
                      setOpenEditID("");
                      navigate("/purchase");
                    }}
                    mx="4"
                  >
                    Cancel
                  </Button>
                  <Button colorScheme="blue" mr={3} type="submit">
                    Submit
                  </Button>
                </ModalFooter>
              </form>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
