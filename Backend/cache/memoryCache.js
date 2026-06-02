const CACHE_TTL = parseInt(process.env.CACHE_TTL) || 60000;
const cache = new Map();

function get(key) {
  if (!cache.has(key)) return null;

  const { data, cachedAt } = cache.get(key);
  const age = Date.now() - cachedAt; 

  if (age > CACHE_TTL) {
    cache.delete(key);
    return null;
  }

  return data; 
}

function set(key, data) {
  cache.set(key, {
    data,
    cachedAt: Date.now(),
  });
}

module.exports = { get, set };
