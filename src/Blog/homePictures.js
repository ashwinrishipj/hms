import React, { useState, useEffect } from "react";
import UploadData from "./uploadStatus/UploadStatus";
import "./home.css";
import { PostsNotifications } from "./homeNotifications/userGroups";
import { ChatNotifiactaions } from "./homeNotifications/chatNotifications";
import { ImageGrid } from "../helpers/ImageGrid";

const firstdigit = (number) => {
  while (number >= 10) number /= 10;
  return number;
};

const defaultImages = [];

fetch(`https://picsum.photos/v2/list`)
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    var result = res;
    if (result[0].id !== (null || "")) {
      var data = {};
      for (var i = 0; i < 21; i++) {
        var widthNumber = result[i].width;
        var heightNumber = result[i].height;
        data = {
          src: result[i].download_url,
          width: firstdigit(widthNumber),
          height: firstdigit(heightNumber),
        };
        defaultImages.push(data);
      }
    }
  })
  .catch((err) => {
    console.log("error in fetching loreum ipsum:->", err);
    return err;
  });

function PicturesDisplay(props) {
  const [loaded, setLoaded] = useState(false);
  const [imagesJSON, setImagesJSON] = useState(null);

  var imageUrls = [];
  var searchString = props.searchedContent;

  const unsplash = () => {
    const client_id =
      "04ef34af0d8524c97d17ff1bfe9e132596c0a4439229e6da1c3b8e0b31e9eb31";
    var query = searchString;

    fetch(
      `https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}`
    )
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(`respose from unsplash ${res}`);
        if (res.results[0].urls.thumb !== (null || "")) {
          var data = {};
          for (var i = 0; i < 10; i++) {
            var widthNumber = res.results[i].width;
            var heightNumber = res.results[i].height;
            data = {
              src: res.results[i].urls.regular,
              width: firstdigit(widthNumber),
              height: firstdigit(heightNumber),
            };
            imageUrls.push(data);
          }
          setImagesJSON(imageUrls);
          console.log("images json ", imagesJSON);
        }
      })
      .catch((err) => {
        console.log("error in fetching unsplash:->", err);
        return err;
      });
  };

  const pixabay = () => {
    var API_KEY = "15071280-4e3db6fe3ff8390e13b2cdfe5";
    var URL =
      "https://pixabay.com/api/?key=" +
      API_KEY +
      "&q=" +
      encodeURIComponent(`${searchString}`);
    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.total !== (0 || null)) {
          var pixabayData = {};
          for (var i = 0; i < 5; i++) {
            var widthNumber = res.hits[i].imageWidth;
            var heightNumber = res.hits[i].imageHeight;
            pixabayData = {
              src: res.hits[i].imageURL,
              width: firstdigit(widthNumber) / 2,
              height: firstdigit(heightNumber) / 2,
            };
            imageUrls.push(pixabayData);
          }

          setLoaded(true);
          setImagesJSON(imageUrls);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    unsplash();
    pixabay();
  }, []);

  var displayPictures;
  if (props.searchedContent !== "") {
    displayPictures = true;
    var searchContent = props.searchedContent;
  } else {
    displayPictures = false;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 ml-0">
          <PostsNotifications />
          <ChatNotifiactaions />
        </div>

        <div className="col-lg-10 mt-4">
          <UploadData />
          {displayPictures ? (
            <div>
              {loaded ? (
                <ImageGrid images={imagesJSON} />
              ) : (
                <div className="d-flex justify-content-center">
                  <div className="spinner-grow text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <ImageGrid images={defaultImages} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PicturesDisplay;
