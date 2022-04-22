export default {
    head() {
          return {
            link: [
              {
                rel: 'canonical',
                href: 'https://lmsw.fatihd.org' + this.$route.path,
              }
            ],
          }
    }
}