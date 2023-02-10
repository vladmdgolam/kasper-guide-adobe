/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = app.activeScript.parent.fullName+"/";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/constants.js
var phi = 1.618;
var multipliers = {
  baseText: 1 / Math.pow(phi, 2),
  teaser: 1 / phi,
  h4: 1,
  h3: phi,
  h2: Math.pow(phi, 2),
  h1: Math.pow(phi, 3),
  margin: 1.5
};
var lineHeightCoeff = 1.2;
var order = (/* unused pure expression or super */ null && (["h1", "h2", "h3", "h4", "teaser", "baseText"]));
var names = {
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  teaser: "Teaser",
  baseText: "BaseText"
};
var fractions = [["6:3", 5], ["1:1", 3], ["3:2", 3], ["1:8", 1], ["2:3", 3], ["8:1", 8], ["1:8", 1], ["2:3", 3], ["3:1", 5], ["1:3", 1.5]];
function closestFraction(aspect) {
  // Calculate the absolute difference between the given aspectber and each fraction in the list
  var diffs = [];
  for (var i = 0; i < fractions.length; i++) {
    // let fraction = 1
    var fraction = Number(fractions[i][0][0] / fractions[i][0][1]);
    // for (let j = 0; j < parts.length; j++) {
    //   fraction /= Number(parts[j])
    // }
    diffs.push(Math.abs(fraction - aspect));
  }

  // Find the index of the smallest difference (the closest fraction)
  // const closestIndex = diffs.indexOf(Math.min(...diffs))
  var closestIndex = 0;
  var minDiff = diffs[0];
  for (var _i = 1; _i < diffs.length; _i++) {
    if (diffs[_i] < minDiff) {
      minDiff = diffs[_i];
      closestIndex = _i;
    }
  }

  // Return the value of the closest fraction
  var closest = fractions[closestIndex];
  return [closest[1]];
}
;// CONCATENATED MODULE: ./src/k.svg
var k_namespaceObject = __webpack_require__.p + "d784ccf11141cc61515b.svg";
;// CONCATENATED MODULE: ./src/logo.svg
var logo_namespaceObject = __webpack_require__.p + "4272ee2ecc9a677a0a6f.svg";
;// CONCATENATED MODULE: ./src/alert.js
/// <reference types="types-for-adobe/InDesign/2018"/>



var alert_order = ["h1", "h2", "h3", "h4", "teaser", "baseText"];
var findLineHeight = function findLineHeight(fontSize, baseHeight) {
  return baseHeight * Math.ceil(fontSize / baseHeight);
};
var openDocument = app.activeDocument;
var activePage = openDocument.layoutWindows[0].activePage;
var autoFitProps = {
  // eslint-disable-next-line no-undef
  autoSizingType: AutoSizingTypeEnum.HEIGHT_AND_WIDTH,
  // eslint-disable-next-line no-undef
  autoSizingReferencePoint: AutoSizingReferenceEnum.TOP_LEFT_POINT,
  // eslint-disable-next-line no-undef
  firstBaselineOffset: FirstBaseline.CAP_HEIGHT
};
var resizeRect = function resizeRect(rect, scaleFactor) {
  rect.resize(
  // eslint-disable-next-line no-undef
  CoordinateSpaces.INNER_COORDINATES,
  // eslint-disable-next-line no-undef
  AnchorPoint.TOP_LEFT_ANCHOR,
  // eslint-disable-next-line no-undef
  ResizeMethods.MULTIPLYING_CURRENT_DIMENSIONS_BY, [scaleFactor, scaleFactor]);
};

/* adding logos */
var placeSvg = function placeSvg(url) {
  var rect = activePage.rectangles.add();
  var svg = rect.svgs.add();
  var file = new File(url);
  svg.place(file);
  // eslint-disable-next-line no-undef
  rect.fit(FitOptions.FRAME_TO_CONTENT);
  rect.frameFittingOptions.autoFit = true;
  rect.strokeWeight = 0;
  rect.move([0, 0]);
  return {
    svg: rect.allGraphics[0],
    rect: rect
  };
};
var findKProps = function findKProps(scaleFactor) {
  var _placeSvg = placeSvg(k_namespaceObject),
    kRect = _placeSvg.rect;
  resizeRect(kRect, scaleFactor);
  kRect.move([0, 0]);
  var kDimensions = kRect.geometricBounds;
  var kProps = [kDimensions[2], kDimensions[3]];
  kRect.remove();
  return kProps;
};
var pageBounds = activePage.bounds;
var pageWidth = pageBounds[3];
var pageHeight = pageBounds[2];
var runScript = function runScript(count) {
  var newLayer = openDocument.layers.add();
  var _placeSvg2 = placeSvg(logo_namespaceObject, newLayer),
    rect = _placeSvg2.rect;
  // finding scale
  var imgBounds = rect.geometricBounds;
  var imageWidth = imgBounds[3] - imgBounds[1];
  var scaleFactor = pageWidth / (imageWidth * count);
  resizeRect(rect, scaleFactor);

  // calculate all useful constants
  var kProps = findKProps(scaleFactor);
  var kHeight = kProps[0];
  var kWidth = kProps[1];
  var offset = kWidth * 1.5;

  // move logo to the bottom of the page
  rect.move([offset, pageHeight - rect.geometricBounds[2] - offset]);

  // const rectWidth = rect.geometricBounds[3] - rect.geometricBounds[1]
  // for (let j = 1; j < count; j++) {
  //   const { rect } = placeSvg(img, newLayer)
  //   resizeRect(rect, scaleFactor)
  //   rect.move([j * rectWidth, pageHeight - rect.geometricBounds[2]])
  // }

  /* ADDING TEXT */
  var addTexts = function addTexts() {
    var kasperskyFontRegular = app.fonts.item("Kaspersky Sans Display");
    var kasperskyFont = app.fonts.item("Kaspersky Sans Display	Medium");
    var findkFontSize = function findkFontSize() {
      var textFrame = activePage.textFrames.add();
      textFrame.name = "test";
      textFrame.contents = "TEST";
      var myParagraph = textFrame.paragraphs.item(0);
      myParagraph.properties = {
        appliedFont: kasperskyFont,
        pointSize: 24
      };
      textFrame.textFramePreferences.properties = autoFitProps;
      var textHeight = textFrame.geometricBounds[2];
      var _scaleFactor = kHeight / textHeight;
      myParagraph.pointSize *= _scaleFactor;
      var kFontSize = myParagraph.pointSize;
      textFrame.remove();
      return kFontSize;
    };
    var kFontSize = findkFontSize();
    var offsetY = offset;
    var offsetX = offset;
    var baseLeading = Math.round(lineHeightCoeff * kFontSize * multipliers.baseText);
    for (var i = 0; i < alert_order.length; i++) {
      var key = alert_order[i];
      var fontSize = Math.round(multipliers[key] * kFontSize);
      var leading = findLineHeight(fontSize, baseLeading);
      var textFrame = activePage.textFrames.add();
      textFrame.name = key;
      textFrame.contents = names[key];
      var paragraph = textFrame.paragraphs.item(0);
      paragraph.properties = {
        appliedFont: kasperskyFont,
        pointSize: fontSize,
        noBreak: true,
        leading: leading
      };
      if (key === "teaser" || key === "baseText") paragraph.appliedFont = kasperskyFontRegular;
      textFrame.textFramePreferences.properties = autoFitProps;
      textFrame.move([offsetX, offsetY]);
      offsetY = textFrame.geometricBounds[2] += kWidth / 2;
    }
  };
  addTexts();
  var addGuides = function addGuides() {
    var pageHeight = pageBounds[2] - pageBounds[0];
    activePage.guides.add(undefined, {
      location: offset,
      // eslint-disable-next-line no-undef
      orientation: HorizontalOrVertical.VERTICAL
    });
    activePage.guides.add(undefined, {
      location: pageWidth - offset,
      // eslint-disable-next-line no-undef
      orientation: HorizontalOrVertical.VERTICAL
    });
    activePage.guides.add(undefined, {
      location: offset,
      // eslint-disable-next-line no-undef
      orientation: HorizontalOrVertical.HORIZONTAL
    });
    activePage.guides.add(undefined, {
      location: pageHeight - offset,
      // eslint-disable-next-line no-undef
      orientation: HorizontalOrVertical.HORIZONTAL
    });
  };
  addGuides();

  // —————————————————————————————————————————————
};

var start = function start() {
  var count = Number(closestFraction(pageWidth / pageHeight));
  var dialog = app.dialogs.add({
    name: "Kaspersky Guide",
    canCancel: true
  });
  var column = dialog.dialogColumns.add();
  var panel = column.borderPanels.add();
  panel.staticTexts.add({
    staticLabel: "Logo count"
  });
  var countBox = panel.realComboboxes.add({
    minimumValue: 1,
    maximumValue: 100,
    smallNudge: 1,
    editValue: count
  });
  if (dialog.show() === true) {
    var finalCount = countBox.editValue;
    runScript(finalCount);
  }
};
start();
/******/ })()
;