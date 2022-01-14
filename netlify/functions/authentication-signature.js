const crypto = require('crypto')

exports.handler = function (event) {
  const apisecret = event.queryStringParameters.apisecret
  const cloudname = event.queryStringParameters.cloudname
  const username = event.queryStringParameters.username

  const str = `cloud_name=${cloudname}&timestamp=${Date.now()}&username=${username}${apisecret}`
  const secret = apisecret
  const sha256Hasher = crypto.createHmac('sha256', secret)
  const hash = sha256Hasher.update(str).digest('hex')

  return {
    statusCode: 200,
    body: JSON.stringify({ hash }),
  }
}
