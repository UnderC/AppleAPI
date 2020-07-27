const axios = require('axios').default
const Device = require('./device')
const urlRegex = /http(s|):\/\/.*?\/.*?\.json/ig

class IPSWCacher {
  constructor (url, interval) {
    if (!urlRegex.test(url)) throw new Error('json 파일을 제공하는 url이 제공되지 않았습니다.')

    this.url = url
    this.data = []
    this.cache()

    if (interval > 0) {
      if (isNaN(interval)) throw new Error('Number 타입의 interval이 제공되지 않았습니다.')
      setInterval(this.cache.bind(this), interval)
    }
  }

  cache () {
    axios.get(this.url).then(v => {
      this.data = Device.all(v.data.devices)
      console.log(this.data)
      console.log(`${this.data.length}개의 디바이스를 성공적으로 불러왔습니다.`)
    })
  }

  get (identifier) {
    return this.data.find(device => device.identifiers.includes(identifier))
  }

  get avaliable () {
    return this.data > 0
  }

  set avaliable (v) {
    throw new Error('read-only')
  }
}

module.exports = IPSWCacher
