const Version = require('./version')

class Firmware {
  constructor (rawData) {
    if (!rawData) throw new Error('rawData가 제공되지 않았습니다.')

    this.rawversion = rawData.version
    this.version = new Version(rawData.version)
    this.buildid = rawData.buildid
    this.sha1sum = rawData.sha1sum
    this.md5sum = rawData.md5sum
    this.size = rawData.size
    this.releasedate = new Date(rawData.releasedate)
    this.uploaddate = new Date(rawData.uploaddate)
    this.url = rawData.url
    this.signed = Boolean(rawData.signed)
    this.filename = rawData.filename
  }

  static all (firms) {
    if (!firms) throw new Error('펌웨어 목록이 제공되지 않았습니다.')
    if (typeof firms !== 'object') throw new Error('firms는 array이어야 합니다.')

    return firms.map(rawData => new Firmware(rawData))
  }
}

module.exports = Firmware
