import { Box } from "@chakra-ui/layout";
import React from "react";
import { NavigationMenu } from "./NavigationMenu";

type Props = {
  children: JSX.Element | string;
};

export const AppWrapper = ({ children }: Props): JSX.Element => {
  return (
    <Box padding={2}>
      <NavigationMenu />
      {children}
    </Box>
  );
};
