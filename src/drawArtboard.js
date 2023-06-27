/// <reference types="types-for-adobe/InDesign/2018"/>

import { toPoints } from "./constants"
import { setupBaselineGrid, createSvg, createTextFrame } from "./helpers"

export const drawArtboard = (artboard, name = "") => {
  const { absoluteBoundingBox } = artboard
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

    // if (node.name.match(/^\d{2}pt$/) && !name.match(/^Banner/)) {
    if (node.name.match(/^12pt$/) && !name.match(/^Banner/)) {
      // createLineNodes(node, docXInPoints, docYInPoints, page)
      setupBaselineGrid(node, doc, docYInPoints)
    } else if (node.type === "TEXT") {

      createTextFrame(node, docXInPoints, docYInPoints, page, !name.match(/^Banner/))

    } else if (node.name.match(/^logo /)) {
      // go through all children of artboard

      if (node.type === "GROUP") {
        for (var j = 0; j < node.children.length; j++) {
          var child = node.children[j]
          if (child.name === "logo") {
            createSvg(child, docXInPoints, docYInPoints, true)
          } else {
            createSvg(child, docXInPoints, docYInPoints, false)
          }
        }
      }
    }
  }

  if (name.match(/^Banner/)) {
    doc.gridPreferences.baselineGridShown = false
  } else {
    doc.gridPreferences.baselineGridShown = true
  }
}
