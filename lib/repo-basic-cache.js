import LUR from 'lru-cache'

export const CACHE_REPO = new LUR({
  maxAge: 1000 * 60 * 60
})

export function setCache(repo) {
  const full_name = repo.full_name
  CACHE_REPO.set(full_name, repo)
}

export function getCache(full_name) {
  return CACHE_REPO.get(full_name)
}

export function cacheArray(repos) {
  if (repos && Array.isArray(repos)) {
    repos.forEach(repo => setCache(repo));
  }
}