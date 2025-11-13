import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all';
  const slug = searchParams.get('idSlug') ?? '';

  const selectedTab = useMemo(() => {
    const validTab = ['all', 'favorites', 'heroes', 'villains'];
    return validTab.includes(activeTab) ? activeTab : 'all';
  }, [activeTab]);

  return {
    //Properties
    page,
    limit,
    category,
    slug,

    //Methods
    selectedTab,
    searchParams,
    setSearchParams,
  };
};
