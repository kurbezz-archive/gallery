import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { parse } from 'yaml';
import { yellow, red } from 'colors';

const rimraf = require('rimraf');
const sizeOf = require('image-size');
const clipper = require('image-clipper');
const canvas = require('canvas');


clipper.configure('canvas', canvas);


const albumsPath = "./public/pictures/albums";


function getDirectories(path: string) {
  return readdirSync(path, { withFileTypes: true })
    .filter(item => item.isDirectory()).map(item => item.name);
}


function getFiles(path: string) {
  return readdirSync(path, { withFileTypes: true })
    .filter(item => !item.isDirectory()).map(item => item.name);
}


function _genPreview(original: string, preview: string) {
  const originalSize = sizeOf(original);

  let minSize = Math.min(originalSize.width, originalSize.height);

  if (minSize % 2 == 1)
    minSize -= 1;
  
  const centerX = Math.floor(originalSize.width / 2);
  const centerY = Math.floor(originalSize.height / 2);

  clipper(original, function() {
    this.crop(centerX - minSize / 2, centerY - minSize / 2, minSize, minSize)
      .resize(600, 600)
      .quality(85)
      .toFile(preview, () => {});
  });
}


function generatePriview(config: { folderName: string,
                                   files: string[],
                                   files_360: string[] }) {
  const albumPath = `${albumsPath}/${config.folderName}`;
  const previewsPath = `${albumPath}/generated_previews`;

  if (existsSync(previewsPath)) {
    rimraf.sync(previewsPath);
  }

  mkdirSync(previewsPath);

  config.files.forEach((item) => {
    const filePath = `${albumPath}/photos/${item}`;
    const previewPath = `${albumPath}/generated_previews/${item}`;

    _genPreview(filePath, previewPath);
  });

  config.files_360.forEach((item) => {
    const filePath = `${albumPath}/360_photos/${item}`;
    const previewPath = `${albumPath}/generated_previews/${item}`;

    _genPreview(filePath, previewPath);
  });
}


function processAlbum(folderName: string) {
  let config = {};

  const albumPath = `${albumsPath}/${folderName}`;

  const directories = getDirectories(albumPath);
  const files = getFiles(albumPath);

  let photos = [];

  if (directories.includes('photos')) {
    photos = getFiles(`${albumPath}/photos`);
  } else {
    console.warn(yellow(`Warning: Folder ${albumPath}/photos does not exist!`));
  }

  let photos360 = [];

  if (directories.includes('360_photos')) {
    photos360 = getFiles(`${albumPath}/360_photos`);
  } else {
    console.warn(yellow(`Warning: Folder ${albumPath}/360_photos does not exist!`));
  }

  if (files.includes('album.yml')) {
    const configData = readFileSync(`${albumPath}/album.yml`, 'utf-8');

    let parsedData: object | null = null;

    try {
      parsedData = parse(configData);
    } catch (YAMLSemanticError) {
      console.error(red(`Error: ${albumsPath}/album.yml parse error!`));
    }

    if (parsedData !== null) {
      ['name', 'description', 'protected', 'coverFileName'].forEach(item => {
        if (parsedData[item] !== undefined) {
          config[item] = parsedData[item];
        } else {
          console.error(red(`Error: File ${albumPath}/album.yml does not contains "${item}" key!`));
        }
      });

      if (parsedData['coverFileName']) {
        if (!photos.includes(parsedData['coverFileName'])) {
          console.error(red(`Error: Cover file ${albumPath}/photos/${parsedData['coverFileName']} does not exists!`));
        }
      }

      if (parsedData['photoDescription']) {
        Object.keys(parsedData['photoDescription']).forEach(item => {
          if (!photos.includes(item) && !photos360.includes(item)) {
            console.warn(yellow(`Warning: Description for ${albumPath}/photos/${item} , but it doesn't exist!`));
          }
        });

        config['photoDescription'] = parsedData['photoDescription'];
      }
    }
  } else {
    console.error(red(`Error: File ${albumPath}/album.yml does not exists!`));
  }

  config['folderName'] = folderName;

  config['files'] = photos;

  config['files_360'] = photos360;

  generatePriview(config as { folderName: string,
                              files: string[],
                              files_360: string[] }
);

  return config;
}


const albumsConfig = getDirectories(albumsPath).map(item => processAlbum(item));

writeFileSync('./public/generated_albums_config.json', JSON.stringify(albumsConfig));
