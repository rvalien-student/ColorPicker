
// Class to hold RGB settings
class rgbColors {
  constructor() {
    this.rgb = { "redValue" : "0", "greenValue" : "0", "blueValue" : "0" };
  }
};

$(function() {
  // Create RGB settings object
  colors = new rgbColors();

  // Reset input defaults (Firefox)
  $("#redValue").val(colors.rgb["redValue"]);
  $("#greenValue").val(colors.rgb["greenValue"]);
  $("#blueValue").val(colors.rgb["blueValue"]);

  // Event handler for RGB red change
  $("#redValue").change(function(e) {
    rgbChange($("#redValue"));
    e.preventDefault();
  });
  // Event handler for RGB green change
  $("#greenValue").change(function(e) {
    rgbChange($("#greenValue"));
    e.preventDefault();
  });
  // Event handler for RGB blue change
  $("#blueValue").change(function(e) {
    rgbChange($("#blueValue"));
    e.preventDefault();
  });

  // Trigger event to update app
  $("#redValue").trigger("change");

  console.log(getRedirectURL('index.html'));
});

// RGB change, update app
function rgbChange($userEntry) {
  var errMsgOpacity = 0;
    if (validateRGBEntry($userEntry)) {
      colors.rgb[$userEntry.attr("id")] = $userEntry.val();
      updateBMHValues();
      updateColorSquare();
    } else {
      errMsgOpacity = 1;
      $userEntry.val(colors.rgb[$userEntry.attr("id")])
    }
    $("#rgbContainer .errorMessage").css("opacity", errMsgOpacity);
}

// RGB color setting validation
function validateRGBEntry($userEntry) {
  return $userEntry.val().length != 0
    && $userEntry.val() >= 0
    && $userEntry.val() <= 255;
}

// Update color square to new RGB settings
function updateColorSquare() {
  rgbString = "rgb("
    + colors.rgb["redValue"] + ","
    + colors.rgb["greenValue"] + ","
    + colors.rgb["blueValue"] + ")";
  $("#colorSquare").css("background-color", rgbString);
}

// Update from RGB values to ρɣβL
function updateBMHValues() {
  
  // Number of decimal places
  let numDecimalDigits = 1;

  // Barycentric Maxwell hues
  var rho = 0.3;
  var gamma = 0.3;
  var beta = 0.3;

  // RGB values
  var rgbRed = parseFloat(colors.rgb["redValue"]);
  var rgbGreen = parseFloat(colors.rgb["greenValue"]);
  var rgbBlue = parseFloat(colors.rgb["blueValue"]);
  let rgbSum = rgbRed + rgbGreen + rgbBlue;

  // Calculate ρ, ɣ, β
  if(rgbSum != 0) {
    let rgbQuotient = 1 / rgbSum;
    rho = roundFloat(rgbRed * rgbQuotient, numDecimalDigits);
    gamma = roundFloat(rgbGreen * rgbQuotient, numDecimalDigits);
    beta = roundFloat(rgbBlue * rgbQuotient, numDecimalDigits);
  }
  // Calculate L
  let luminance = roundFloat(Math.max(rgbRed, rgbGreen, rgbBlue) / 255, numDecimalDigits);

  // Output conversion (RGB -> BMH)
  $("#rho").text(rho.toFixed(numDecimalDigits));
  $("#gamma").text(gamma.toFixed(numDecimalDigits));
  $("#beta").text(beta.toFixed(numDecimalDigits));
  $("#luminance").text(luminance.toFixed(numDecimalDigits));
}

// Rounf float up to specified decimal gigits
function roundFloat(aFloat, numDecimalPlaces) {
  return Math.round(aFloat * (10 * numDecimalPlaces)) / (10 * numDecimalPlaces);
}


// Build full path (absolute) URL string
getRedirectURL = (targetStr) => {
  var url = (window.location.href.split('/'));
  url[url.length - 1] = targetStr;
  return url.join('/');
};