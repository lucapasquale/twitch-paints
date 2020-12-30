export const config = () => ({
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3010,

  pgUri: process.env.PG_URI,

  graphqlSecretCode: process.env.GRAPHQL_SECRET_CODE,

  twitch: {
    clientId: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,

    accessToken: process.env.TWITCH_ACCESS_TOKEN,
    refreshToken: process.env.TWITCH_REFRESH_TOKEN,
  },
})
