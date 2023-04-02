import { Spacer } from "@chakra-ui/react";
import { NavBar } from "../wrappers/NavBar";
import { LeftSideMenu } from "./LeftSideMenu";
import { RightSideMenu } from "./RightSideMenu";

export const NavigationMenu = () => {
  return (
    <NavBar
      element={
        <>
          <LeftSideMenu />
          <Spacer />
          <RightSideMenu />
        </>
      }
    />
  );
};
