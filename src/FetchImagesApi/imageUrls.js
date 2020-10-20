export const Pixabay = (props) => {

  const firstdigit = (number) => {
    while (number >= 10) number /= 10;
    return number;
  };

  var API_KEY = "15071280-4e3db6fe3ff8390e13b2cdfe5";
  var URL =
    "https://pixabay.com/api/?key=" +
    API_KEY +
    "&q=" +
    encodeURIComponent(`${props.searchString}`);

  useEffect(() => {
    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.total !== (0 || null)) {
          var imageUrls = [];
          var data = {};
          for (var i = 0; i < 5; i++) {
            var widthNumber = res.hits[i].imageWidth;
            var heightNumber = res.hits[i].imageHeight;
            data = {
              src: res.hits[i].imageURL,
              width: firstdigit(widthNumber) / 2,
              height: firstdigit(heightNumber) / 2,
            };
            imageUrls.push(data);
          }
          setLoaded(true);
          setImagesJSON(imageUrls);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

}
