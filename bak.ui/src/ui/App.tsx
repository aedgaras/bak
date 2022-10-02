import { ChakraProvider, theme } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { Route, Routes } from "react-router-dom";
import { UserApp } from "./UserApp";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserApp />} />
    </Routes>
  );
};
