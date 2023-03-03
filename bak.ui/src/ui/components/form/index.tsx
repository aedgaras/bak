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
    Select,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';

type InputType = {
    fieldTitle: string;
    fieldName: string;
    fieldType: string;
    isRequired: boolean;
    errorField?: string;
    touchedField?: boolean;
    validation: (value: string) => string;
    placeholder?: string;
};

export const GenericInput = ({
    fieldTitle,
    fieldName,
    fieldType,
    isRequired,
    errorField,
    touchedField,
    validation,
    placeholder,
}: InputType) => {
    const { t } = useTranslation();

    return (
        <FormControl
            isInvalid={!!errorField && touchedField}
            p={2}
            isRequired={isRequired}
        >
            <FormLabel>{t(`${fieldTitle}`)}</FormLabel>
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

export function GenericSelect<T extends string>({
    keys,
    fieldTitle,
}: {
    keys: T[];
    fieldTitle: string;
}) {
    const { t } = useTranslation();

    return (
        <FormControl p={2}>
            <FormLabel>{t(`${fieldTitle}`)}</FormLabel>
            <Select>
                {keys.map((key) => {
                    return (
                        <option value={key}>
                            {t(`Form.Select.Classification.${key}`)}
                        </option>
                    );
                })}
            </Select>
        </FormControl>
    );
}

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
    const { t } = useTranslation();

    return (
        <Box p={2}>
            <Button type="submit" isLoading={isSubmitting} color="teal">
                {t('Form.Submit')}
            </Button>
        </Box>
    );
};
