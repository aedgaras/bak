import { Tag } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { getCaseType } from '../../../utils/utils';

export const CaseTypeTag = ({ label }: { label: number }) => {
    const { t } = useTranslation();

    let color = 'orange';

    if (label === 0) {
        color = 'orange';
    } else if (label === 1) {
        color = 'blue';
    } else {
        color = 'teal';
    }

    return (
        <Tag size={'lg'} colorScheme={color}>
            {t(`Table.Case.${getCaseType(label)}`)}
        </Tag>
    );
};
