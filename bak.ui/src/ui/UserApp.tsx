import { useState } from 'react';
import { AppWrapper } from './components/AppWrapper';

export const UserApp = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<
        { randomNumber: number; randomString: string } | undefined
    >(undefined);

    if (!loading) {
        return <AppWrapper>{data}</AppWrapper>;
    } else {
        return <AppWrapper>Loading..</AppWrapper>;
    }
};
