class Version {
  constructor (rawVer) {
    if (!rawVer) throw new Error('rawVer가 제공되지 않았습니다.')
    if (typeof rawVer !== 'string') throw new Error('rawVer는 string이어야 합니다.')

    const temp = rawVer.split('.').map(v => Number(v))
    this.major = temp[0]
    this.minor = temp[1]
    this.patch = temp[2] || 0
  }
}

module.exports = Version
