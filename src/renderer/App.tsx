import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import PokemonDetails from './PokemonDetails';
import './App.css';

const { ipcRenderer } = window.electron;

const Hello = () => {
  function openPokemonWindow(data: string) {
    ipcRenderer.sendMessage('open-pokemon', data);
  }

  openPokemonWindow('Pikachu');

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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route caseSensitive path="/pokemon" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
}
