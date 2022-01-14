export default {
  target: 'static',
  head: {
    title: 'uniform-mesh-cloudinary',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Cloudinary Mesh Implementation of Cloudinary',
      },
    ],
    script: [
      {
        src: 'https://media-library.cloudinary.com/global/all.js',
      },
      {
        src: 'https://media-editor.cloudinary.com/all.js',
      },
    ],
  },
  components: true,
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],
}
