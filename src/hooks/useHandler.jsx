import React from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const useHandler = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const handleRes = (msg, nav) => {
    toast({
      title: msg,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    navigate(nav);
  };
  const handleLoading = (msg = "Loading...") => {
    toast({
      title: msg,
      status: "info",
      duration: 1000,
      isClosable: true,
    });
  };
  const handleError = (msg) => {
    toast({
      title: msg,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };
  return {
    handleRes,
    handleError,
    handleLoading,
  };
};

export default useHandler;
