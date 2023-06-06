import { accessableStats } from 'utils/accessableStats';

export const steamStatsMapper = (stats: any[]) => {
  const data = stats
    .map((item) => {
      if (accessableStats.some((accessable) => item.name === accessable.code))
        return {
          title: accessableStats.find(({ code }) => code === item.name).title,
          code: item.name,
          value: item.value,
        };
    })
    .filter((item) => item);

  return data;
};
