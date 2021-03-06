<template>
  <main>
    <template v-if="error">
      {{ error }}
    </template>

    <template v-else>
      <h1 class="text-4xl font-bold mb-4">Cloudinary</h1>

      <div class="my-8 bg-gray-200 px-8 py-6">
        <h2 class="text-primary font-bold text-2xl mb-2">
          Authentication settings
        </h2>
        <p class="mb-8 text-sm">
          These settings are used to create an authentication signature which
          allows all users in Uniform to use the Cloudinary integration
        </p>
        <form @submit.prevent="onSubmit">
          <div class="mb-6">
            <label for="cloudname" class="mb-2 block font-bold">
              Cloud name
            </label>
            <input
              v-model="cloudname"
              type="text"
              name="cloudname"
              class="uniform-input uniform-input-text"
              required
            />
          </div>
          <div class="mb-6">
            <label for="apikey" class="mb-2 block font-bold"> API key </label>
            <input
              v-model="apikey"
              type="text"
              name="apikey"
              class="uniform-input uniform-input-text"
              required
            />
          </div>
          <div class="mb-6">
            <label for="apikey" class="mb-2 block font-bold">
              API Secret
            </label>
            <input
              v-model="apisecret"
              type="password"
              name="apisecret"
              class="uniform-input uniform-input-text"
              required
            />
          </div>
          <div class="mb-6">
            <label for="username" class="mb-2 block font-bold">
              Username
            </label>
            <input
              v-model="username"
              type="text"
              name="username"
              class="uniform-input uniform-input-text"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              class="inline-flex items-center border-transparent font-medium focus:outline-none focus:ring px-6 py-3 text-base leading-6 tracking-wider bg-secondary text-white hover:bg-opacity-75 border focus:border-gray-700 active:bg-opacity-75 focus:ring relative"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </template>
  </main>
</template>

<script>
import { useMeshSdk } from '../sdk'

export default {
  name: 'SettingsPage',
  data() {
    return {
      cloudname: '',
      apikey: '',
      apisecret: '',
      username: '',
      error: '',
      sdk: null,
      location: null,
    }
  },
  async mounted() {
    const { sdk, location, error } = await useMeshSdk()

    this.sdk = sdk
    this.location = location
    this.error = error

    const locationExists = setInterval(() => {
      if (this.location) {
        clearInterval(locationExists)
        this.fillExistingValues()
      }
    }, 100)
  },

  methods: {
    async onSubmit() {
      await this.location.setValue({
        cloudname: this.cloudname,
        apikey: this.apikey,
        apisecret: this.apisecret,
        username: this.username,
      })
    },

    fillExistingValues() {
      const existingValues = this.location.getValue()
      this.cloudname = existingValues.cloudname
      this.apikey = existingValues.apikey
      this.apisecret = existingValues.apisecret
      this.username = existingValues.username
    },
  },
}
</script>
