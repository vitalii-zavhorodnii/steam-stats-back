export default () => ({
  port: parseInt(process.env.PORT) || 4000,
  steamservice: {
    baseUrl: process.env.STEAM_API_URL,
    key: process.env.STEAM_KEY,
    gamekeys: {
      csgo: process.env.GAME_ID_CS,
      dota: process.env.GAME_ID_DOTA,
    },
  },
});
