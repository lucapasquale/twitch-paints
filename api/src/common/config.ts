export const config = () => ({
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3010,

  pgUri: process.env.PG_URI || 'postgres://linking_bio:password@localhost:5432/linking_bio',

  twitch: {
    clientId: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
  },
})
