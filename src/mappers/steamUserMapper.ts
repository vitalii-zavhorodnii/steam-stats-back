import ISteamUser from 'interfaces/ISteamUser';

export const steamUserMapper = (profile: any): ISteamUser => ({
  name: profile.personaname,
  steamId: profile.steamid,
  steamUrl: profile.profileurl,
  picture: profile.avatarfull,
  countryCode: profile.loccountrycode,
  cityCode: profile.locstatecode,
  createdTimeStamp: profile.timecreated,
});
