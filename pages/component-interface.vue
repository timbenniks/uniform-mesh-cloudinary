<template>
  <main>
    <template v-if="error">
      {{ error }}
    </template>

    <template v-else>
      <label class="mb-2 block font-bold">Cloudinary</label>
      <ItemRow
        v-for="asset in selectedAssets"
        :key="asset.public_id"
        :asset="asset"
        @unlink="unlink"
        @saveOptions="saveOptions"
      />

      <button
        class="inline-flex items-center border-transparent font-medium focus:outline-none focus:ring px-6 py-3 text-base leading-6 tracking-wider bg-secondary text-white hover:bg-opacity-75 border focus:border-gray-700 active:bg-opacity-75 focus:ring relative"
        @click="toggleCloudinary"
      >
        <span v-if="showCloudinary">Close media library</span>
        <span v-else>Open media library</span>
      </button>

      <div
        v-show="showCloudinary"
        class="cloudinary-container"
        style="height: 500px"
      ></div>
    </template>
  </main>
</template>

<script>
import { useMeshSdk } from '../sdk'

export default {
  name: 'ComponentInterface',
  data() {
    return {
      error: '',
      sdk: null,
      location: null,
      metadata: {},
      cloudinary: null,
      cloudinaryInstantiated: false,
      showCloudinary: false,
      selectedAssets: [],
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
        this.metadata = this.location.getMetadata()
        this.breakpoints = this.metadata.settigs.breakpoints
        this.fillExistingValues()
      }
    }, 100)
  },

  methods: {
    fillExistingValues() {
      const existingValues = this.location.getValue()
      this.selectedAssets = existingValues
    },

    toggleCloudinary() {
      if (!this.cloudinaryInstantiated) {
        this.initCloudinary()
      }

      this.showCloudinary = !this.showCloudinary
    },

    initCloudinary() {
      const cloudinaryExists = setInterval(() => {
        if (window.cloudinary) {
          clearInterval(cloudinaryExists)
          this.cloudinary = window.cloudinary

          const { cloudname, apikey, username } = this.metadata.settings

          this.cloudinary.openMediaLibrary(
            {
              cloud_name: cloudname,
              api_key: apikey,
              username,
              multiple: true,
              remove_header: true,
              inline_container: '.cloudinary-container',
            },
            {
              insertHandler: (data) => {
                this.save(data.assets)
              },
            }
          )
          this.cloudinaryInstantiated = true
        }
      }, 10)
    },

    async save(data) {
      const assets = data.map((asset) => {
        return {
          publicId: asset.public_id,
          resourceType: asset.resource_type,
          width: asset.width,
          height: asset.height,
          format: asset.format,
          url: asset.secure_url,
          version: asset.version,
          previewUrl: asset.secure_url.replace(
            `v${asset.version}`,
            'q_auto,f_auto,w_150'
          ),
          options: this.metadata.parameterConfiguration.defaultoptions,
        }
      })

      const existingValues = this.location.getValue() || []
      assets.forEach((asset) => {
        existingValues.push(asset)
      })

      await this.location.setValue(existingValues)
      this.fillExistingValues()
    },

    async unlink(id) {
      const existingValues = this.location.getValue()
      const newValues = existingValues.filter((value) => value.publicId !== id)

      await this.location.setValue(newValues)
      this.fillExistingValues()
    },

    async saveOptions({ id, options }) {
      const existingValues = this.location.getValue()
      existingValues.find((value) => value.publicId === id).options = options

      await this.location.setValue(existingValues)
      this.fillExistingValues()
    },
  },
}
</script>
