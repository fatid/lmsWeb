export default {
    head() {
          return {
            link: [
              {
                rel: 'canonical',
                href: 'https://buhuth.org' + this.$route.path,
              }
            ],
          }
    }
}