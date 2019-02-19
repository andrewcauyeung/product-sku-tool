var URL =
  "https://ecommerce.800-flowers.net/mobile/prod/product/v1/getDeliveryCalendar?client_id=c26b5c68-05f5-48b6-950c-a3de31592d1b";

//Makes the post request
function makePost(path, data, success_f, error_f) {
  path = URL + path;
  console.log(data);
  console.log("it", path);
  if (error_f === undefined) {
    error_f = function(exception) {
      console.log("Exeption:" + exception);
    };
  }
  $.ajax({
    url: path,
    method: "POST",
    data: JSON.stringify(data),
    success: function(response) {
      var productSKU = data["getDlvrCalRequest"]["productSku"];
      success_f(response, productSKU);
    },
    contentType: "application/json",
    dataType: "json",
    error: error_f
  });
}

function success_f(data, productSKU) {
  console.log(data);
  if (
    data["getDlvrCalResponse"]["responseStatus"] === "FAILURE" &&
    productSKU != "N/A"
  ) {
    var dropdown = genDropdown();
    console.log("failure " + productSKU);
    $(".unavilable-results").append(
      "<tr>" +
        "<td>" +
        productSKU +
        "</td>" +
        '<td><span class="badge red">UNAVAILABLE</span></td>' +
        "<td>" +
        dropdown +
        "</td>" +
        "</tr>"
    );
    var elems = document.querySelectorAll(".dropdown-trigger");
    var instances = M.Dropdown.init(elems, {
      onOpenStart: function() {
        console.log("I trigger as soon as the page is loaded");
      },
      onCloseEnd: function() {
        console.log("same");
      }
    });
  } else if (
    data["getDlvrCalResponse"]["responseStatus"] === "SUCCESS" &&
    productSKU != "N/A"
  ) {
    console.log("success" + productSKU);
    var dropdown = genDropdown();
    $(".unavilable-results").append(
      "<tr>" +
        "<td>" +
        productSKU +
        "</td>" +
        '<td><span class="badge green">AVAILABLE</span></td>' +
        "<td>" +
        dropdown +
        "</td>" +
        "</tr>"
    );
    var elems = document.querySelectorAll(".dropdown-trigger");
    var instances = M.Dropdown.init(elems, {
      onOpenStart: function() {
        console.log("I trigger as soon as the page is loaded");
      },
      onCloseEnd: function() {
        console.log("same");
      }
    });
  } else {
    console.log("ERRORS");
  }
}

function genDropdown() {
  var dropdownStr =
    "<a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Choose Brand</a>" +
    "<ul id='dropdown1' class='dropdown-content'>";
  var brandCodes = [
    "18F",
    "HD",
    "18B",
    "SCH",
    "FB",
    "CCO",
    "PZU",
    "TPF",
    "WLF",
    "SY",
    "TMP"
  ];

  for (var i = 0; i < brandCodes.length; i++) {
    var link = genSiteLink(brandCodes[i]);
    var temp =
      "<li>" +
      "<a target = '_blank' href=" +
      link +
      ">" +
      brandCodes[i] +
      "</a>" +
      "</li>";
    dropdownStr = dropdownStr.concat(temp);
  }
  var closingTag = "</ul>";

  return dropdownStr.concat(closingTag);
}

function genSiteLink(brandCode, productSKU) {
  var site =
    '"https://www.1800flowers.com/SearchDisplay?catalogId=13302&brandIdTab=' +
    brandCode +
    "_&storeId=20051&langId=-1&currentPage=1&sType=SimpleSearch&resultCatEntryType=2&ip_navtype=search&searchTerm=" +
    productSKU +
    '"';
  return site;
}

function error_f() {}
