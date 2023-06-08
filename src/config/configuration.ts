export default () => ({
  port: parseInt(process.env.PORT) || 4000,
  steamapi: {
    baseUrl: process.env.STEAM_API_URL,
    key: process.env.STEAM_API_KEY,
  },
  trnapi: {
    baseUrl: process.env.TRN_API_URL,
    headerKey: process.env.TRN_API_HEADER,
    headerValue: process.env.TRN_API_KEY,
  },
});
