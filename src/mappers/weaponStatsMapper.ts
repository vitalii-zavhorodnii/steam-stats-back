import IProfileWeaponsStats from 'interfaces/IProfileWeaponsStats';

export const weaponStatsMapper = (stats: any): IProfileWeaponsStats[] =>
  stats.map((weapon: any) => ({
    code: weapon.attributes.key,
    category: weapon.attributes.categoryKey,
    title: weapon.metadata.name,
    picture: weapon.metadata.imageUrl,
    kills: weapon.stats.kills.value,
    fired: weapon.stats.shotsFired.value,
    hits: weapon.stats.shotsHit.value,
    accurancy: weapon.stats.shotsAccuracy.value,
  }));
