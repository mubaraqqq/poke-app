import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { PokemonListResponse } from 'types/api-type';
import icon from '../../../assets/icon.svg';

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

  console.log(pokemonList);

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
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
