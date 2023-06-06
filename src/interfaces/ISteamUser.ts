interface ISteamUser {
  name: string;
  steamId: string;
  steamUrl: string;
  picture: string;
  countryCode: string;
  cityCode: string;
  createdTimeStamp: number;
}

export default ISteamUser;
