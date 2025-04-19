const expiresIn = '10s';
const refreshExpiresIn = '10m';

const jwt = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
};

const refresh = {
  secret: process.env.REFRESH_SECRET,
  expiresIn: process.env.REFRESH_EXPIRES_IN,
  duration: Number(process.env.REFRESH_DURATION),
};

export { jwt, refresh, expiresIn, refreshExpiresIn };
