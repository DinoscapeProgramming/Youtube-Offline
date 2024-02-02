# Youtube Offline
 A lightweight YouTube video downloader enabling offline viewing of your favorite content.

## Installation
- Go to https://github.com/DinoscapeProgramming/Youtube-Offline/releases/tag/1.0.0
- Download the executable
- Open the executable
- Go through the installer
- Thanks for using ___Youtube Offline___

## How to package the program itself

- Remember to head into ```node_modules``` after you typed ```npm install```
- Then go to ```ytdl-core-muxer```
- Head to ```index.js```-file
- Change the use of ```ffmpegPath``` in line ```21``` to ```ffmpegPath.replace("app.asar", "app.asar.unpacked")``` (you should know why if you're an electron dev)
- Run ```npm run build```
- You just packaged Youtube Offline, idk why you wouldn't just run the installer instead of creating your own, but now you probably feel cool even though you're a discord mod ;)