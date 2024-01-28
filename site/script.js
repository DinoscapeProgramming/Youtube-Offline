const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const ytmux = require('ytdl-core-muxer');
const moment = require('moment');
const fs = require('fs');
const https = require('https');
const path = require('path');

["videos", "authors"].forEach((directory) => {
  if (!fs.readdirSync(path.dirname(path.dirname(__dirname))).includes(directory)) {
    fs.mkdirSync(path.join(path.dirname(path.dirname(__dirname)), directory));
  };
});
if (!fs.readdirSync(path.dirname(path.dirname(__dirname))).includes("data.json")) fs.writeFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), JSON.stringify({}));

Array.apply(null, Array(Math.ceil(Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))).length / 4))).forEach((_, videoRowIndex) => {
  let videoRow = document.createElement("div");
  videoRow.style.display = "flex";
  videoRow.style.flexDirection = "row";
  videoRow.style.marginTop = "15px";
  videoRow.style.marginRight = "-10px";
  Array.apply(null, Array(4)).forEach((_, videoElementIndex) => {
    let videoElement = document.createElement("div");
    videoElement.style.cursor = (((videoRowIndex * 4) + videoElementIndex) < Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))).length) ? "pointer" : "initial";
    videoElement.style.opacity = Number(((videoRowIndex * 4) + videoElementIndex) < Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))).length).toString();
    videoElement.style.marginRight = "10px";
    if (((videoRowIndex * 4) + videoElementIndex) < Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))).length) {
      if (document.getElementById("videoContainer").children[0]?.children[0]?.tagName === "H2") document.getElementById("videoContainer").children[0].remove();
      videoElement.addEventListener("click", () => {
        document.getElementById("videoSelectContainer").style.display = "none";
        document.getElementById("videoViewContainer").style.display = "flex";
        document.getElementById("videoElement").src = path.join(path.dirname(path.dirname(__dirname)), "videos/" + Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"))))[(videoRowIndex * 4) + videoElementIndex] + ".mp4");
        document.getElementById("videoElement").play();
      });
      let videoElementThumbnail = document.createElement("img");
      videoElementThumbnail.src = path.join(path.dirname(path.dirname(__dirname)), "videos/" + Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"))))[(videoRowIndex * 4) + videoElementIndex] + ".jpg");
      videoElementThumbnail.style.width = "100%";
      videoElementThumbnail.style.borderRadius = "12.5px";
      let videoElementData = document.createElement("div");
      videoElementData.style.display = "flex";
      videoElementData.style.flexDirection = "row";
      videoElementData.style.marginTop = "8.5px";
      let videoElementAuthorProfilePicture = document.createElement("img");
      videoElementAuthorProfilePicture.src = path.join(path.dirname(path.dirname(__dirname)), "authors/" + JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))[Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"))))[(videoRowIndex * 4) + videoElementIndex]].authorId + ".jpg");
      videoElementAuthorProfilePicture.style.width = "10.5%";
      videoElementAuthorProfilePicture.style.height = "10.5%";
      videoElementAuthorProfilePicture.style.aspectRatio = "1 / 1";
      videoElementAuthorProfilePicture.style.borderRadius = "50%";
      let videoElementTextData = document.createElement("div");
      videoElementTextData.style.display = "flex";
      videoElementTextData.style.flexDirection = "column";
      videoElementTextData.style.color = "#f1f1f1";
      videoElementTextData.style.marginLeft = "10px";
      videoElementTextData.style.fontFamily = "Roboto, Arial, sans-serif";
      videoElementTextData.style.fontSize = "14.5px";
      let videoElementTitle = document.createElement("h3");
      videoElementTitle.style.margin = "0";
      videoElementTitle.style.paddingTop = "2.5px";
      videoElementTitle.style.textOverflow = "ellipsis";
      videoElementTitle.style.overflow = "hidden";
      videoElementTitle.style.whiteSpace = "nowrap";
      videoElementTitle.style.maxWidth = "calc(25vw - 60px)";
      videoElementTitle.innerText = JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))[Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"))))[(videoRowIndex * 4) + videoElementIndex]].title;
      let videoElementAdditionalData = document.createElement("div");
      videoElementAdditionalData.style.color = "#9f9f9f";
      videoElementAdditionalData.style.fontSize = "13px";
      let videoElementAuthorName = document.createElement("p");
      videoElementAuthorName.style.margin = "0";
      videoElementAuthorName.style.paddingTop = "5px";
      videoElementAuthorName.innerText = JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))[Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"))))[(videoRowIndex * 4) + videoElementIndex]].authorName;
      let videoElementFurtherData = document.createElement("p");
      videoElementFurtherData.style.margin = "0";
      videoElementFurtherData.style.paddingTop = "2px";
      videoElementFurtherData.innerText = (new Intl.NumberFormat()).format(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))[Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"))))[(videoRowIndex * 4) + videoElementIndex]].viewCount) + " Aufrufe · " + moment(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))[Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"))))[(videoRowIndex * 4) + videoElementIndex]].publishDate).locale(navigator.language).fromNow();
      videoElementAdditionalData.appendChild(videoElementAuthorName);
      videoElementAdditionalData.appendChild(videoElementFurtherData);
      videoElementTextData.appendChild(videoElementTitle);
      videoElementTextData.appendChild(videoElementAdditionalData);
      videoElementData.appendChild(videoElementAuthorProfilePicture);
      videoElementData.appendChild(videoElementTextData);
      videoElement.appendChild(videoElementThumbnail);
      videoElement.appendChild(videoElementData);
    } else {
      let videoElementThumbnail = document.createElement("img");
      videoElementThumbnail.src = "../assets/loadingSpinner.gif";
      videoElementThumbnail.style.width = "100%";
      videoElementThumbnail.style.borderRadius = "12.5px";
      videoElement.appendChild(videoElementThumbnail);
    };
    videoRow.appendChild(videoElement);
  });
  document.getElementById("videoContainer").appendChild(videoRow);
});

document.getElementById("downloadButton").addEventListener("click", () => {
  let downloadVideo = (downloadLink) => {
    if (Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))).includes(downloadLink.split("/")[3].split("=")[1].split("&")[0])) return;
    return new Promise((resolve, reject) => {
      ytdl.getInfo(downloadLink).then(({
        videoDetails: {
          videoId,
          title,
          lengthSeconds,
          viewCount,
          publishDate,
          author: {
            id: authorId,
            name: authorName
          },
          thumbnails
        },
        formats
      }) => {
        fs.writeFile(path.join(path.dirname(path.dirname(__dirname)), "data.json"), JSON.stringify({
          ...JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"))) || {},
          ...{
            [videoId]: {
              title, lengthSeconds, viewCount, publishDate, authorId, authorName
            }
          }
        }), async () => {
          https.get(thumbnails.at(-1).url, (thumbnail) => {
            thumbnail.pipe(fs.createWriteStream(path.join(path.dirname(path.dirname(__dirname)), "videos/" + videoId + ".jpg")));
          });
          fetch("https://www.googleapis.com/youtube/v3/channels?part=snippet&id=" + authorId + "&fields=items%2Fsnippet%2Fthumbnails&key=AIzaSyBLkGw0AM5nNQhAyRQHVI0SNp_5J-TrGCg")
          .then((response) => response.json())
          .then(({
            items: [
              {
                snippet: {
                  thumbnails: {
                    default: {
                      url: authorProfilePictureURL
                    }
                  }
                }
              }
            ]
          }) => {
            https.get(authorProfilePictureURL, (authorProfilePicture) => {
              authorProfilePicture.pipe(fs.createWriteStream(path.join(path.dirname(path.dirname(__dirname)), "authors/" + authorId + ".jpg")));
            });
          });
          resolve(ytmux(downloadLink).pipe(fs.createWriteStream(path.join(path.dirname(path.dirname(__dirname)), "videos/" + videoId + ".mp4"))));
        });
      });
    });
  };
  if (document.getElementById("downloadLinkInput").value.split("/")[3]?.startsWith("watch")) {
    let downloadLink = document.getElementById("downloadLinkInput").value;
    document.getElementById("downloadLinkInput").value = "";
    if (document.getElementById("videoContainer").children[0]?.children[0]?.tagName === "H2") document.getElementById("videoContainer").children[0].remove();
    if (Array.from(Array.from(document.getElementById("videoContainer").children || [])?.at(-1)?.children || [])?.find((videoElement) => videoElement?.style?.opacity === "0")) {
      Array.from(Array.from(document.getElementById("videoContainer").children).at(-1).children).find((videoElement) => videoElement?.style.opacity === "0").style.opacity = "1";
    } else {
      let videoRow = document.createElement("div");
      videoRow.style.display = "flex";
      videoRow.style.flexDirection = "row";
      videoRow.style.marginTop = "15px";
      videoRow.style.marginRight = "-10px";
      Array.apply(null, Array(4)).forEach((_, videoElementIndex) => {
        let videoElement = document.createElement("div");
        videoElement.style.opacity = Number(!videoElementIndex).toString();
        videoElement.style.cursor = (videoElementIndex) ? "initial" : "pointer";
        videoElement.style.marginRight = "10px";
        let videoElementThumbnail = document.createElement("img");
        videoElementThumbnail.src = "../assets/loadingSpinner.gif";
        videoElementThumbnail.style.width = "100%";
        videoElementThumbnail.style.borderRadius = "12.5px";
        videoElement.appendChild(videoElementThumbnail);
        videoRow.appendChild(videoElement);
      });
      document.getElementById("videoContainer").appendChild(videoRow);
    };
    downloadVideo(downloadLink).then((downloadedVideo) => {
      downloadedVideo.on("finish", () => {
        let videoElementData = document.createElement("div");
        videoElementData.style.display = "flex";
        videoElementData.style.flexDirection = "row";
        videoElementData.style.marginTop = "8.5px";
        let videoElementAuthorProfilePicture = document.createElement("img");
        videoElementAuthorProfilePicture.src = path.join(path.dirname(path.dirname(__dirname)), "authors/" + JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))[Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))).at(-1)].authorId + ".jpg");
        videoElementAuthorProfilePicture.style.width = "10.5%";
        videoElementAuthorProfilePicture.style.height = "10.5%";
        videoElementAuthorProfilePicture.style.aspectRatio = "1 / 1";
        videoElementAuthorProfilePicture.style.borderRadius = "50%";
        let videoElementTextData = document.createElement("div");
        videoElementTextData.style.display = "flex";
        videoElementTextData.style.flexDirection = "column";
        videoElementTextData.style.color = "#f1f1f1";
        videoElementTextData.style.marginLeft = "10px";
        videoElementTextData.style.fontFamily = "Roboto, Arial, sans-serif";
        videoElementTextData.style.fontSize = "14.5px";
        let videoElementTitle = document.createElement("h3");
        videoElementTitle.style.margin = "0";
        videoElementTitle.style.paddingTop = "2.5px";
        videoElementTitle.style.textOverflow = "ellipsis";
        videoElementTitle.style.overflow = "hidden";
        videoElementTitle.style.whiteSpace = "nowrap";
        videoElementTitle.style.maxWidth = "calc(25vw - 60px)";
        videoElementTitle.innerText = JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))[Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))).at(-1)].title;
        let videoElementAdditionalData = document.createElement("div");
        videoElementAdditionalData.style.color = "#9f9f9f";
        videoElementAdditionalData.style.fontSize = "13px";
        let videoElementAuthorName = document.createElement("p");
        videoElementAuthorName.style.margin = "0";
        videoElementAuthorName.style.paddingTop = "5px";
        videoElementAuthorName.innerText = JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))[Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))).at(-1)].authorName;
        let videoElementFurtherData = document.createElement("p");
        videoElementFurtherData.style.margin = "0";
        videoElementFurtherData.style.paddingTop = "2px";
        videoElementFurtherData.innerText = (new Intl.NumberFormat()).format(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))[Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))).at(-1)].viewCount) + " Aufrufe · " + moment(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))[Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))).at(-1)].publishDate).locale(navigator.language).fromNow();
        videoElementAdditionalData.appendChild(videoElementAuthorName);
        videoElementAdditionalData.appendChild(videoElementFurtherData);
        videoElementTextData.appendChild(videoElementTitle);
        videoElementTextData.appendChild(videoElementAdditionalData);
        videoElementData.appendChild(videoElementAuthorProfilePicture);
        videoElementData.appendChild(videoElementTextData);
        Array.from(Array.from(document.getElementById("videoContainer").children).at(-1).children).find((videoElement) => (videoElement.style.opacity === "1") && videoElement.children[0].src.endsWith("/assets/loadingSpinner.gif")).appendChild(videoElementData);
        Array.from(Array.from(document.getElementById("videoContainer").children).at(-1).children).find((videoElement) => (videoElement.style.opacity === "1") && videoElement.children[0].src.endsWith("/assets/loadingSpinner.gif")).style.cursor = "pointer";
        Array.from(Array.from(document.getElementById("videoContainer").children).at(-1).children).find((videoElement) => (videoElement.style.opacity === "1") && videoElement.children[0].src.endsWith("/assets/loadingSpinner.gif")).addEventListener("click", () => {
          document.getElementById("videoSelectContainer").style.display = "none";
          document.getElementById("videoViewContainer").style.display = "flex";
          document.getElementById("videoElement").src = path.join(path.dirname(path.dirname(__dirname)), "videos/" + Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))).at(-1) + ".mp4");
          document.getElementById("videoElement").play();
        });
        Array.from(Array.from(document.getElementById("videoContainer").children).at(-1).children).find((videoElement) => (videoElement.style.opacity === "1") && videoElement.children[0].src.endsWith("/assets/loadingSpinner.gif")).children[0].src = path.join(path.dirname(path.dirname(__dirname)), "videos/" + Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))).at(-1) + ".jpg");
      });
    });
  } else if (document.getElementById("downloadLinkInput").value.split("/")[3]?.startsWith("playlist")) {
    let downloadLink = document.getElementById("downloadLinkInput").value;
    document.getElementById("downloadLinkInput").value = "";
    fetch("https://www.googleapis.com/youtube/v3/playlistItems?playlistId=" + downloadLink.split("/")[3].split("=")[1].split("&")[0] + "&part=snippet,id&key=AIzaSyBLkGw0AM5nNQhAyRQHVI0SNp_5J-TrGCg")
    .then((response) => response.json())
    .then(({ items }) => {
      items.forEach(({
        resourceId: {
          videoId
        }
      }) => {
        if (document.getElementById("videoContainer").children[0]?.children[0]?.tagName === "H2") document.getElementById("videoContainer").children[0].remove();
        if (Array.from(Array.from(document.getElementById("videoContainer").children || [])?.at(-1)?.children || []).find((videoElement) => videoElement?.style?.opacity === "0")) {
          Array.from(Array.from(document.getElementById("videoContainer").children).at(-1).children).find((videoElement) => videoElement.style.opacity === "0").style.opacity = "1";
        } else {
          let videoRow = document.createElement("div");
          videoRow.style.display = "flex";
          videoRow.style.flexDirection = "row";
          videoRow.style.marginTop = "15px";
          videoRow.style.marginRight = "-10px";
          Array.apply(null, Array(4)).forEach((_, videoElementIndex) => {
            let videoElement = document.createElement("div");
            videoElement.style.opacity = Number(!videoElementIndex).toString();
            videoElement.style.cursor = (videoElementIndex) ? "initial" : "pointer";
            videoElement.style.marginRight = "10px";
            let videoElementThumbnail = document.createElement("img");
            videoElementThumbnail.src = "../assets/loadingSpinner.gif";
            videoElementThumbnail.style.width = "100%";
            videoElementThumbnail.style.borderRadius = "12.5px";
            videoElement.appendChild(videoElementThumbnail);
            videoRow.appendChild(videoElement);
          });
          document.getElementById("videoContainer").appendChild(videoRow);
        };
        downloadVideo(videoId).then((downloadedVideo) => {
          downloadedVideo.on("finish", () => {
            let videoElementData = document.createElement("div");
            videoElementData.style.display = "flex";
            videoElementData.style.flexDirection = "row";
            videoElementData.style.marginTop = "8.5px";
            let videoElementAuthorProfilePicture = document.createElement("img");
            videoElementAuthorProfilePicture.src = path.join(path.dirname(path.dirname(__dirname)), "authors/" + JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))[Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))).at(-1)].authorId + ".jpg");
            videoElementAuthorProfilePicture.style.width = "10.5%";
            videoElementAuthorProfilePicture.style.height = "10.5%";
            videoElementAuthorProfilePicture.style.aspectRatio = "1 / 1";
            videoElementAuthorProfilePicture.style.borderRadius = "50%";
            let videoElementTextData = document.createElement("div");
            videoElementTextData.style.display = "flex";
            videoElementTextData.style.flexDirection = "column";
            videoElementTextData.style.color = "#f1f1f1";
            videoElementTextData.style.marginLeft = "10px";
            videoElementTextData.style.fontFamily = "Roboto, Arial, sans-serif";
            videoElementTextData.style.fontSize = "14.5px";
            let videoElementTitle = document.createElement("h3");
            videoElementTitle.style.margin = "0";
            videoElementTitle.style.paddingTop = "2.5px";
            videoElementTitle.style.textOverflow = "ellipsis";
            videoElementTitle.style.overflow = "hidden";
            videoElementTitle.style.whiteSpace = "nowrap";
            videoElementTitle.style.maxWidth = "calc(25vw - 60px)";
            videoElementTitle.innerText = JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))[Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))).at(-1)].title;
            let videoElementAdditionalData = document.createElement("div");
            videoElementAdditionalData.style.color = "#9f9f9f";
            videoElementAdditionalData.style.fontSize = "13px";
            let videoElementAuthorName = document.createElement("p");
            videoElementAuthorName.style.margin = "0";
            videoElementAuthorName.style.paddingTop = "5px";
            videoElementAuthorName.innerText = JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))[Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))).at(-1)].authorName;
            let videoElementFurtherData = document.createElement("p");
            videoElementFurtherData.style.margin = "0";
            videoElementFurtherData.style.paddingTop = "2px";
            videoElementFurtherData.innerText = (new Intl.NumberFormat()).format(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))[Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))).at(-1)].viewCount) + " Aufrufe · " + moment(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))[Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))).at(-1)].publishDate).locale(navigator.language).fromNow();
            videoElementAdditionalData.appendChild(videoElementAuthorName);
            videoElementAdditionalData.appendChild(videoElementFurtherData);
            videoElementTextData.appendChild(videoElementTitle);
            videoElementTextData.appendChild(videoElementAdditionalData);
            videoElementData.appendChild(videoElementAuthorProfilePicture);
            videoElementData.appendChild(videoElementTextData);
            Array.from(Array.from(document.getElementById("videoContainer").children).at(-1).children).find((videoElement) => (videoElement.style.opacity === "1") && videoElement.children[0].src.endsWith("/assets/loadingSpinner.gif")).appendChild(videoElementData);
            Array.from(Array.from(document.getElementById("videoContainer").children).at(-1).children).find((videoElement) => (videoElement.style.opacity === "1") && videoElement.children[0].src.endsWith("/assets/loadingSpinner.gif")).style.cursor = "pointer";
            Array.from(Array.from(document.getElementById("videoContainer").children).at(-1).children).find((videoElement) => (videoElement.style.opacity === "1") && videoElement.children[0].src.endsWith("/assets/loadingSpinner.gif")).addEventListener("click", () => {
              document.getElementById("videoSelectContainer").style.display = "none";
              document.getElementById("videoViewContainer").style.display = "flex";
              document.getElementById("videoElement").src = path.join(path.dirname(path.dirname(__dirname)), "videos/" + Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))).at(-1) + ".mp4");
              document.getElementById("videoElement").play();
            });
            Array.from(Array.from(document.getElementById("videoContainer").children).at(-1).children).find((videoElement) => (videoElement.style.opacity === "1") && videoElement.children[0].src.endsWith("/assets/loadingSpinner.gif")).children[0].src = path.join(path.dirname(path.dirname(__dirname)), "videos/" + Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json")))).at(-1) + ".jpg");
          });
        });
      });
    }).catch(() => {});
  };
});

document.getElementById("closeVideoButton").addEventListener("click", () => {
  document.getElementById("videoSelectContainer").style.display = "block";
  document.getElementById("videoViewContainer").style.display = "none";
  document.getElementById("videoElement").pause();
  document.getElementById("videoElement").currentTime = 0;
});
