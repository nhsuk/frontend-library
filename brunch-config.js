module.exports = {
  files: {
    stylesheets: { joinTo: 'nhsuk.css' },
  },
  plugins: {
    sass: {
      options: {
        includePaths: ['node_modules/normalize-scss/sass']
      }
    }
  }
};
