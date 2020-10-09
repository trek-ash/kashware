const http = require('http');
const fs = require('fs');
const sharp = require('sharp');

const ORIGINAL_BASE_DIR = "uploads/originals/"
const THUMBNAIL_BASE_DIR = "uploads/thumbnails/"

downloadImageFromUrl = (url, fileName) => {
    const originalDest = `${ORIGINAL_BASE_DIR}${fileName}`
    return new Promise((res, rej)=>{
      try {
        let file = fs.createWriteStream(originalDest);
        http.get(url, (response) => {
          response.pipe(file);
          file.on('finish', () => {
            file.close(res);  
          });
        }).on('error', (err) => { // Handle errors
          fs.unlink(originalDest); // Delete the file async. (But we don't check the result)
          rej();
        });
      } catch (error) {
        rej(error)
      }
    })
};

createThumbnail = async (url) => {
    let url_segments = url.split("/")
    const fileName = url_segments[url_segments.length-1]
    const originalDest = `${ORIGINAL_BASE_DIR}${fileName}`
    const thumbnailDest = `${THUMBNAIL_BASE_DIR}${fileName}`
    const isFileTypeValid = validFileType(fileName)
    
    if(!isFileTypeValid)
      return {thumbnailUrl: null, thumbnailDetails: "Invalid file"}

    try {
      await downloadImageFromUrl(url, fileName)
      .catch(err=>{
        return {err};
      })
      thumbnailDetails = await convertFileToThumbnail(originalDest, thumbnailDest)
      return {thumbnailUrl: thumbnailDest, thumbnailDetails}
      
    } catch (error) {
      return {thumbnailUrl: null, thumbnailDetails: "Invalid file"}
    }
}

convertFileToThumbnail = (sourceFilePath, destinationFilePath)=>{
    return sharp(sourceFilePath).resize({ height:50, width:50}).toFile(destinationFilePath)
}

validFileType =  (fileName) =>{
  const validFileTypes = ['gif', 'jpeg', 'png', 'webp', 'jpg'];
  const fileNameSegment = fileName.split('.')
  let extension = fileNameSegment[fileNameSegment.length-1]

  if(validFileTypes.includes(extension))
    return true;

  return false;
}

module.exports = {createThumbnail}