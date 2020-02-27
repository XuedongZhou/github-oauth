function getRedisSessionId(sid) {
  return `ssid:${sid}`
}

class RedisSessionStore {
  constructor(client) {
    this.client = client
  }

  // 获取 redis 中存储的 session 数据
  async get(sid) {
    const id = getRedisSessionId(sid)
    const data = await this.client.get(id)
    if (!data) {
      return null
    }
    try {
      const result = JSON.parse(data)
      return result
    } catch (err) {
      console.log(err)
    }
  }

  // 存储 session 数据到 redis
  async set(sid, sess, ttl) {
    const id = getRedisSessionId(sid)

    if (typeof ttl === 'number') {
      ttl = Math.ceil(ttl / 1000)
    }

    try {
      const sessStr = JSON.stringify(sess)
      if (ttl) {
        await this.client.setex(id, ttl, sessStr)
      } else {
        await this.client.set(id, sessStr)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // 从 redis 当中 删除某个 session
  async destroy(sid) {
    const id = getRedisSessionId(sid)
    await this.client.del(id)
  }
}

module.exports = RedisSessionStore