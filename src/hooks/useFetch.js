// React, Hooks
import { useState, useEffect } from 'react';

// Services
import postServices from '../services/postServices';

function useFetch(limit, startAfter) {
    const [data, setData] = useState([]);
    const [latestDoc, setLatestDoc] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEnd, setIsEnd] = useState(false);

    const setFetchedData = async (limit, startAfter) => {
        setIsLoading(true);

        try {
            const fetchedData = await postServices.getPlaces(limit, startAfter);

            if (fetchedData.latestDoc) {
                setLatestDoc(fetchedData.latestDoc);
                setData(prevState => [...prevState, ...fetchedData.collection]);
            } else {
                setIsEnd(true)
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setFetchedData(limit, startAfter);
    }, [limit, startAfter])

    // useEffect(() => {
    //     setIsEnd(data.length >= totalCount);
    // }, [data, totalCount])



    return { data, latestDoc, isEnd, isLoading, error };

}

export default useFetch
