const ytdl = require('ytdl-core');
const ytmux = require('ytdl-core-muxer');
const moment = require('moment');
const fs = require('fs');
const https = require('https');
const path = require('path');
const { Server } = require('ws');
const ws = new Server({ port: 8080 });

document.getElementById("downloadLinkInput").placeholder = (localStorage.getItem("apiKey")) ? "YouTube Video URL or YouTube Playlist URL": "Google API Key";
document.getElementById("downloadButton").innerText = (localStorage.getItem("apiKey")) ? "Download": "Register";

["videos", "authors"].forEach((directory) => {
  if (!fs.readdirSync(path.dirname(path.dirname(__dirname))).includes(directory)) {
    fs.mkdirSync(path.join(path.dirname(path.dirname(__dirname)), directory));
  };
});
if (!fs.readdirSync(path.dirname(path.dirname(__dirname))).includes("data.json")) fs.writeFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), JSON.stringify({}));

Array.apply(null, Array(Math.ceil(Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))).length / 4))).forEach((_, videoRowIndex) => {
  let videoRow = document.createElement("div");
  videoRow.style.display = "flex";
  videoRow.style.flexDirection = "row";
  videoRow.style.marginTop = "15px";
  videoRow.style.marginRight = "-10px";
  Array.apply(null, Array(4)).forEach((_, videoElementIndex) => {
    let videoElement = document.createElement("div");
    videoElement.dataset.id = Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8")))[(videoRowIndex * 4) + videoElementIndex];
    videoElement.style.cursor = (((videoRowIndex * 4) + videoElementIndex) < Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))).length) ? "pointer" : "initial";
    videoElement.style.opacity = Number(((videoRowIndex * 4) + videoElementIndex) < Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))).length).toString();
    videoElement.style.marginRight = "10px";
    if (((videoRowIndex * 4) + videoElementIndex) < Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))).length) {
      if (document.getElementById("videoContainer").children[0]?.children[0]?.tagName === "H2") document.getElementById("videoContainer").children[0].remove();
      videoElement.addEventListener("click", () => {
        document.body.style.overflow = "hidden";
        document.getElementById("videoSelectContainer").style.display = "none";
        document.getElementById("videoViewContainer").style.display = "flex";
        document.getElementById("videoElement").src = path.join(path.dirname(path.dirname(__dirname)), "videos/" + Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8")))[(videoRowIndex * 4) + videoElementIndex] + ".mp4");
        document.getElementById("videoElement").dataset.id = Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8")))[(videoRowIndex * 4) + videoElementIndex];
        document.getElementById("videoElement").play();
      });
      let videoElementThumbnail = document.createElement("img");
      videoElementThumbnail.src = path.join(path.dirname(path.dirname(__dirname)), "videos/" + Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8")))[(videoRowIndex * 4) + videoElementIndex] + ".jpg");
      videoElementThumbnail.style.width = "100%";
      videoElementThumbnail.style.borderRadius = "12.5px";
      let videoElementData = document.createElement("div");
      videoElementData.style.display = "flex";
      videoElementData.style.flexDirection = "row";
      videoElementData.style.marginTop = "8.5px";
      let videoElementAuthorProfilePicture = document.createElement("img");
      videoElementAuthorProfilePicture.src = path.join(path.dirname(path.dirname(__dirname)), "authors/" + JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))[Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8")))[(videoRowIndex * 4) + videoElementIndex]].authorId + ".jpg");
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
      videoElementTitle.style.maxWidth = "calc(24.5vw - 60px)";
      videoElementTitle.innerText = JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))[Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8")))[(videoRowIndex * 4) + videoElementIndex]].title;
      let videoElementAdditionalData = document.createElement("div");
      videoElementAdditionalData.style.color = "#9f9f9f";
      videoElementAdditionalData.style.fontSize = "13px";
      let videoElementAuthorName = document.createElement("p");
      videoElementAuthorName.style.margin = "0";
      videoElementAuthorName.style.paddingTop = "5px";
      videoElementAuthorName.innerText = JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))[Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8")))[(videoRowIndex * 4) + videoElementIndex]].authorName;
      let videoElementFurtherData = document.createElement("p");
      videoElementFurtherData.style.margin = "0";
      videoElementFurtherData.style.paddingTop = "2px";
      videoElementFurtherData.innerText = (new Intl.NumberFormat()).format(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))[Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8")))[(videoRowIndex * 4) + videoElementIndex]].viewCount) + " Aufrufe · " + moment(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))[Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8")))[(videoRowIndex * 4) + videoElementIndex]].publishDate).locale(navigator.language).fromNow();
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
  if (localStorage.getItem("apiKey")) {
    let downloadLink = (document.getElementById("downloadLinkInput").value.split("/")[3]?.startsWith("shorts")) ? document.getElementById("downloadLinkInput").value.replace("shorts/", "watch?v=") : document.getElementById("downloadLinkInput").value;
    let downloadVideo = (downloadLink) => {
      if (Object.keys(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))).includes(downloadLink.split("/")[3].split("=")[1].split("&")[0])) return;
      return new Promise((resolve) => {
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
          }
        }) => {
          fs.writeFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), JSON.stringify({
            ...JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8")) || {},
            ...{
              [videoId]: {
                title, lengthSeconds, viewCount, publishDate, authorId, authorName
              }
            }
          }), "utf8");
          https.get(thumbnails.at(-1).url, (thumbnail) => {
            thumbnail.pipe(fs.createWriteStream(path.join(path.dirname(path.dirname(__dirname)), "videos/" + videoId + ".jpg")));
          });
          if (!fs.readdirSync(path.join(path.dirname(path.dirname(__dirname)), "authors")).includes(authorId + ".jpg")) {
            fetch("https://www.googleapis.com/youtube/v3/channels?part=snippet&id=" + authorId + "&fields=items%2Fsnippet%2Fthumbnails&key=" + localStorage.getItem("apiKey"))
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
            }).catch(() => {});
          };
          resolve(ytmux(downloadLink).pipe(fs.createWriteStream(path.join(path.dirname(path.dirname(__dirname)), "videos/" + videoId + ".mp4"))));
        });
      });
    };
    if (downloadLink.split("/")[3]?.startsWith("watch")) {
      document.getElementById("downloadLinkInput").value = "";
      if (document.getElementById("videoContainer").children[0]?.children[0]?.tagName === "H2") document.getElementById("videoContainer").children[0].remove();
      if (Array.from(Array.from(document.getElementById("videoContainer").children || [])?.at(-1)?.children || [])?.find((videoElement) => videoElement?.style?.opacity === "0")) {
        Array.from(Array.from(document.getElementById("videoContainer").children).at(-1).children).find((videoElement) => videoElement?.style.opacity === "0").dataset.id = downloadLink.split("/")[3].split("=")[1].split("&")[0];
        Array.from(Array.from(document.getElementById("videoContainer").children).at(-1).children).find((videoElement) => videoElement?.style.opacity === "0").style.cursor = "pointer";
        Array.from(Array.from(document.getElementById("videoContainer").children).at(-1).children).find((videoElement) => videoElement?.style.opacity === "0").style.opacity = "1";
      } else {
        let videoRow = document.createElement("div");
        videoRow.style.display = "flex";
        videoRow.style.flexDirection = "row";
        videoRow.style.marginTop = "15px";
        videoRow.style.marginRight = "-10px";
        Array.apply(null, Array(4)).forEach((_, videoElementIndex) => {
          let videoElement = document.createElement("div");
          videoElement.dataset.id = downloadLink.split("/")[3].split("=")[1].split("&")[0];
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
          videoElementAuthorProfilePicture.src = path.join(path.dirname(path.dirname(__dirname)), "authors/" + JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))[downloadLink.split("/")[3].split("=")[1].split("&")[0]].authorId + ".jpg");
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
          videoElementTitle.style.maxWidth = "calc(24.5vw - 60px)";
          videoElementTitle.innerText = JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))[downloadLink.split("/")[3].split("=")[1].split("&")[0]].title;
          let videoElementAdditionalData = document.createElement("div");
          videoElementAdditionalData.style.color = "#9f9f9f";
          videoElementAdditionalData.style.fontSize = "13px";
          let videoElementAuthorName = document.createElement("p");
          videoElementAuthorName.style.margin = "0";
          videoElementAuthorName.style.paddingTop = "5px";
          videoElementAuthorName.innerText = JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))[downloadLink.split("/")[3].split("=")[1].split("&")[0]].authorName;
          let videoElementFurtherData = document.createElement("p");
          videoElementFurtherData.style.margin = "0";
          videoElementFurtherData.style.paddingTop = "2px";
          videoElementFurtherData.innerText = (new Intl.NumberFormat()).format(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))[downloadLink.split("/")[3].split("=")[1].split("&")[0]].viewCount) + " Aufrufe · " + moment(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))[downloadLink.split("/")[3].split("=")[1].split("&")[0]].publishDate).locale(navigator.language).fromNow();
          videoElementAdditionalData.appendChild(videoElementAuthorName);
          videoElementAdditionalData.appendChild(videoElementFurtherData);
          videoElementTextData.appendChild(videoElementTitle);
          videoElementTextData.appendChild(videoElementAdditionalData);
          videoElementData.appendChild(videoElementAuthorProfilePicture);
          videoElementData.appendChild(videoElementTextData);
          Array.from(document.getElementById("videoContainer").children).reduce((data, currentVideoElement) => [
            ...data,
            ...Array.from(currentVideoElement.children)
          ], []).find((videoElement) => videoElement.dataset.id === downloadLink.split("/")[3].split("=")[1].split("&")[0]).appendChild(videoElementData);
          Array.from(document.getElementById("videoContainer").children).reduce((data, currentVideoElement) => [
            ...data,
            ...Array.from(currentVideoElement.children)
          ], []).find((videoElement) => videoElement.dataset.id === downloadLink.split("/")[3].split("=")[1].split("&")[0]).addEventListener("click", () => {
            document.body.style.overflow = "hidden";
            document.getElementById("videoSelectContainer").style.display = "none";
            document.getElementById("videoViewContainer").style.display = "flex";
            document.getElementById("videoElement").src = path.join(path.dirname(path.dirname(__dirname)), "videos/" + downloadLink.split("/")[3].split("=")[1].split("&")[0] + ".mp4");
            document.getElementById("videoElement").dataset.id = downloadLink.split("/")[3].split("=")[1].split("&")[0];
            document.getElementById("videoElement").play();
          });
          Array.from(document.getElementById("videoContainer").children).reduce((data, currentVideoElement) => [
            ...data,
            ...Array.from(currentVideoElement.children)
          ], []).find((videoElement) => videoElement.dataset.id === downloadLink.split("/")[3].split("=")[1].split("&")[0]).children[0].src = path.join(path.dirname(path.dirname(__dirname)), "videos/" + downloadLink.split("/")[3].split("=")[1].split("&")[0] + ".jpg");
        });
      });
    } else if (downloadLink.split("/")[3]?.startsWith("playlist")) {
      document.getElementById("downloadLinkInput").value = "";
      let downloadPlaylist = (playlistLink) => {
        fetch(playlistLink)
        .then((response) => response.json())
        .then(({ nextPageToken, items }) => {
          items.forEach(({
            snippet: {
              resourceId: {
                videoId
              }
            }
          }) => {
            if (document.getElementById("videoContainer").children[0]?.children[0]?.tagName === "H2") document.getElementById("videoContainer").children[0].remove();
            if (Array.from(Array.from(document.getElementById("videoContainer").children || [])?.at(-1)?.children || []).find((videoElement) => videoElement?.style?.opacity === "0")) {
              Array.from(Array.from(document.getElementById("videoContainer").children).at(-1).children).find((videoElement) => videoElement.style.opacity === "0").dataset.id = videoId;
              Array.from(Array.from(document.getElementById("videoContainer").children).at(-1).children).find((videoElement) => videoElement.style.opacity === "0").style.cursor = "pointer";
              Array.from(Array.from(document.getElementById("videoContainer").children).at(-1).children).find((videoElement) => videoElement.style.opacity === "0").style.opacity = "1";
            } else {
              let videoRow = document.createElement("div");
              videoRow.style.display = "flex";
              videoRow.style.flexDirection = "row";
              videoRow.style.marginTop = "15px";
              videoRow.style.marginRight = "-10px";
              Array.apply(null, Array(4)).forEach((_, videoElementIndex) => {
                let videoElement = document.createElement("div");
                videoElement.dataset.id = videoId;
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
            downloadVideo("https://www.youtube.com/watch?v=" + videoId).then((downloadedVideo) => {
              downloadedVideo.on("finish", () => {
                let videoElementData = document.createElement("div");
                videoElementData.style.display = "flex";
                videoElementData.style.flexDirection = "row";
                videoElementData.style.marginTop = "8.5px";
                let videoElementAuthorProfilePicture = document.createElement("img");
                videoElementAuthorProfilePicture.src = path.join(path.dirname(path.dirname(__dirname)), "authors/" + JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))[videoId].authorId + ".jpg");
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
                videoElementTitle.style.maxWidth = "calc(24.5vw - 60px)";
                videoElementTitle.innerText = JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))[videoId].title;
                let videoElementAdditionalData = document.createElement("div");
                videoElementAdditionalData.style.color = "#9f9f9f";
                videoElementAdditionalData.style.fontSize = "13px";
                let videoElementAuthorName = document.createElement("p");
                videoElementAuthorName.style.margin = "0";
                videoElementAuthorName.style.paddingTop = "5px";
                videoElementAuthorName.innerText = JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))[videoId].authorName;
                let videoElementFurtherData = document.createElement("p");
                videoElementFurtherData.style.margin = "0";
                videoElementFurtherData.style.paddingTop = "2px";
                videoElementFurtherData.innerText = (new Intl.NumberFormat()).format(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))[videoId].viewCount) + " Aufrufe · " + moment(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))[videoId].publishDate).locale(navigator.language).fromNow();
                videoElementAdditionalData.appendChild(videoElementAuthorName);
                videoElementAdditionalData.appendChild(videoElementFurtherData);
                videoElementTextData.appendChild(videoElementTitle);
                videoElementTextData.appendChild(videoElementAdditionalData);
                videoElementData.appendChild(videoElementAuthorProfilePicture);
                videoElementData.appendChild(videoElementTextData);
                Array.from(document.getElementById("videoContainer").children).reduce((data, currentVideoElement) => [
                  ...data,
                  ...Array.from(currentVideoElement.children)
                ], []).find((videoElement) => videoElement.dataset.id === videoId).appendChild(videoElementData);
                Array.from(document.getElementById("videoContainer").children).reduce((data, currentVideoElement) => [
                  ...data,
                  ...Array.from(currentVideoElement.children)
                ], []).find((videoElement) => videoElement.dataset.id === videoId).addEventListener("click", () => {
                  document.body.style.overflow = "hidden";
                  document.getElementById("videoSelectContainer").style.display = "none";
                  document.getElementById("videoViewContainer").style.display = "flex";
                  document.getElementById("videoElement").src = path.join(path.dirname(path.dirname(__dirname)), "videos/" + videoId + ".mp4");
                  document.getElementById("videoElement").dataset.id = videoId;
                  document.getElementById("videoElement").play();
                });
                Array.from(document.getElementById("videoContainer").children).reduce((data, currentVideoElement) => [
                  ...data,
                  ...Array.from(currentVideoElement.children)
                ], []).find((videoElement) => videoElement.dataset.id === videoId).children[0].src = path.join(path.dirname(path.dirname(__dirname)), "videos/" + videoId + ".jpg");
              });
            });
          });
          if (nextPageToken) downloadPlaylist("https://www.googleapis.com/youtube/v3/playlistItems?playlistId=" + downloadLink.split("/")[3].split("=")[1].split("&")[0] + "&part=snippet,id&key=" + localStorage.getItem("apiKey") + "&pageToken=" + nextPageToken);
        }).catch(() => {});
      };
      downloadPlaylist("https://www.googleapis.com/youtube/v3/playlistItems?playlistId=" + downloadLink.split("/")[3].split("=")[1].split("&")[0] + "&part=snippet,id&key=" + localStorage.getItem("apiKey"));
    };
  } else {
    fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&q=&type=video&key=" + document.getElementById("downloadLinkInput").value)
    .then((response) => response.json())
    .then(({ error }) => {
      if (!error) {
        localStorage.setItem("apiKey", document.getElementById("downloadLinkInput").value);
        document.getElementById("downloadLinkInput").value = "";
        document.getElementById("downloadLinkInput").placeholder = "YouTube Video URL or YouTube Playlist URL";
        document.getElementById("downloadButton").innerText = "Download";
      };
    }).catch(() => {});
  };
});

document.getElementById("videoElement").addEventListener("loadedmetadata", () => {
  document.getElementById("videoElement").loop = ((document.getElementById("videoElement").videoWidth / document.getElementById("videoElement").videoHeight) === 0.5625) && (Number(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))[document.getElementById("videoElement").dataset.id].lengthSeconds) <= 61);
});

document.getElementById("deleteVideoButton").addEventListener("click", () => {
  if(confirm("Are you sure you want to irreversibly delete this video?")) {
    document.getElementById("closeVideoButton").click();
    let videoAuthorId = JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))[document.getElementById("videoElement").dataset.id].authorId;
    fs.writeFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), JSON.stringify(Object.entries(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))).filter(([videoId]) => videoId !== document.getElementById("videoElement").dataset.id).reduce((data, [videoId, videoData]) => ({
      ...data,
      ...{
        [videoId]: videoData
      }
    }), {})));
    let videoElementRowIndex = Math.ceil((Array.from(document.getElementById("videoContainer").children).reduce((data, currentVideoElement) => [
      ...data,
      ...Array.from(currentVideoElement.children)
    ], []).map((videoElement, index) => [videoElement, index]).find(([videoElement]) => videoElement.dataset.id === document.getElementById("videoElement").dataset.id)[1] + 1) / 4);
    Array.from(document.getElementById("videoContainer").children).reduce((data, currentVideoElement) => [
      ...data,
      ...Array.from(currentVideoElement.children)
    ], []).find((videoElement) => videoElement.dataset.id === document.getElementById("videoElement").dataset.id).remove();
    Array.apply(null, Array(document.getElementById("videoContainer").children.length - videoElementRowIndex)).forEach((_, videoRowIndex) => {
      document.getElementById("videoContainer").children[videoElementRowIndex + videoRowIndex - 1].appendChild(document.getElementById("videoContainer").children[videoElementRowIndex + videoRowIndex].children[0]);
    });
    if (Array.from(Array.from(document.getElementById("videoContainer").children).at(-1).children).every((videoElement) => videoElement.style.opacity === "0")) {
      Array.from(document.getElementById("videoContainer").children).at(-1).remove();
      if (!document.getElementById("videoContainer").children.length) {
        document.getElementById("videoContainer").innerHTML = `<div
          style="
            border-radius: 12.5px;
            border: 0.75px solid #343232;
            margin-top: 7.5px;
          "
        >
          <h2
            style="
              color: white;
              text-align: center;
              font-family: Roboto, Arial, sans-serif;
            "
          >
            No videos downloaded
          </h2>
        </div>`;
      };
    } else {
      let videoElement = document.createElement("div");
      videoElement.dataset.id = document.getElementById("videoElement").dataset.id;
      videoElement.style.opacity = "0";
      videoElement.style.cursor = "initial";
      videoElement.style.marginRight = "10px";
      let videoElementThumbnail = document.createElement("img");
      videoElementThumbnail.src = "../assets/loadingSpinner.gif";
      videoElementThumbnail.style.width = "100%";
      videoElementThumbnail.style.borderRadius = "12.5px";
      videoElement.appendChild(videoElementThumbnail);
      Array.from(document.getElementById("videoContainer").children).at(-1).appendChild(videoElement);
    };
    fs.unlinkSync(path.join(path.dirname(path.dirname(__dirname)), "videos/" + document.getElementById("videoElement").dataset.id + ".jpg"));
    fs.unlinkSync(path.join(path.dirname(path.dirname(__dirname)), "videos/" + document.getElementById("videoElement").dataset.id + ".mp4"));
    if (!Object.values(JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), "data.json"), "utf8"))).some((videoElement) => videoElement.authorId === videoAuthorId)) {
      fs.unlinkSync(path.join(path.dirname(path.dirname(__dirname)), "authors/" + videoAuthorId + ".jpg"));
    };
  };
});

document.getElementById("closeVideoButton").addEventListener("click", () => {
  document.body.style.overflow = "auto";
  document.getElementById("videoSelectContainer").style.display = "block";
  document.getElementById("videoViewContainer").style.display = "none";
  document.getElementById("videoElement").pause();
  document.getElementById("videoElement").currentTime = 0;
  document.getElementById("videoElement").removeAttribute("src");
});

ws.on("connection", (socket) => {
  socket.on("message", (message) => {
    if (localStorage.getItem("apiKey")) {
      document.getElementById("downloadLinkInput").value = message;
      document.getElementById("downloadButton").click();
    };
  });
});