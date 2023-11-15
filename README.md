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
- [Benchmark](#benchmark)
  - [Highest effort (6)](#highest-effort-6)
- [Default effort (4)](#default-effort-4)
- [Lowest effort (0)](#lowest-effort-0)
- [Development](#development)

## Website URL
- TBD

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

## Benchmark
- Task: Resize, convert and compress JPG images from Unsplash to 1920x1080 WEBP images (for optimal web performance)
- File size: 633 KB to 9033 KB
- Dimensions: 1845x2767 to 7486x4993
- Different orientations and aspect ratios
- Parameters: Quality: 75, Effort: 6
- Note: % of file reduction is the same for both versions, since the code change did not affect the compression algorithm

-TL:DR, the new version is 2x faster than the old version (same amount of compression and same quality)

### Highest effort (6)
| Parameter     | Description              | Version 1                | Version 2                | Version 3                |
|---------------|--------------------------|--------------------------|--------------------------|--------------------------|
| Effort        | Scale: 0-6               | 6                        | 6                        | 6                        | 
| Quality       | Scale: 0-100             | 75                       | 75                       | 75                       |
| Nr of Files   | Number of files          | 100                      | 100                      | 100                      |
| Avg Time (ms) | Average processing time  | 1366.71                  | 510.08                   | 157.71                   |

128.07ms
110.35
## Default effort (4)
| Parameter     | Description              | Version 1                | Version 2                | Version 3                |
|---------------|--------------------------|--------------------------|--------------------------|--------------------------|
| Effort        | Scale: 0-6               | 4                        | 4                        | 4                        |
| Quality       | Scale: 0-100             | 75                       | 75                       | 75                       |
| Nr of Files   | Number of files          | 100                      | 100                      | 100                      |
| Avg Time (ms) | Average processing time  | 966.16                   | 402.87                   | 128.07                   |

## Lowest effort (0)
| Parameter     | Description              | Version 1                | Version 2                | Version 3                |
|---------------|--------------------------|--------------------------|--------------------------|--------------------------|
| Effort        | Scale: 0-6               | 0                        | 0                        | 0                        |
| Quality       | Scale: 0-100             | 75                       | 75                       | 75                       |
| Nr of Files   | Number of files          | 100                      | 100                      | 100                      |
| Avg Time (ms) | Average processing time  | 714.79                   | 337.76                   | 110.35                   |

  
## Development
To get a development build, run `npm run dev`

