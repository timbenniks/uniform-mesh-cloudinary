<template>
  <main>
    <template v-if="error">
      {{ error }}
    </template>

    <template v-else>
      <form @submit.prevent="onSubmit">
        <div class="mb-6">
          <label for="defaultoptions" class="mb-2 block font-bold">
            Default Query String Options
          </label>
          <input
            v-model="defaultoptions"
            type="text"
            name="defaultoptions"
            class="uniform-input uniform-input-text"
            required
            placeholder="q_auto,f_auto"
          />
        </div>

        <!-- <div class="flex items-center uniform-input-label gap-2 mb-6">
          <input
            id="responsive"
            v-model="responsive"
            type="checkbox"
            name="responsive"
            class="uniform-input-checkbox"
            value="false"
          />
          <label class="uniform-checkbox-label" for="responsive">
            Advanced responsive usage
          </label>
        </div> -->
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
      defaultoptions: '',
      responsive: null,
      error: '',
      sdk: null,
      location: null,
    }
  },

  watch: {
    defaultoptions(val) {
      this.save(val)
    },
    responsive(val) {
      this.save(val)
    },
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
    async save() {
      await this.location.setValue({
        defaultoptions: this.defaultoptions,
        responsive: this.responsive,
      })
    },

    fillExistingValues() {
      const existingValues = this.location.getValue()
      this.defaultoptions = existingValues.defaultoptions
      this.responsive = existingValues.responsive
    },
  },
}
</script>
