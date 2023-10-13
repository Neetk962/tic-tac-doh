const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || '3ba5a61ea4a336c777e657ebeec14104e5916901bed105b2e9e516712999a5dd';
const expiration = '1h';

module.exports = {
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
