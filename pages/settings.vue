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

      <div class="my-8 bg-gray-200 px-8 py-6">
        <h2 class="text-primary font-bold text-2xl mb-2">
          Responsive settings
        </h2>

        <div class="mb-6">
          <label for="cloudname" class="mb-2 block font-bold">
            Breakpoints (minwidth)
          </label>

          <div
            v-for="breakpoint in breakpoints"
            :key="breakpoint.name"
            class="flex mb-4"
          >
            <input
              v-model="breakpoint.name"
              type="text"
              class="uniform-input uniform-input-text w-36 mr-4"
              required
              placeholder="Name"
            />

            <input
              v-model="breakpoint.minWidth"
              type="number"
              class="uniform-input uniform-input-text w-36"
              required
              placeholder="minWidth"
            />
            <button
              class="ml-4 inline-flex items-center border-transparent font-medium focus:outline-none focus:ring px-6 py-3 text-base leading-6 tracking-wider bg-secondary text-white hover:bg-opacity-75 border focus:border-gray-700 active:bg-opacity-75 focus:ring relative"
              @click="removeBreakpoint(breakpoint.name)"
            >
              remove
            </button>
          </div>
        </div>

        <button
          class="inline-flex items-center border-transparent font-medium focus:outline-none focus:ring px-6 py-3 text-base leading-6 tracking-wider bg-secondary text-white hover:bg-opacity-75 border focus:border-gray-700 active:bg-opacity-75 focus:ring relative"
          @click="addBreakpoint"
        >
          + breakpoint
        </button>
        <button
          v-if="breakpoints.length > 0"
          class="inline-flex items-center border-transparent font-medium focus:outline-none focus:ring px-6 py-3 text-base leading-6 tracking-wider bg-secondary text-white hover:bg-opacity-75 border focus:border-gray-700 active:bg-opacity-75 focus:ring relative"
          @click.prevent="onSubmit"
        >
          Save
        </button>
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
      username: '',
      error: '',
      sdk: null,
      location: null,
      breakpoints: [],
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
        username: this.username,
        breakpoints: this.breakpoints,
      })
    },

    fillExistingValues() {
      const existingValues = this.location.getValue()
      this.cloudname = existingValues.cloudname
      this.apikey = existingValues.apikey
      this.username = existingValues.username
      this.breakpoints = existingValues.breakpoints
    },

    addBreakpoint() {
      this.breakpoints.push({
        name: 'Name',
        minWidth: 'minWidth',
      })
    },

    removeBreakpoint(name) {
      this.breakpoints = this.breakpoints.filter(
        (breakpoint) => breakpoint.name !== name
      )
    },
  },
}
</script>
