import { PokemonDoc } from 'types/pokemon-type';
import alien from '../../assets/pokemon-types/alien.png';
import beam from '../../assets/pokemon-types/beam.png';
import birds from '../../assets/pokemon-types/birds.png';
import dragon from '../../assets/pokemon-types/dragon.png';
import emoticon from '../../assets/pokemon-types/emoticon.png';
import fairy from '../../assets/pokemon-types/fairy.png';
import flames from '../../assets/pokemon-types/flames.png';
import ghost from '../../assets/pokemon-types/ghost.png';
import grass from '../../assets/pokemon-types/grass.png';
import ground from '../../assets/pokemon-types/ground.png';
import ladybug from '../../assets/pokemon-types/ladybug.png';
import lightning from '../../assets/pokemon-types/lightning.png';
import poison from '../../assets/pokemon-types/poison.png';
import rocks from '../../assets/pokemon-types/rocks.png';
import shadow from '../../assets/pokemon-types/shadow.png';
import snowflake from '../../assets/pokemon-types/snowflake.png';
import solidBlackSun from '../../assets/pokemon-types/solid-black-sun-symbol.png';
import swords from '../../assets/pokemon-types/swords.png';
import unknown from '../../assets/pokemon-types/unknown.png';
import water from '../../assets/pokemon-types/water-drop.png';

export type ResolvedPokemonType = {
  name: string;
  image: string;
};

export const pokemonTypes: ResolvedPokemonType[] = [
  {
    name: 'normal',
    image: emoticon,
  },
  {
    name: 'fighting',
    image: swords,
  },
  {
    name: 'flying',
    image: birds,
  },
  {
    name: 'poison',
    image: poison,
  },
  {
    name: 'ground',
    image: ground,
  },
  {
    name: 'rock',
    image: rocks,
  },
  {
    name: 'bug',
    image: ladybug,
  },
  {
    name: 'ghost',
    image: ghost,
  },
  {
    name: 'steel',
    image: beam,
  },
  {
    name: 'fire',
    image: flames,
  },
  {
    name: 'water',
    image: water,
  },
  {
    name: 'grass',
    image: grass,
  },
  {
    name: 'electric',
    image: lightning,
  },
  {
    name: 'psychic',
    image: alien,
  },
  {
    name: 'ice',
    image: snowflake,
  },
  {
    name: 'dragon',
    image: dragon,
  },
  {
    name: 'dark',
    image: solidBlackSun,
  },
  {
    name: 'fairy',
    image: fairy,
  },
  {
    name: 'unknown',
    image: unknown,
  },
  {
    name: 'shadow',
    image: shadow,
  },
];

export function resolvePokemonTypes(
  arr: PokemonDoc['types']
): ResolvedPokemonType[] {
  let resolvedArray: ResolvedPokemonType[] = [];
  arr.forEach((item) => {
    resolvedArray = pokemonTypes.filter((type) => type.name === item.type.name);
  });

  return resolvedArray;
}
