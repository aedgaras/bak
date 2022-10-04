import { useState } from 'react';

export const useLoading = (initialValue: true) => {
    const [value, setValue] = useState<boolean>(initialValue);
    const toggleLoading = () => setValue(!value);
    return [value, toggleLoading] as const;
};
