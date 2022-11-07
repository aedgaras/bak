import {
    Box,
    Center,
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { Field } from 'formik';

export const GenericInput = ({
    fieldName,
    fieldType,
    isRequired,
    errorField,
    touchedField,
    validation,
}: {
    fieldName: string;
    fieldType: string;
    isRequired: boolean;
    errorField?: string;
    touchedField?: boolean;
    validation: (value: string) => string;
}) => {
    return (
        <FormControl
            isInvalid={!!errorField && touchedField}
            p={2}
            isRequired={isRequired}
        >
            <FormLabel>{fieldName}</FormLabel>
            <Field
                as={Input}
                type={fieldType}
                name={fieldName.toLowerCase()}
                validate={(value: string) => validation(value)}
            />

            <FormErrorMessage>
                <FormErrorIcon />
                {errorField}
            </FormErrorMessage>
        </FormControl>
    );
};

export const FormBox = ({
    upperSection,
    innerForm,
}: {
    upperSection: JSX.Element;
    innerForm: JSX.Element;
}) => {
    return (
        <VStack>
            <Center p={2}>
                <VStack>{upperSection}</VStack>
            </Center>
            <Box
                padding={2}
                borderWidth={1}
                borderRadius={'lg'}
                boxShadow={{
                    base: 'none',
                    sm: useColorModeValue('md', 'md-dark'),
                }}
            >
                <HStack>{innerForm}</HStack>
            </Box>
        </VStack>
    );
};
