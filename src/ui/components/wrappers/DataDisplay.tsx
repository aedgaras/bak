import { Divider, HStack, Skeleton, VStack } from "@chakra-ui/react";
import { BackButton } from "../navigation/BackButton";
import { BoxWithShadow } from "./BoxWithShadow";

export const DataDisplay = ({
  isLoaded,
  element,
  backButton,
}: {
  isLoaded: boolean;
  element: JSX.Element;
  backButton?: boolean;
}) => {
  return (
    <Skeleton isLoaded={isLoaded}>
      <BoxWithShadow>
        <VStack p={1} divider={<Divider />}>
          {!backButton ? (
            <HStack w={"100%"}>
              <BackButton />
            </HStack>
          ) : null}

          <>{element}</>
        </VStack>
      </BoxWithShadow>
    </Skeleton>
  );
};
