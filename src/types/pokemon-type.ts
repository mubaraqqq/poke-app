export type Base = {
  name: string;
  url: string;
};

type Ability = {
  ability: Base;
  is_hidden: boolean;
  slot: number;
};

type GameIndex = {
  game_index: number;
  version: Base;
};

type HeldItem = {
  item: Base;
  version_details: Array<{ rarity: number; version: Base }>;
};

type Move = {
  move: Base;
  version_group_details: Array<{
    level_learned_at: number;
    move_learn_method: Base;
    version_group: Base;
  }>;
};

type Stat = {
  base_stat: number;
  effort: number;
  stat: Base;
};

type Type = {
  slot: number;
  type: Base;
};

export type PokemonDoc = {
  abilities: Ability[];
  base_experience: number;
  forms: Base[];
  game_indices: GameIndex[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: unknown[];
  species: Base;
  sprites: unknown;
  stats: Stat[];
  types: Type[];
  weight: number;
};
