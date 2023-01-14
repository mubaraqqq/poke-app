import { Base } from './pokemon-type';

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<Base>;
};
