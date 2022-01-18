const shajs = require('sha.js')
const timestamp = require('unix-timestamp')

exports.handler = function (event) {
  timestamp.round = true

  const apisecret = event.queryStringParameters.apisecret
  const cloudname = event.queryStringParameters.cloudname
  const username = event.queryStringParameters.username
  const unixtime = timestamp.now()
  const str = `cloud_name=${cloudname}&timestamp=${unixtime}&username=${username}${apisecret}`
  const hash = shajs('sha256').update(str).digest('hex')

  return {
    statusCode: 200,
    body: JSON.stringify({ hash, unixtime }),
  }
}
