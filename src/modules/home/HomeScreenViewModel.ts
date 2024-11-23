// viewmodels/HomeScreenViewModel.ts
import {useState, useEffect} from 'react';
import {DotaHero} from '../../models/DotaHero';
import {DotaHeroAPI} from '../../core/api/DotaHeroAPI';

export function HomeScreenViewModel() {
  const [heroes, setHeroes] = useState<DotaHero[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHeroes = async () => {
    try {
      setLoading(true);
      const heroStats = await DotaHeroAPI.getHeroStats();
      setHeroes(heroStats);
    } catch (error) {
      console.error('Failed to fetch heroes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  return {
    heroes,
    loading,
  };
}
