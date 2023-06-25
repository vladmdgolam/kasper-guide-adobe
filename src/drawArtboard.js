/// <reference types="types-for-adobe/InDesign/2018"/>

import { toPoints, textAlignMap } from "./constants"
import { createSvg, createTextFrame } from "./helpers"


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

export const drawArtboard = (artboard, name = "") => {
  const { absoluteBoundingBox, layoutGrids } = artboard
  const { width, height, x, y } = absoluteBoundingBox

  // Create a new page at the end of the document
  // Create a new document with specified page size
  let doc = app.activeDocument

  let widthInPoints = width / 1.3333
  let heightInPoints = height / 1.3333

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
  const page = doc.pages[0]

  for (var i = 0; i < artboard.children.length; i++) {
    let node = artboard.children[i]
    // let node = textnodetest
    // Your code here
    let docXInPoints = x * toPoints
    let docYInPoints = y * toPoints

    if (node.type === "TEXT") {

      createTextFrame(node, docXInPoints, docYInPoints, page)

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
