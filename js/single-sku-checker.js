//Setup the sidenav
document.addEventListener("DOMContentLoaded", function() {
  $("#submit").click(function(event) {
    var productSku = $("#product_sku").val();
    var brandCode = $("#brand_code").val();
    var zip = $("#zip").val();
    singleCheck(productSku, brandCode, zip);
  });
});

//Loops through the JSON and calls the API
function singleCheck(productSku, brandCode, zip) {
  data = {
    getDlvrCalRequest: {
      country: "USA", // this can be static
      locationType: "1", // this can be static
      productSku: productSku, // this will be the dynamic SKU value that will change for every product
      siteId: "18F", // this can be static
      sourceSystem: "web", // this can be static
      zipCode: zip, // this can be static
      brandCode: brandCode // this will be the dynamic brandCode value that will change for every product
    }
  };

  makePost("", data, success_f, error_f);
}
