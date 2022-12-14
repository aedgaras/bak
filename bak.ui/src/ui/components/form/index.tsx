import {
    Box,
    Button,
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
    placeholder,
}: {
    fieldName: string;
    fieldType: string;
    isRequired: boolean;
    errorField?: string;
    touchedField?: boolean;
    validation: (value: string) => string;
    placeholder?: string;
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
                placeholder={placeholder}
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

export const SubmitButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
    return (
        <Box p={2}>
            <Button type="submit" isLoading={isSubmitting} color="teal">
                Submit
            </Button>
        </Box>
    );
};
