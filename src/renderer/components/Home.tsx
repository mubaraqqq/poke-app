import {
  CircularProgress,
  FormControl,
  InputLabel,
  Stack,
} from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import gsap from 'gsap';
import { capitalize } from 'main/util';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { PokemonListResponse } from 'types/api-type';
import icon from '../../../assets/icon.png';

const Home = () => {
  const iconRef = useRef<HTMLImageElement>(null);
  const BoxRef = useRef<HTMLDivElement>(null);
  const didAnimate = useRef(false);

  const [page, setPage] = useState<number>(0);
  const [pokemonName, setpokemonName] = useState('');

  const fetchPokemonList = (offset: number) =>
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=40/`).then(
      (res) => res.json()
    );

  const {
    isLoading,
    isError,
    data: response,
  } = useQuery<PokemonListResponse>(
    ['pokemonList', page],
    () => fetchPokemonList(page * 40),
    {
      keepPreviousData: true,
    }
  );

  const onChangePokemon = (e: SelectChangeEvent) => {
    setpokemonName(e.target.value);
  };

  const nextQuery = () => {
    if (response && response.next) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const prevQuery = () => {
    if (response && response.previous) {
      setPage((prevPage) => Math.max(prevPage - 1, 0));
    }
  };

  const openPokemonWindow = useCallback((data: string) => {
    window.electron.ipcRenderer.sendMessage('open-pokemon', data);
  }, []);

  useEffect(() => {
    if (didAnimate.current) return;
    didAnimate.current = true;

    const tl = gsap.timeline();

    if (BoxRef && iconRef) {
      tl.fromTo(
        BoxRef.current,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 2.5,
        },
        0
      ).from(
        iconRef.current,
        {
          autoAlpha: 0,
          duration: 1.5,
          y: 125,
        },
        0
      );
    }
  }, []);

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error fetching Pokemon List</div>;
  // if (!response) return <div>Pokemon List not found</div>;

  const pokemonList = response?.results;

  return (
    <div ref={BoxRef}>
      {isError && <div>Error fetching Pokemon List</div>}

      <div className="Hello">
        <img ref={iconRef} width="125" height="125" alt="icon" src={icon} />
      </div>

      <h1>Welcome to PokeBuddy</h1>
      <h3>Select your favourite pokemon from the list below</h3>

      <p>Page {page + 1}</p>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <button type="button" disabled={page === 0} onClick={prevQuery}>
          Previous
        </button>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ width: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="pokemon-select-label">Pokemon</InputLabel>
              <Select
                labelId="pokemon-select-label"
                id="pokemon-select"
                value={pokemonName}
                label="Pokemon"
                onChange={onChangePokemon}
                sx={{ backgroundColor: '#ffffff' }}
              >
                {pokemonList?.map((pokemon) => (
                  <MenuItem
                    key={pokemon.name}
                    value={pokemon.name}
                    onClick={() => openPokemonWindow(pokemon.name)}
                  >
                    {capitalize(pokemon.name)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
        <button type="button" onClick={nextQuery}>
          Next
        </button>
      </Stack>
    </div>
  );
};

export default Home;
