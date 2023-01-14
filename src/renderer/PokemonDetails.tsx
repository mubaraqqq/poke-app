import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const { ipcRenderer } = window.electron;

const PokemonDetails = () => {
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    ipcRenderer.receivePoke((data) => {
      setMessage(data[0]);
    });
  }, [message]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`About Pokemon - ${message}`}</title>
      </Helmet>

      <div>Pokemon name - {message}</div>
    </HelmetProvider>
  );
};
export default PokemonDetails;
