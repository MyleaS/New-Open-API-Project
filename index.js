console.log("Hello, OpenAPI!");
fetch("https://api.sampleapis.com/coffee/hot")
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => console.log(data));
