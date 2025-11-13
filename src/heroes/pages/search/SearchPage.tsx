import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchControls } from './ui/SearchControls';
import { CustomBreadcrumb } from '@/components/custom/CustomBreadcrumb';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { useQuery } from '@tanstack/react-query';
import { getSearchHeroesAction } from '@/heroes/actions/search-heroes.action';
import { useQueryParams } from '@/heroes/hooks/useQueryParams';

export const SearchPage = () => {
  const { searchParams } = useQueryParams();

  const name = searchParams.get('name') ?? undefined;
  const strength = searchParams.get('strength') ?? undefined;
  //const intelligence = searchParams.get('intelligence') ?? undefined;

  const { data: searchHeroes = [] } = useQuery({
    queryKey: ['search', { name, strength }],
    queryFn: () => getSearchHeroesAction({ name, strength }),
    staleTime: 1000 * 60 * 5, //5 minutos
  });

  return (
    <>
      <CustomJumbotron
        title='Search Heroes'
        description='Discover, explore, and manage your favorite superheroes and villains'
      />
      <CustomBreadcrumb currentPage='Search' />
      <HeroStats />

      {/* Filter and search*/}
      <SearchControls />

      <HeroGrid heroes={searchHeroes} />
    </>
  );
};

export default SearchPage;
