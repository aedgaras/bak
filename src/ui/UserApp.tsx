import { Center, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { AppWrapper } from "./components/wrappers/AppWrapper";

export const UserApp = () => {
  const { t, i18n } = useTranslation();
  document.title = "Blossom HR";
  return (
    <AppWrapper
      children={
        <Center height={"100vh"}>
          <Heading lineHeight="tall">{t("Greetings.Hello")}</Heading>
        </Center>
      }
    />
  );
};
