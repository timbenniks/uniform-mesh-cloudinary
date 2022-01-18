<template>
  <main>
    <template v-if="error">
      {{ error }}
    </template>

    <template v-else>
      <section>
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

        <div class="my-8 bg-gray-200 px-8 py-6">
          <h2 class="text-primary font-bold text-2xl mb-2">
            Cropping templates
          </h2>

          <div class="mb-6">
            <div
              v-for="tmpl in croppingTemplates"
              :key="tmpl.label"
              class="flex mb-4"
            >
              <input
                v-model="tmpl.label"
                type="text"
                class="uniform-input uniform-input-text w-36"
                required
                placeholder="Name"
              />

              <input
                v-model="tmpl.width"
                type="number"
                class="uniform-input uniform-input-text w-36 ml-4"
                required
                placeholder="width"
              />

              <input
                v-model="tmpl.aspectRatio"
                type="text"
                class="uniform-input uniform-input-text w-36 ml-4"
                required
                placeholder="16:9"
              />
              <button
                class="ml-4 inline-flex items-center border-transparent font-medium focus:outline-none focus:ring px-6 py-3 text-base leading-6 tracking-wider bg-secondary text-white hover:bg-opacity-75 border focus:border-gray-700 active:bg-opacity-75 focus:ring relative"
                @click="removeCroppingTemplate(tmpl.label)"
              >
                remove
              </button>
            </div>
          </div>

          <button
            class="inline-flex items-center border-transparent font-medium focus:outline-none focus:ring px-6 py-3 text-base leading-6 tracking-wider bg-secondary text-white hover:bg-opacity-75 border focus:border-gray-700 active:bg-opacity-75 focus:ring relative"
            @click="addCroppingTemplate"
          >
            + Cropping Template
          </button>

          <button
            class="inline-flex items-center border-transparent font-medium focus:outline-none focus:ring px-6 py-3 text-base leading-6 tracking-wider bg-secondary text-white hover:bg-opacity-75 border focus:border-gray-700 active:bg-opacity-75 focus:ring relative"
            @click="save"
          >
            Save
          </button>
        </div>
      </section>
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
      croppingTemplates: [],
    }
  },

  watch: {
    defaultoptions() {
      this.save()
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
        croppingTemplates: this.croppingTemplates,
      })
    },

    fillExistingValues() {
      const existingValues = this.location.getValue()
      this.defaultoptions = existingValues.defaultoptions
      this.croppingTemplates = existingValues?.croppingTemplates || []
    },

    addCroppingTemplate() {
      this.croppingTemplates.push({
        label: 'Label',
        width: '',
        aspectRatio: '',
      })
    },

    removeCroppingTemplate(label) {
      this.croppingTemplates = this.croppingTemplates.filter(
        (template) => template.label !== label
      )

      this.save()
    },
  },
}
</script>
