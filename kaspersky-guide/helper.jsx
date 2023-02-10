/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
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
var k_namespaceObject = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzEuNDkxMzY0IiBoZWlnaHQ9IjQ2LjgxODg4MyIgdmlld0JveD0iMC43Mjk3MzYgMC44MjgyMTcgMzEuNjQ3OSA0Ni44MTg4ODMiCiAgICBmaWxsPSJub25lIgogICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgo+CiAgICA8cGF0aCBkPSJNOC4xMDEyOCA0Ny43MjQ3SDAuNzI5NzM2VjAuODI4MjE3SDguMTAxMjhWNDcuNzI0N1oiIGZpbGw9IiNGRjAwRTUiIC8+CiAgICA8cGF0aAogICAgICAgIGQ9Ik0yMi42Nzk3IDEzLjQ3NzlIMzEuNjQ3OUwxOS4xMzAxIDI5LjkyMjVMMzIgNDcuNjQ3MUgyMi44NjFMMTEuODQ5NiAzMi4yMjExVjI3Ljc0NzFMMjIuNjc5NyAxMy40Nzc5WiIKICAgICAgICBmaWxsPSIjRkYwMEU1IiAvPgo8L3N2Zz4=";
;// CONCATENATED MODULE: ./src/logo.svg
var logo_namespaceObject = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzczIiBoZWlnaHQ9IjExMCIgdmlld0JveD0iMCAwIDM3MyAxMTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aAogICAgICAgIGQ9Ik0xNzAuODQ4IDYwLjQ3OEMxNzAuODQ4IDcyLjIwMjEgMTYzLjY0OCA3Ny43NTU2IDE1NC42NDggNzcuNzU1NkgxNDkuMTRWNzAuNzUxOUgxNTQuMjE0QzE1OS42NDUgNzAuNzUxOSAxNjMuMjYgNjcuODUxOSAxNjMuMjYgNjAuNTI0NEMxNjMuMjYgNTMuMTk2NCAxNTkuODQ3IDQ5LjcyNTYgMTU0LjA1OCA0OS43MjU2QzE0OC4yNzEgNDkuNzI1NiAxNDQuNSA1My4xMzUxIDE0NC41IDYwLjQ0NjlWODkuODY1M0gxMzcuMDUxVjQzLjU4NkgxNDQuNTYyVjQ3LjU1MDZIMTQ1LjYzMkMxNDYuOCA0Ni4wMDY5IDE0OC4zMjIgNDQuNzYzMiAxNTAuMDcxIDQzLjkyMzJDMTUxLjgyIDQzLjA4MzIgMTUzLjc0NiA0Mi42NzE0IDE1NS42ODggNDIuNzIyQzE2My45NzQgNDIuNzIyIDE3MC45MSA0OC42OTIxIDE3MC45MSA2MC41NTVMMTcwLjg0OCA2MC40NzhaTTEyMS41ODEgNTcuNDY5OUwxMTYuNTg0IDU2Ljk3NjJDMTEyLjY1OCA1Ni42MjEyIDExMC41NzkgNTUuNTU3IDExMC41NzkgNTMuMjczOEMxMTAuNTc5IDUwLjU3NCAxMTMuMjMyIDQ5LjAxNjEgMTE3LjAxOSA0OS4wMTYxQzEyMC44MDUgNDkuMDE2MSAxMjMuNDQzIDUwLjg2NzIgMTIzLjY2IDUzLjQ4OTdIMTMwLjg0NEMxMzAuNTY1IDQ2LjgxIDEyNS4zMzYgNDIuNjkxMyAxMTcuMDUgNDIuNjkxM0MxMDguNzYzIDQyLjY5MTMgMTAzLjA4NCA0Ny4xMDMyIDEwMy4wODQgNTMuNTY2N0MxMDMuMDg0IDU4Ljk2NjEgMTA2LjUxMyA2Mi40NTI2IDExNC4zMDMgNjMuMjIzOUwxMTkuMzc3IDYzLjczMjlDMTIyLjQ4MSA2NC4wMTA1IDEyNC41MTMgNjQuNjQzIDEyNC41MTMgNjcuNTU4N0MxMjQuNTEzIDcwLjE5NjUgMTIyLjU4OSA3Mi4xMDkzIDExNy41MTUgNzIuMTA5M0MxMTIuODYgNzIuMTA5MyAxMTAuNTMyIDY5Ljk5NiAxMDkuNzU2IDY3LjE3M0gxMDEuOTk4QzEwMi43NzQgNzMuNjM2NiAxMDguMjA1IDc4LjY1MDMgMTE3LjU5MyA3OC42NTAzQzEyNi4zNzUgNzguNjUwMyAxMzIuMTAxIDc0LjAyMjIgMTMyLjEwMSA2Ny4yMDM3QzEzMi4xMDEgNjEuMTcyMiAxMjguMDk4IDU4LjExNzcgMTIxLjY1OCA1Ny40Njk5SDEyMS41ODFaTTIwMC4wNTIgNjcuMTczQzE5OS4zNDIgNjguNjYwMiAxOTguMjAzIDY5LjkwMzIgMTk2Ljc4IDcwLjc0MzlDMTk1LjM1NiA3MS41ODQ5IDE5My43MTMgNzEuOTg0OSAxOTIuMDYgNzEuODkzNUMxODYuNTY3IDcxLjg5MzUgMTgyLjQ4NiA2OC4zNDUzIDE4Mi40ODYgNjAuNjYzMUMxODIuNDg2IDUzLjM1MDkgMTg2LjI3MyA0OS4zMDkzIDE5Mi4xMzggNDkuMzA5M0MxOTMuMjIzIDQ5LjIxNjkgMTk0LjMxNiA0OS4zNTA1IDE5NS4zNDYgNDkuNzAxNkMxOTYuMzc2IDUwLjA1MjcgMTk3LjMyMSA1MC42MTMgMTk4LjEyMSA1MS4zNDc3QzE5OC45MjIgNTIuMDgyIDE5OS41NTkgNTIuOTc0MyAxOTkuOTkzIDUzLjk2NzRDMjAwLjQyNyA1NC45NjA0IDIwMC42NDggNTYuMDMyMyAyMDAuNjQxIDU3LjExNDlIMTg3LjEyNlY2Mi41MTQzSDIwNy45OTdWNTguOTY2MUMyMDcuOTk3IDQ5LjA5MzEgMjAxLjQzMyA0Mi42OTEzIDE5Mi4wNiA0Mi42OTEzQzE4My4zNCA0Mi42OTEzIDE3NC45OTEgNDguNTg0MSAxNzQuOTkxIDYwLjY2MzFDMTc0Ljk5MSA3Mi43NDE5IDE4My4zNCA3OC42NTAzIDE5Mi4wNiA3OC42NTAzQzE5NS41NjMgNzguNzY4MSAxOTkuMDAyIDc3LjY5NTIgMjAxLjgwOSA3NS42MDg3QzIwNC42MTYgNzMuNTIyMiAyMDYuNjIzIDcwLjU0NjUgMjA3LjUgNjcuMTczSDIwMC4wNTJaTTgyLjEyMDIgNDIuNjkxM0M3My45MTE1IDQyLjY5MTMgNjcuNzY2MyA0Ni45NjQ0IDY3LjA1MjYgNTMuNDg5N0g3NC45ODJDNzUuNTU2MyA1MS4wODMxIDc3Ljc3NTMgNDkuMzA5MyA4MS45ODA0IDQ5LjMwOTNDODcuNDExNSA0OS4zMDkzIDg5LjIxMTQgNTIuMTQ3NiA4OS4yMTE0IDU1LjYxODdWNjcuMzQyOUM4Ny45ODQ0IDY4Ljg4NDQgODYuNDMzOCA3MC4xNDE0IDg0LjY2NzMgNzEuMDI2QzgyLjkwMTMgNzEuOTEwNiA4MC45NjIyIDcyLjQwMTUgNzguOTg1NSA3Mi40NjQzQzc1LjI2MTMgNzIuNDY0MyA3Mi43Nzg2IDcwLjY5MDIgNzIuNzc4NiA2Ny40OTdDNzIuNzc4NiA2NC4zMDM3IDc0Ljc4MDQgNjIuNTE0MyA3OC42Mjg1IDYyLjUxNDNIODQuNjMzOVY1Ny4xMTQ5SDc4LjQyN0M2OS44NDU5IDU3LjExNDkgNjUuMDUxMSA2MS4zODggNjUuMDUxMSA2Ny45MTM2QzY1LjA1MTEgNzQuMDgzOSA2OS43MDYxIDc4LjcxMiA3Ny4zNDA4IDc4LjcxMkM4MS4yNzE1IDc4LjYzNiA4NS4wNzYgNzcuMzE3NiA4OC4yMDMgNzQuOTQ4SDg5LjI3MzRWNzcuODYzN0g5Ni43MDYzVjU0Ljg2MjhDOTYuNzA2MyA0Ni40MDkgOTAuOTE4NSA0Mi42NDQ5IDgxLjk4MDQgNDIuNjQ0OUw4Mi4xMjAyIDQyLjY5MTNaTTMxLjA2OCA3Ny43NTU2SDM4LjU3ODRWMzAuODU5MUgzMS4wNjhWNzcuNzU1NlpNNjIuNTY4MiA0My41MDg2SDUzLjQyODVMNDIuMzk1OCA1Ny43NzgxVjYyLjI1MjFMNTMuNjE0NyA3Ny42Nzg1SDYyLjkyNTJMNDkuODEzIDU5Ljk1MzZMNjIuNTY4MiA0My41MDg2Wk0zMzMuNTMyIDQzLjUwODZMMzI3LjMyNSA1Ny4wNjg2QzMyNS45MjUgNTkuODIxMSAzMjQuODAyIDYyLjcwNDMgMzIzLjk3MyA2NS42NzY1SDMyMi45MDNDMzIyLjAyNSA2Mi43MzQzIDMyMC44NzcgNTkuODc4NiAzMTkuNDczIDU3LjE0NTZMMzEzLjI2NiA0My41MDg2SDMwNC45OEwzMTkuNDI3IDc0LjI2OTFMMzEyLjI3MyA4OS42OTU1SDMyMC4yOEwzNDEuNzI1IDQzLjQxNjJMMzMzLjUzMiA0My41MDg2Wk0zMDMuNDI4IDQzLjUwODZIMjk0LjI0MkwyODMuMzAyIDU3Ljc3ODFWNjIuMjUyMUwyOTQuNTIyIDc3LjY3ODVIMzAzLjgzMkwyOTAuNjczIDU5Ljk1MzZMMzAzLjQyOCA0My41MDg2Wk0yNTYuNDQyIDU3LjM5MjVMMjUxLjQ0NSA1Ni44OTkxQzI0Ny41MTkgNTYuNTQ0MSAyNDUuNDQgNTUuNDc5NiAyNDUuNDQgNTMuMTk2NEMyNDUuNDQgNTAuNDk2OSAyNDguMDc4IDQ4LjkzOSAyNTEuODggNDguOTM5QzI1NS42ODEgNDguOTM5IDI1OC4zMDQgNTAuNzkwMiAyNTguNTIxIDUzLjQxMjZIMjY1LjczN0MyNjUuNDU3IDQ2LjczMjkgMjYwLjIyOCA0Mi42MTM5IDI1MS45NDIgNDIuNjEzOUMyNDMuNjU2IDQyLjYxMzkgMjM3Ljk3NiA0Ny4wMjYxIDIzNy45NzYgNTMuNDg5N0MyMzcuOTc2IDU4Ljg4OSAyNDEuNDIxIDYyLjM3NTUgMjQ5LjIxMSA2My4xNDY4TDI1NC4yODUgNjMuNjU1OUMyNTcuMzg5IDYzLjkzMzQgMjU5LjQyMSA2NC41NjU5IDI1OS40MjEgNjcuNDgxNkMyNTkuNDIxIDcwLjExOTQgMjU3LjQ5NyA3Mi4wMzIzIDI1Mi40MjMgNzIuMDMyM0MyNDcuNzY4IDcyLjAzMjMgMjQ1LjQ0IDY5LjkxODkgMjQ0LjY2NCA2Ny4wOTZIMjM2LjkwNkMyMzcuNjgxIDczLjU1OTUgMjQzLjExMiA3OC41NzMyIDI1Mi41IDc4LjU3MzJDMjYxLjI4MyA3OC41NzMyIDI2Ny4wMDkgNzMuOTQ1MiAyNjcuMDA5IDY3LjEyNjdDMjY3LjAwOSA2MS4wOTQ4IDI2My4wMDYgNTguMDQwNyAyNTYuNTY2IDU3LjM5MjVIMjU2LjQ0MlpNMjcyLjA4MyA3Ny43MjQ5SDI3OS41OTRWMzAuODI4MkgyNzIuMDgzVjc3LjcyNDlaTTIyMi4zOTcgNDcuNDczNUgyMjEuMzI2VjQzLjUwODZIMjEzLjgxNlY3Ny43NTU2SDIyMS4zMjZWNTkuODQ1NUMyMjEuMzI2IDUzLjY3NDggMjI0LjE2NiA1MC4xNzMgMjI5Ljc1MiA1MC4xNzNIMjM0LjUxNlY0Mi42NDQ5SDIzMS43MDdDMjI2LjUyNSA0Mi42NDQ5IDIyNC4zMjEgNDQuNTg4NSAyMjIuMzk3IDQ3LjQ3MzVaIgogICAgICAgIGZpbGw9IiMxRDFEMUIiIC8+CiAgICA8cGF0aCBkPSJNMzQ5LjEwMSA3Ny43MjQ3SDM0MS43M1YzMC44MjgySDM0OS4xMDFWNzcuNzI0N1oiIGZpbGw9IiNGRjAwRTUiIC8+CiAgICA8cGF0aAogICAgICAgIGQ9Ik0zNjMuNjggNDMuNDc3OUgzNzIuNjQ4TDM2MC4xMyA1OS45MjI1TDM3MyA3Ny42NDcxSDM2My44NjFMMzUyLjg1IDYyLjIyMTFWNTcuNzQ3MUwzNjMuNjggNDMuNDc3OVoiCiAgICAgICAgZmlsbD0iI0ZGMDBFNSIgLz4KICAgIDxwYXRoIGQ9Ik0xNzQuOTEzIDcuMzcyMTNWMEwyMjEuODEgMi4wOTEzMWUtMDZWNy4zNzIxM0gxNzQuOTEzWiIgZmlsbD0iI0ZGMDBFNSIgLz4KICAgIDxwYXRoCiAgICAgICAgZD0iTTIwOS4xNTkgMjEuOTQ4OFYzMC45MjAyTDE5Mi43MTQgMTguMzk5OEwxNzQuOTg5IDMxLjI3MDVWMjIuMTMxNUwxOTAuNDE2IDExLjExOTFIMTk0Ljg5TDIwOS4xNTkgMjEuOTQ4OFoiCiAgICAgICAgZmlsbD0iI0ZGMDBFNSIgLz4KICAgIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIgogICAgICAgIGQ9Ik0wIDc3LjcyNTNINy4zNzIxVjMwLjgyODJIMFY3Ny43MjUzWk0zMC45MiA0My40Nzc5SDIxLjk0ODZMMTEuMTE4OSA1Ny43NDc4VjYyLjIyMTRMMjIuMTMxMyA3Ny42NDc5SDMxLjI3MDNMMTguMzk5NiA1OS45MjI5TDMwLjkyIDQzLjQ3NzlaIgogICAgICAgIGZpbGw9IiNGRjAwRTUiIC8+CiAgICA8cGF0aCBkPSJNMTc0LjkxMyAxMDEuNjMxVjEwOS4wMDNIMjIxLjgxVjEwMS42MzFIMTc0LjkxM1oiIGZpbGw9IiNGRjAwRTUiIC8+CiAgICA8cGF0aAogICAgICAgIGQ9Ik0yMDkuMTU3IDg3LjA1NFY3OC4wODIzTDE5Mi43MTIgOTAuNjAyOUwxNzQuOTg3IDc3LjczMjNWODYuODcxMkwxOTAuNDE0IDk3Ljg4MzdIMTk0Ljg4OEwyMDkuMTU3IDg3LjA1NFoiCiAgICAgICAgZmlsbD0iI0ZGMDBFNSIgLz4KPC9zdmc+";
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