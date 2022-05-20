const ziplib = require('zip-lib');
const moment = require('moment');
const fs = require('fs');

const srcDir = "build";
const destDir = "dist";
if(!fs.existsSync(destDir)){
    fs.mkdirSync(destDir);
}

const targetFile = destDir+"/admin_build_"+moment().format("YYYY_MM_DD_HH_mm_ss")+".zip";

ziplib.archiveFolder(srcDir, targetFile).then(function () {
    console.log("build packaging done!");
}, function (err) {
    console.log(err);
});