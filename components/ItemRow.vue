<template>
  <div class="relative my-4">
    <div
      class="flex w-full border border-gray-300 bg-gray-100"
      :class="{ 'rounded-t-md': showOptions, 'rounded-md': !showOptions }"
    >
      <div class="p-4 pl-8 flex flex-grow mr-2 gap-2 items-center relative">
        <img
          v-if="asset.resourceType === 'image'"
          :src="asset.previewUrl"
          width="150"
          class="block"
        />

        <video
          v-if="asset.resourceType === 'video'"
          :src="asset.previewUrl"
          width="150"
          class="block"
          muted
          controls
        />

        <div class="flex-grow">
          <div class="inline-flex relative items-start">
            <h4
              class="text-primary font-bold leading-none mb-2"
              :title="`Version ${asset.version}`"
            >
              {{ asset.resourceType }}
            </h4>
          </div>
          <div class="gap-4 text-xs">
            <span class="font-bold mr-2 order-1">Format:</span>
            <span>{{ asset.format }}</span>
          </div>
          <div class="gap-4 text-xs">
            <span class="font-bold mr-2 order-1">Resolution:</span>
            <span>{{ asset.width }}x{{ asset.height }}</span>
          </div>
        </div>
        <div class="flex flex-row lg:flex-row gap-2">
          <button
            type="button"
            class="flex justify-between items-center px-4 bg-white rounded border-2 border-gray-400 h-10 hover:bg-gray-100"
            @click="showOptions = !showOptions"
          >
            <span class="mr-2 text-sm">
              <span v-if="!showOptions">Options</span>
              <span v-else>Close</span> </span
            ><svg width="24" height="24">
              <path
                fill="currentColor"
                d="M89.1467776,14.7160158 C89.1749044,14.4628819 89.1877962,14.2261585 89.1877962,13.9999805 C89.1877962,13.7937232 89.1772487,13.5839558 89.15381,13.3542677 L91.742647,11.4745212 C92.0028208,11.2858416 92.0766585,10.9284119 91.913751,10.6506621 L89.9941072,7.39854714 C89.8370651,7.13252173 89.5089159,7.02002376 89.2217974,7.1372109 L86.3598828,8.29156171 C85.9239247,7.9575599 85.4516342,7.67629996 84.9488618,7.45012196 L84.5738376,4.54493926 C84.5339921,4.23319824 84.269138,4 83.9550477,4 L80.0862982,4 C79.7722079,4 79.5061808,4.23321024 79.4663382,4.54493926 L79.0936542,7.43254134 C78.6366047,7.63411247 78.2053269,7.88021717 77.804501,8.16849736 L75.0082307,6.95438444 C74.7234463,6.83250513 74.3941211,6.93446193 74.2300405,7.19579997 L72.222491,10.3975132 C72.051387,10.6705708 72.1158431,11.0291855 72.3713276,11.2260524 L74.8675786,13.1421302 C74.8312493,13.4374546 74.8124981,13.7210606 74.8124981,13.9999805 C74.8124981,14.1792848 74.8207015,14.3620933 74.8382808,14.5578202 L72.2646848,16.3754645 C72.0009948,16.5617981 71.9224828,16.9168936 72.0830321,17.1969835 L73.956983,20.4736993 C74.1105089,20.7420678 74.4363239,20.8569029 74.7257826,20.745584 L77.5607254,19.643975 C78.0084143,19.9967275 78.4924355,20.293228 79.0080788,20.5299363 L79.3385801,23.3964477 C79.3749094,23.7093587 79.6374264,23.9460671 79.9515196,23.9496072 L83.8166689,24 L83.8248723,24 C84.1354524,24 84.3991394,23.7714759 84.4436622,23.463251 L84.8550188,20.5897194 C85.3753723,20.3647115 85.8617337,20.0834516 86.3082525,19.7506198 L89.1279543,20.9307415 C89.4127387,21.0502777 89.742064,20.9436327 89.9026043,20.6787806 L91.866801,17.4524665 C92.0343888,17.1770658 91.9652433,16.8196242 91.7074157,16.6262673 L89.1467776,14.7160158 Z M82,17 C80.3464581,17 79,15.654665 79,14 C79,12.3464581 80.345335,11 82,11 C83.6535419,11 85,12.345335 85,14 C85,15.6535419 83.6535419,17 82,17 Z"
                transform="translate(-70 -2)"
              ></path>
            </svg>
          </button>

          <button
            type="button"
            class="flex justify-between items-center px-4 bg-white rounded border-2 border-gray-400 h-10 hover:bg-gray-100"
            @click="$emit('unlink', asset.publicId)"
          >
            <span class="mr-2 text-sm">Unlink</span
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 19 19"
              fill="currentColor"
              class="w-4 h-4 text-red-600"
            >
              <g fill-rule="evenodd">
                <path
                  d="M16.578 1.636a1.174 1.174 0 0 1 0 1.66L3.296 16.578a1.174 1.174 0 1 1-1.66-1.66L14.918 1.636a1.174 1.174 0 0 1 1.66 0Z"
                ></path>
                <path
                  d="M1.636 1.636a1.174 1.174 0 0 1 1.66 0l13.282 13.282a1.174 1.174 0 1 1-1.66 1.66L1.636 3.296a1.174 1.174 0 0 1 0-1.66Z"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="showOptions"
      class="options-row bg-gray-200 p-4 border-gray-300 border rounded-b-md border-t-0"
    >
      <label for="options" class="mb-2 block font-bold">
        Base Image Options
      </label>
      <p class="text-gray-700 text-xs mb-2 max-w-md">
        This field is used for cloiudinary URL parameters that every image
        get's. Think about file type (f_auto) and quality settigns (q_auto:best)
        here. These settings are copied from the component parameter definition
        in the component library.
      </p>

      <div class="mb-4">
        <input
          v-model="options"
          type="text"
          name="options"
          class="uniform-input uniform-input-text mr-2"
          placeholder="q_auto,f_auto"
        />
      </div>

      <div>
        <h3 class="mb-4 block text-3xl font-bold">Breakpoints</h3>
        <p class="text-gray-700 text-xs mb-2 max-w-md">
          These options allow you to create different image assets per
          breakpoint effectively letting you use the <picture /> tag in its full
          glory. Breakpoints are set in the global options for the Cloudinary
          Mesh Integration.
        </p>
        <div v-for="breakpoint in breakpoints" :key="breakpoint.name">
          <label class="mb-2 block font-bold"
            >{{ breakpoint.name }} (min-width:
            {{ breakpoint.minWidth }}px)</label
          >
          <label
            :for="`srcset-${breakpoint.name}`"
            class="text-gray-700 text-xs"
            >Srcset (only use Cloudinary width properties here)</label
          >
          <input
            v-model="breakpointSrcset[breakpoint.name]"
            type="text"
            :name="`srcset-${breakpoint.name}`"
            class="uniform-input uniform-input-text mb-4"
            placeholder="w_200,w_300"
          />
          <label :for="`sizes-${breakpoint.name}`" class="text-gray-700 text-xs"
            >Sizes</label
          >
          <input
            v-model="breakpointSizes[breakpoint.name]"
            type="text"
            :name="`sizes-${breakpoint.name}`"
            class="uniform-input uniform-input-text mb-4"
            placeholder="(max-width: 710px) 120px, 278px"
          />
          <label
            :for="`modifiers-${breakpoint.name}`"
            class="text-gray-700 text-xs"
            >Modifiers</label
          >
          <input
            v-model="breakpointModifiers[breakpoint.name]"
            type="text"
            :name="`modifiers-${breakpoint.name}`"
            class="uniform-input uniform-input-text mb-4"
            placeholder="c_crop,g_face"
          />
        </div>
      </div>

      <button
        class="inline-flex items-center border-transparent font-medium rounded-md focus:outline-none focus:ring px-6 py-3 text-base leading-6 tracking-wider bg-secondary text-white hover:bg-opacity-75 border focus:border-gray-700 active:bg-opacity-75 focus:ring relative"
        @click="save"
      >
        save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemRow',
  props: {
    asset: { type: Object, required: true },
    breakpoints: { type: Array, required: true },
  },
  data() {
    return {
      showOptions: false,
      breakpointSrcset: [],
      breakpointSizes: [],
      breakpointModifiers: [],
      options: this.asset.options,
    }
  },

  mounted() {
    this.asset.breakpoints.forEach((breakpoint) => {
      this.breakpointSrcset[breakpoint.name] = breakpoint.srcset
      this.breakpointSizes[breakpoint.name] = breakpoint.sizes
      this.breakpointModifiers[breakpoint.name] = breakpoint.modifiers
    })
  },

  methods: {
    save() {
      const breakpoints = []

      this.breakpoints.forEach((breakpoint) => {
        breakpoints.push({
          name: breakpoint.name,
          minWidth: breakpoint.minWidth,
          srcset: this.breakpointSrcset[breakpoint.name],
          sizes: this.breakpointSizes[breakpoint.name],
          modifiers: this.breakpointModifiers[breakpoint.name],
        })
      })

      this.$emit('saveOptions', {
        id: this.asset.publicId,
        options: this.options,
        breakpoints,
      })
    },
  },
}
</script>
