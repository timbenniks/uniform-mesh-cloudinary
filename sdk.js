import { initializeUniformMeshSDK } from '@uniformdev/mesh-sdk'

export const useMeshSdk = async () => {
  let sdkInstance = null
  let location = null
  let error = ''

  if (typeof window === 'undefined') {
    return
  }

  if (typeof window.UniformMeshSDK === 'undefined') {
    sdkInstance = await initializeUniformMeshSDK({
      autoResizingDisabled: false,
    }).catch((err) => {
      error = err
    })
  } else {
    sdkInstance = window.UniformMeshSDK
  }

  if (!error) {
    location = sdkInstance.getCurrentLocation()
  }

  return {
    sdk: sdkInstance,
    location,
    error,
  }
}

export const useSignature = async (apisecret, cloudname, username) => {
  const signatureOptions = new URLSearchParams({
    apisecret,
    cloudname,
    username,
  })

  const signatureResponse = await fetch(
    `/.netlify/functions/authentication-signature?${signatureOptions}`
  )

  const signature = await signatureResponse.json()

  return {
    signature: signature.hash,
    unixtime: signature.unixtime,
  }
}
