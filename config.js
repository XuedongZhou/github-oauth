
const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'
const client_id = 'b63267e559a28cdc3f63'

module.exports = {
  github: {
    client_id,
    client_secret: '7eff8496b2825979884e85a2f8169236703e500e',
    authorize_url: 'ttps://github.com/login/oauth/authorize',
    access_token_url: 'https://github.com/login/oauth/access_token'
  },
  GITHUB_OAUTH_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`
}