import { useState } from 'react';       
import { useQuery } from 'react-query';
import Character from './Character';

export default function Characters() {
    const [page, setPage] = useState(1);
    
    const fetchCharacters = async ({ queryKey }) => {
        const response = await fetch(
            `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
        );
        return response.json();
    };

    const { data, isPreviousData, isLoading, isError } = useQuery(
        ['characters', page], fetchCharacters, {
        keepPreviousData: true
    });

    console.log(data);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error!</div>;
    return (
        <div className='characters'>
            {data?.results?.map((character, index) => (
                <Character key={index} character={character} />
            ))}
            <div>
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>
                <button
                    disabled={isPreviousData && data?.info?.next === null}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}