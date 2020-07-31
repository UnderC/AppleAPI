const Firmware = require('./firmware')
const model = require('./model.json')

class Device {
  constructor (key, rawData) {
    if (!key || !rawData) throw new Error('제공되지 않은 인자가 존재합니다.')

    this.name = rawData.name
    this.identifier = key
    this.models = Object.keys(model).filter(k => (
      typeof model[k] === 'object'
        ? model[k].includes(key)
        : model[k] === key
    ))

    this.identifiers = [
      key,
      rawData.name,
      rawData.BoardConfig,
      rawData.platform,
      this.models
    ].flat()

    this.BoardConfig = rawData.BoardConfig
    this.platform = rawData.platform
    this.cpid = rawData.cpid
    this.bdid = rawData.bdid
    this.firmwares = Firmware.all(rawData.firmwares)
  }
  
  get () {
    return {
      name: this.name,
      identifier: this.identifier,
      models: this.models,
      BoardConfig: this.BoardConfig,
      platform: this.platform,
      cpid: this.cpid,
      bdid: this.bdid,
      firmwares: this.firmwares
    }
  }

  static all (rawDatas) {
    const result = []
    for (const [k, v] of Object.entries(rawDatas)) {
      result.push(new Device(k, v))
    }

    return result
  }
}

module.exports = Device
