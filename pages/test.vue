<template>
  <main>
    <picture>
      <source
        v-for="source in breakpointImages.sources"
        :key="source.minWidth"
        :srcset="source.srcset"
        :media="`(min-width: ${source.minWidth}px)`"
        :sizes="source.sizes"
        :alt="source.alt"
      />
      <img
        :srcset="breakpointImages.fallback.srcset"
        :alt="breakpointImages.fallback.alt"
        loading="lazy"
        :sizes="breakpointImages.fallback.sizes"
      />
    </picture>

    <pre class="text-xs">{{ breakpointImages }}</pre>
  </main>
</template>

<script>
export default {
  name: 'TestPage',
  data() {
    return {
      mediaObject: {
        alt: 'Tim in his Studio',
        url: 'https://res.cloudinary.com/dwfcofnrd/image/upload/v1638176104/tim_oct_2021_du1kyw.jpg',
        width: 6016,
        format: 'jpg',
        height: 3384,
        options: 'q_auto,f_auto',
        version: 1638176104,
        publicId: 'tim_oct_2021_du1kyw',
        previewUrl:
          'https://res.cloudinary.com/dwfcofnrd/image/upload/q_auto,f_auto,w_150/tim_oct_2021_du1kyw.jpg',
        breakpoints: [
          {
            name: 'initial',
            sizes: '100vw',
            srcset: 'w_200,w_300,w_350,w_400',
            minWidth: 0,
            modifiers: 'h_400,c_fill,g_face',
          },
          {
            name: 'small',
            sizes: '100vw',
            srcset: 'w_400,w_500,w_650',
            minWidth: 375,
            modifiers: 'h_500,c_fill,g_face',
          },
          {
            name: 'medium',
            sizes: '50vw',
            srcset: 'w_400',
            minWidth: 780,
            modifiers: 'h_600,c_fill,g_south',
          },
          {
            name: 'large',
            sizes: '100vw',
            srcset: 'w_1200,w_1300,w_1400',
            minWidth: 1280,
            modifiers: 'h_500,c_fill,g_face',
          },
        ],
        resourceType: 'image',
      },
    }
  },
  computed: {
    baseImage() {
      const { url, alt } = this.mediaObject

      return {
        url,
        alt,
      }
    },

    breakpointImages() {
      const { alt, url, version, options } = this.mediaObject

      const images = {}

      const sources = this.mediaObject.breakpoints.map((breakpoint) => {
        const { sizes, name, minWidth, modifiers, srcset } = breakpoint

        return {
          alt,
          sizes,
          srcset: this.createSrcSet(url, version, options, modifiers, srcset),
          name,
          minWidth,
        }
      })

      sources.sort((a, b) => b.minWidth - a.minWidth)

      images.fallback = sources.pop()
      images.sources = sources

      return images
    },
  },

  methods: {
    createSrcSet(baseUrl, version, baseOptions, modifiers, widths) {
      const result = []

      widths.split(',').forEach((width) => {
        const url = baseUrl.replace(
          `v${version}`,
          `${baseOptions},${modifiers},${width}`
        )

        result.push(`${url} ${width.replace('w_', '')}w`)
      })

      return result.join(',')
    },
  },
}
</script>
