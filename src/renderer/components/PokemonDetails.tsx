import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { PokemonDoc } from 'types/pokemon-type';

// const { ipcRenderer } = window.electron;

const PokemonDetails = () => {
  const [message, setMessage] = useState<string>('');

  const fetchPokemon = (name: string) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`).then((res) =>
      res.json()
    );

  useEffect(() => {
    window.electron.ipcRenderer.receivePoke((data) => {
      console.log(data);

      setMessage(data[0]);
    });
  }, [message]);

  const {
    isLoading,
    isError,
    error,
    data: pokemon,
    isPreviousData,
  } = useQuery<PokemonDoc>(['pokemon', message], () => fetchPokemon(message));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching Pokemon</div>;
  if (!pokemon) return <div>Pokemon not found</div>;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`Pokemon - ${message}`}</title>
      </Helmet>

      <div>Pokemon name - {message}</div>
      <div>
        {pokemon.name} {pokemon.height} {JSON.stringify(pokemon.abilities)}
      </div>
    </HelmetProvider>
  );
};
export default PokemonDetails;
