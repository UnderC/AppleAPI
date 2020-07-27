const axios = require('axios').default
const Device = require('./device')
const urlRegex = /http(s|):\/\/.*?\/.*?\.json/ig

class IPSWCacher {
  /*
   * url: ipsw.me에서 제공하는 json 파일 full URL
   * interval: n초마다 갱신, 0 이하로 설정시 갱신하지 않음
   */
  constructor (url, interval) {
    if (!urlRegex.test(url)) throw new Error('json 파일을 제공하는 url이 제공되지 않았습니다.')

    this.url = url
    this.data = []

    if (interval > 0) {
      if (isNaN(interval)) throw new Error('Number 타입의 interval이 제공되지 않았습니다.')
      this.interval = interval
    }
  }

  startInterval() {
    setInterval(this.cache.bind(this), this.interval)
  }

  cache (callback) {
    axios.get(this.url).then(v => {
      this.data = Device.all(v.data.devices)
      console.log(`${this.data.length}개의 디바이스를 성공적으로 불러왔습니다.`)
      if (callback) callback()
    }).catch(err => {
      throw err
    })
  }

  get (identifier) {
    return this.data.find(device => device.identifiers.includes(identifier))
  }

  get avaliable () {
    return this.data.length > 0
  }

  set avaliable (v) {
    throw new Error('read-only')
  }
}

module.exports = IPSWCacher
