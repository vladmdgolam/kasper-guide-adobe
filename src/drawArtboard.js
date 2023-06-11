/// <reference types="types-for-adobe/InDesign/2018"/>

const toPx = 0.75

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

  let widthInPicas = widthInPoints / 12
  let heightInPicas = heightInPoints / 12

  doc.documentPreferences.pageWidth = widthInPicas
  doc.documentPreferences.pageHeight = heightInPicas

  // Set the frame's name
  doc.name = name

  // draw elements

  const kasperskyFontRegular = app.fonts.item("Kaspersky Sans Display")
  //   const kasperskyFont = app.fonts.item("Kaspersky Sans Display	Medium")

  let page = doc.pages[0]

  for (var i = 0; i < artboard.children.length; i++) {
    // for (var i = 0; i < 1; i++) {
    let node = artboard.children[i]
    // let node = textnodetest
    // Your code here
    if (node.type === "TEXT") {
      let xInPixels = node.absoluteBoundingBox.x * toPx
      let yInPixels = node.absoluteBoundingBox.y * toPx
      let widthInPixels = node.absoluteBoundingBox.width * toPx
      let heightInPixels = node.absoluteBoundingBox.height * toPx

      let docXInPixels = x * toPx
      let docYInPixels = y * toPx

      // eslint-disable-next-line no-undef
      // app.scriptPreferences.measurementUnit = MeasurementUnits.points

      // Add a text frame and set its geometric bounds
      let textFrame = page.textFrames.add()

      const startY = xInPixels - docXInPixels
      const startX = yInPixels - docYInPixels
      textFrame.geometricBounds = [
        startX / 12,
        startY / 12,
        (startX + heightInPixels) / 12,
        (startY + widthInPixels) / 12,
      ]

      // Set the font and font size
      textFrame.texts[0].appliedFont = kasperskyFontRegular
      textFrame.texts[0].pointSize = (node.style.fontSize * toPx) / 12

      // Set the text
      textFrame.contents = node.characters

      // textFrame.textFramePreferences.properties = autoFitProps
    }
  }
}
