import { heroApi } from '../api/hero.api';
import type { Hero } from '../types/hero.interface';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Option {
  name?: string;
  team?: string;
  category?: string;
  universe?: string;
  status?: string;
  strength?: string;
  intelligence?: string;
}

export const getSearchHeroesAction = async (option: Option) => {
  const { category, name, status, strength, team, universe } = option;
  if (!category && !name && !status && !strength && !team && !universe) {
    return [];
  }

  const { data } = await heroApi.get<Hero[]>(`/search`, {
    params: {
      category,
      name,
      status,
      strength,
      team,
      universe,
    },
  });
  return data.map((hero) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`,
  }));
};
