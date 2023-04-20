import {
    Button,
    Center,
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Select,
    SimpleGrid,
    VStack,
} from '@chakra-ui/react';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { BoxWithShadow } from '../wrappers/BoxWithShadow';

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
    detailsSection,
    upperSection,
    innerForm,
}: {
    detailsSection?: JSX.Element;
    upperSection: string;
    innerForm: JSX.Element;
}) => {
    return (
        <SimpleGrid columns={[1, null, null, 2]} gap={4}>
            {detailsSection}
            <BoxWithShadow>
                <VStack>
                    <Heading size={'lg'} sx={{ p: 2 }}>
                        {upperSection}
                    </Heading>

                    {innerForm}
                </VStack>
            </BoxWithShadow>
        </SimpleGrid>
    );
};

export const SubmitButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
    const { t } = useTranslation();

    return (
        <Center p={2}>
            <Button type="submit" isLoading={isSubmitting} color="teal">
                {t('Form.Submit')}
            </Button>
        </Center>
    );
};
