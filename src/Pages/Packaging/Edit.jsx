import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  useToast,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { edit_purchase, update_purchase } from "../../Redux/purchase/action";
import useHandler from "../../hooks/useHandler";
import { Link, useNavigate, useParams } from "react-router-dom";
import { update_production } from "../../Redux/production/action";
import { update_packaging } from "../../Redux/packaging/action";

export const EditPackaging = ({ id, setOpenEditID }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  // const { id } = useParams();
  const { handleRes, handleError } = useHandler();
  const [current, setCurrent] = useState({});
  const { isLoading, error, packaging } = useSelector(
    (packaging) => packaging.packagingReducer
  );

  console.log(packaging);

  useEffect(() => {
    const filtered = packaging.filter((item) => {
      return item.packaging_id == id;
    });
    console.log(filtered);
    setCurrent(filtered[0]);
    onOpen();
  }, [id]);

  const handleForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const white_labeling = form.querySelector("#white_labeling").value;
    const printing = form.querySelector("#printing").value;
    const labeling_on_box = form.querySelector("#labeling_on_box").value;
    const dispatch_label = form.querySelector("#dispatch_label").value;

    let empty = "";

    switch (empty) {
      case white_labeling:
        empty = "White Labeling";
        break;
      case printing:
        empty = "Printing the packaging";
        break;
      case labeling_on_box:
        empty = "Labeling on box";
        break;
      case dispatch_label:
        empty = "Dispatch Label";
        break;
      default:
        break;
    }

    if (empty) {
      toast({
        title: empty + " is required",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const data = {
      packaging_id: id,
      white_labeling,
      printing,
      labeling_on_box,
      dispatch_label,
    };
    dispatch(update_packaging(data, handleRes, handleError))?.then((data) => {
      onClose();
      setOpenEditID("");
      navigate("/packaging");
    });
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={() => {
        onClose();
        setOpenEditID("");
        navigate("/packaging");
      }}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader sx={{ textAlign: "center" }}>Edit Packaging</DrawerHeader>

        <Stack alignItems={"center"} justifyContent={"center"}>
          <Stack gap={4} mt={5}>
            <form onSubmit={handleForm}>
              <Stack gap={4}>
                <Flex
                  sx={{
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Text sx={{ minWidth: "50%" }}>White Labeling</Text>
                  <Input
                    type="text"
                    placeholder="White Labeling"
                    id="white_labeling"
                    value={current.white_labeling}
                    onChange={(e) => {
                      setCurrent({
                        ...current,
                        white_labeling: e.target.value,
                      });
                    }}
                  />
                </Flex>
                <Flex
                  sx={{
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Text sx={{ minWidth: "50%" }}>Printing</Text>
                  <Input
                    type="text"
                    placeholder="Printing"
                    id="printing"
                    value={current.printing}
                    onChange={(e) => {
                      setCurrent({
                        ...current,
                        printing: e.target.value,
                      });
                    }}
                  />
                </Flex>
                <Flex
                  sx={{
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Text sx={{ minWidth: "50%" }}>Labeling on Box</Text>
                  <Input
                    type="text"
                    placeholder="Labeling on Box"
                    id="labeling_on_box"
                    value={current.labeling_on_box}
                    onChange={(e) => {
                      setCurrent({
                        ...current,
                        labeling_on_box: e.target.value,
                      });
                    }}
                  />
                </Flex>
                <Flex
                  sx={{
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Text sx={{ minWidth: "50%" }}>Dispatch Label</Text>
                  <Input
                    type="text"
                    placeholder="Dispatch Label"
                    id="dispatch_label"
                    value={current.dispatch_label}
                    onChange={(e) => {
                      setCurrent({
                        ...current,
                        dispatch_label: e.target.value,
                      });
                    }}
                  />
                </Flex>
                <Flex gap={2} justifyContent={"flex-end"} mt={5}>
                  <Button
                    as={Link}
                    to="/packaging"
                    w={"fit-content"}
                    variant={"outline"}
                    onClick={() => {
                      onClose();
                      setOpenEditID("");
                      navigate("/packaging");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    w={"fit-content"}
                    backgroundColor="#319AF6"
                    color="#fff"
                  >
                    Submit
                  </Button>
                </Flex>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </DrawerContent>
    </Drawer>
  );
};
