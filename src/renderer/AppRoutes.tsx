import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import PokemonDetails from './components/PokemonDetails';
import './App.css';
import Home from './components/Home';

export default function AppRoutes() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<PokemonDetails />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
