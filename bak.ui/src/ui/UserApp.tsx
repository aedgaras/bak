import { useEffect, useState } from 'react';
import { AppWrapper } from './components/AppWrapper';

export const UserApp = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<{randomNumber: number, randomString: string} | undefined>(undefined);
    useEffect(() => {
        fetch('http://localhost:3030/').then((res) => res.json()).then((res)=> {setLoading(false); console.log(res)});
    },[])

    if(!loading){
        return <AppWrapper>{data}</AppWrapper>;
    } else {
        return <AppWrapper>Loading..</AppWrapper>;
    }
};
