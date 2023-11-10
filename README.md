<p align="center">
<h1 align="center">img2web</h1>
</p>

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Website URL](#website-url)
- [Project description](#project-description)
- [Installation](#installation)
  - [Dependencies](#dependencies)
- [Things I've learned](#things-ive-learned)
- [Development](#development)

## Website URL
-

## Project description
A CLI tool for converting bulk images to compressed, resized WEBP images


## Installation
```
npm i
node index.js
```

### Dependencies
```json
"sharp": "^0.32.6"
```

## Things I've learned
- I was able to 2x the performance, from avg 1000ms / file, to 500ms / file, by using not getting the metadata for each file. Instead, I use the built-in fit functionality, to fit images "inside". This effectively "preserves the aspect ratio and resizes the image to be as large as possible while ensuring its dimensions are less than or equal to both those specified" (according to the [sharp docs](https://sharp.pixelplumbing.com/api-resize))
  
## Development
To get a development build, run `npm run dev`

