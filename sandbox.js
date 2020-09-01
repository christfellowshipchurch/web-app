// jshint esversion:8
// jshint node:true
const fs = require('fs');
const path = require('path');

const src = './src';

const convertFileToSandbox = async (entry) => {
  // Our starting point
  try {
    // Get the files as an array
    const files = await fs.promises.readdir(entry);

    // Loop them all with the new for...of
    for (const file of files) {
      // Get the full paths
      const fullPath = path.join(entry, file);

      // Stat the file to see if we have a file or dir
      const stat = await fs.promises.stat(fullPath);

      if (stat.isFile()) {
        console.log("'%s' is a file.", fullPath);
      } else if (stat.isDirectory()) {
        console.log("'%s' is a directory.", fullPath);
        convertFileToSandbox(fullPath);
      }

      // Now move async
      // await fs.promises.rename(fromPath, toPath);

      // Log because we're crazy
      // console.log("Moved '%s'->'%s'", fromPath, toPath);
    } // End for...of
  } catch (e) {
    // Catch anything bad that happens
    console.error("We've thrown! Whoops!", e);
  }
};

(() => convertFileToSandbox(src))(); // Wrap in parenthesis and call now
