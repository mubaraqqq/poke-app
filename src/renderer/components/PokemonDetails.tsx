import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { capitalize } from 'main/util';
import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { PokemonDoc } from 'types/pokemon-type';

const PokemonDetails = () => {
  const [message, setMessage] = useState<string>('');
  const capitalizedName = capitalize(message);

  const fetchPokemon = (name: string) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`).then((res) =>
      res.json()
    );

  useEffect(() => {
    window.electron.ipcRenderer.receivePoke((data) => {
      setMessage(data[0]);
    });
  }, [message]);

  const {
    isLoading,
    isError,
    data: pokemon,
    isPreviousData,
  } = useQuery<PokemonDoc>(['pokemon', message], () => fetchPokemon(message));

  if (isLoading)
    return (
      <Stack
        height="100vh"
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Stack>
    );
  if (isError) return <div>Error fetching Pokemon</div>;
  if (!pokemon) return <div>Pokemon not found</div>;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`Pokemon - ${capitalizedName}`}</title>
      </Helmet>

      <div>Pokemon name - {capitalizedName}</div>
      <div>
        {pokemon.name} {pokemon.height}
      </div>
    </HelmetProvider>
  );
};
export default PokemonDetails;
