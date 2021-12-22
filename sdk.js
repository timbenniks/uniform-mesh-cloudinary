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
