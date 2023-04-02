import { Center, Divider, Heading, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const BaseExceptionPage = ({
  title,
  heading,
  statusCode,
  message,
}: {
  title: string;
  heading: string;
  statusCode?: number | string;
  message?: string;
}) => {
  document.title = title;

  return (
    <Center>
      <VStack spacing={2} divider={<Divider />}>
        {statusCode ? (
          <Heading>
            {statusCode} {heading}
          </Heading>
        ) : (
          <Heading>{heading}</Heading>
        )}
        {message ? <Text>{message}</Text> : null}
      </VStack>
    </Center>
  );
};

export const PageNotFound = ({ message }: { message?: string }) => {
  const { t } = useTranslation();

  return BaseExceptionPage({
    title: t("Page.Exception.NotFound"),
    heading: t("Page.Exception.NotFound"),
    statusCode: 404,
    message: message,
  });
};

export const Unauthorized = ({ message }: { message?: string }) => {
  const { t } = useTranslation();

  return BaseExceptionPage({
    title: t("Page.Exception.Unauthorized"),
    heading: t("Page.Exception.Unauthorized"),
    statusCode: 401,
    message: message,
  });
};
