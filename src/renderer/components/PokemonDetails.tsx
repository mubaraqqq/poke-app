import { Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { capitalize } from 'main/util';
import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { resolvePokemonTypes } from 'renderer/constants';
import { PokemonDoc } from 'types/pokemon-type';

const PokemonDetails = () => {
  const [pokemonName, setPokemonName] = useState<string>('');
  const capitalizedName = capitalize(pokemonName);

  const fetchPokemon = (name: string) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`).then((res) =>
      res.json()
    );

  useEffect(() => {
    window.electron.ipcRenderer.receivePoke((data) => {
      setPokemonName(data[0]);
    });
  }, [pokemonName]);

  const {
    isLoading,
    isError,
    data: pokemon,
  } = useQuery<PokemonDoc>(['pokemon', pokemonName], () =>
    fetchPokemon(pokemonName)
  );

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

  const pokemonTypeArr = resolvePokemonTypes(pokemon.types);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`Pokemon - ${capitalizedName}`}</title>
      </Helmet>

      <h1>{capitalizedName}</h1>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Base Experience: {pokemon.base_experience}</p>
      <p>Species: {pokemon.species.name}</p>
      <p>Order: {pokemon.order}</p>

      <div>
        <p title="pokemon-type">Types</p>
        <Stack direction="row" spacing={1}>
          {pokemonTypeArr.map((type) => (
            <Stack key={type.name} direction="column" alignItems="center">
              <img src={type.image} alt={type.name} width="30" height="30" />
              <p>{type.name}</p>
            </Stack>
          ))}
        </Stack>
      </div>
    </HelmetProvider>
  );
};
export default PokemonDetails;
