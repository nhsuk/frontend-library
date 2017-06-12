const sass = require('node-sass');
const importOnce = require('node-sass-import-once');
const fs = require('fs');

sass.render(
  {
    file: `src/scss/nhsuk.scss`,
    importer: importOnce,
    importOnce: {
      index: true
    },
    includePaths: ['src/scss'],
    outputStyle: 'compressed',
    outFile: `./src/assets/css/nhsuk.css`,
  }, function(error, result) { // node-style callback from v3.0.0 onwards
    if(!error){
      // No errors during the compilation, write this result on the disk
      fs.writeFile(`./src/assets/css/nhsuk.css`, result.css, function(err){
        if(!err){
          console.log('file written on disk');
        }
        else{
          console.log(err.message);
        }
      });
    }
  });
// eslint-disable-next-line no-console
