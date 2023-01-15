import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { PokemonListResponse } from 'types/api-type';
import icon from '../../../assets/icon.png';

const Home = () => {
  // const { ipcRenderer } = window.electron;
  const [page, setPage] = useState<number>(0);

  const fetchPokemonList = (offset: number) =>
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=40/`).then(
      (res) => res.json()
    );

  const {
    isLoading,
    isError,
    error,
    data: response,
    isPreviousData,
  } = useQuery<PokemonListResponse>(
    ['pokemonList', page],
    () => fetchPokemonList(page + 20),
    {
      keepPreviousData: true,
    }
  );

  const openPokemonWindow = useCallback((data: string) => {
    window.electron.ipcRenderer.sendMessage('open-pokemon', data);
  }, []);

  useEffect(() => {
    if (response) {
      openPokemonWindow(response.results[0].name);
    }
  }, [openPokemonWindow, response]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching Pokemon List</div>;
  if (!response) return <div>Pokemon List not found</div>;

  const pokemonList = response.results;

  return (
    <div>
      <div className="Hello">
        <img width="125" alt="icon" src={icon} />
      </div>
      <h1>Welcome to PokeBuddy</h1>
      <button type="button" onClick={() => openPokemonWindow('Clicked')}>
        About
      </button>
      <button type="button" onClick={() => openPokemonWindow('New')}>
        New
      </button>
    </div>
  );
};

export default Home;
