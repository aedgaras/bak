import { Center, Divider, Heading, Text, VStack } from '@chakra-ui/react';

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

export const PageNotFound = ({ message }: { message?: string }) =>
    BaseExceptionPage({
        title: 'Page not found',
        heading: 'Page not found',
        statusCode: 404,
        message: message,
    });

export const Unauthorized = ({ message }: { message?: string }) =>
    BaseExceptionPage({
        title: 'Unauthorized',
        heading: 'Unauthorized',
        statusCode: 401,
        message: message,
    });
