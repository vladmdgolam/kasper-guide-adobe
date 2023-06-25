/// <reference types="types-for-adobe/InDesign/2018"/>

import { createSvg } from "./helpers"

export const toPoints = 0.75

const textnodetest = {
  id: "549:10556",
  name: "BH",
  type: "TEXT",
  scrollBehavior: "SCROLLS",
  blendMode: "PASS_THROUGH",
  absoluteBoundingBox: {
    x: 2717,
    y: 42750.15234375,
    width: 2186.8193359375,
    height: 472.609375,
  },
  absoluteRenderBounds: {
    x: 2750.427978515625,
    y: 42827.55078125,
    width: 660.083251953125,
    height: 383.6015625,
  },
  constraints: { vertical: "TOP", horizontal: "LEFT" },
  fills: [
    {
      blendMode: "NORMAL",
      type: "SOLID",
      color: { r: 0, g: 0, b: 0, a: 1 },
    },
  ],
  strokes: [],
  strokeWeight: 5.452956676483154,
  strokeAlign: "OUTSIDE",
  effects: [],
  characters: "BH",
  style: {
    fontFamily: "Kaspersky Sans Display",
    fontPostScriptName: "KasperskySansDisplay-Md",
    fontWeight: 500,
    fontSize: 548,
    textAlignHorizontal: "LEFT",
    textAlignVertical: "TOP",
    opentypeFlags: { LIGA: 0 },
    letterSpacing: 0,
    lineHeightPx: 548,
    lineHeightPercent: 85.32422637939453,
    lineHeightPercentFontSize: 100,
    lineHeightUnit: "PIXELS",
  },
  layoutVersion: 3,
  characterStyleOverrides: [],
  styleOverrideTable: {},
  lineTypes: ["NONE"],
  lineIndentations: [0],
}

const autoFitProps = {
  // eslint-disable-next-line no-undef
  autoSizingType: AutoSizingTypeEnum.HEIGHT_AND_WIDTH,
  // eslint-disable-next-line no-undef
  autoSizingReferencePoint: AutoSizingReferenceEnum.TOP_LEFT_POINT,
  // eslint-disable-next-line no-undef
  firstBaselineOffset: FirstBaseline.CAP_HEIGHT,
}

export const drawArtboard = (artboard, name = "") => {
  const { absoluteBoundingBox, layoutGrids } = artboard
  const { width, height, x, y } = absoluteBoundingBox

  // Create a new page at the end of the document
  // Create a new document with specified page size
  let doc = app.activeDocument

  let widthInPoints = width / 1.3333
  let heightInPoints = height / 1.3333

  // let widthInPicas = widthInPoints / 12
  // let heightInPicas = heightInPoints / 12

  // eslint-disable-next-line no-undef
  doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points
  // eslint-disable-next-line no-undef
  doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.points
  // eslint-disable-next-line no-undef
  app.scriptPreferences.measurementUnit = MeasurementUnits.points

  doc.documentPreferences.pageWidth = widthInPoints
  doc.documentPreferences.pageHeight = heightInPoints

  // Set the frame's name
  doc.name = name

  // draw elements

  const fontRegular = app.fonts.item("Kaspersky Sans Display")
  const fontMedium = app.fonts.item("Kaspersky Sans Display	Medium")


  let page = doc.pages[0]

  for (var i = 0; i < artboard.children.length; i++) {
    let node = artboard.children[i]
    // let node = textnodetest
    // Your code here
    let docXInPoints = x * toPoints
    let docYInPoints = y * toPoints

    if (node.type === "TEXT") {
      let xInPoints = node.absoluteBoundingBox.x * toPoints
      let yInPoints = node.absoluteBoundingBox.y * toPoints
      let widthInPoints = node.absoluteBoundingBox.width * toPoints
      let heightInPoints = node.absoluteBoundingBox.height * toPoints


      // Add a text frame and set its geometric bounds
      let textFrame = page.textFrames.add()

      const startY = xInPoints - docXInPoints
      const startX = yInPoints - docYInPoints
      textFrame.geometricBounds = [
        startX,
        startY,
        startX + heightInPoints,
        startY + widthInPoints,
      ]

      // Set the font and font size
      const font = node.style.fontWeight === 500 ? fontMedium : fontRegular

      const text = textFrame.texts[0]

      text.appliedFont = font
      text.pointSize = node.style.fontSize * toPoints

      const leading = node.style.lineHeightPx * toPoints
      text.leading = leading

      textFrame.parentStory.hyphenation = false // Disable hyphenation

      // Set the text
      textFrame.contents = node.characters

      // textFrame.textFramePreferences.properties = autoFitProps
    } else if (node.name.match(/^logo /)) {
      // go through all children of artboard

      if (node.type === "GROUP") {
        for (var j = 0; j < node.children.length; j++) {
          var child = node.children[j]
          if (child.name === "logo") {
            // createSvg(newArtboard, child as VectorNode, x, y)
            createSvg(child, docXInPoints, docYInPoints, true)
          } else {
            createSvg(child, docXInPoints, docYInPoints, false)
            // createSvg(newArtboard, child as VectorNode, x, y, slogan)
          }
        }
      }
    }
  }
}
