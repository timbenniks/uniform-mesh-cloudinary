<template>
  <main>
    <template v-if="error">
      {{ error }}
    </template>

    <template v-else>
      <h1 class="text-4xl font-bold mb-4">Cloudinary Settings</h1>
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
          <label for="username" class="mb-2 block font-bold"> Username </label>
          <input
            v-model="username"
            type="text"
            name="username"
            class="uniform-input uniform-input-text"
            required
          />
        </div>
        <div class="mb-6">
          <button
            type="submit"
            class="inline-flex items-center border-transparent font-medium focus:outline-none focus:ring px-6 py-3 text-base leading-6 tracking-wider bg-secondary text-white hover:bg-opacity-75 border focus:border-gray-700 active:bg-opacity-75 focus:ring relative"
          >
            Save
          </button>
        </div>
      </form>
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
        usesername: this.usesername,
      })
    },

    fillExistingValues() {
      const existingValues = this.location.getValue()
      this.cloudname = existingValues.cloudname
      this.apikey = existingValues.apikey
      this.username = existingValues.username
    },
  },
}
</script>
