$(document).ready(function() {
  function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  }

  function onReaderLoad(event) {
    console.log(event.target.result);
    var obj = JSON.parse(event.target.result);
    console.log(obj);
    parseJson(obj);
  }
  document.getElementById("input").addEventListener("change", onChange);
});

//Loops through the JSON and calls the API
function parseJson(json) {
  var i = 0;
  for (i = 0; i < json.length; i++) {
    data = {
      getDlvrCalRequest: {
        country: "USA", // this can be static
        locationType: "1", // this can be static
        productSku: json[i]["SKU"].toString(), // this will be the dynamic SKU value that will change for every product
        siteId: "18F", // this can be static
        sourceSystem: "web", // this can be static
        zipCode: "11514", // this can be static
        brandCode: json[i]["BrandCode (N)"].toString() // this will be the dynamic brandCode value that will change for every product
      }
    };

    makePost("", data, success_f, error_f);
  }
}
