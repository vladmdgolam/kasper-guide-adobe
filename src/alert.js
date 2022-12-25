/// <reference types="types-for-adobe/InDesign/2018"/>
import img from "./logo.svg"
import k from "./k.svg"
import { closestFraction, multipliers, names } from "./constants"

const order = ["h1", "h2", "h3", "h4", "teaser", "baseText"]

let openDocument = app.activeDocument
const activePage = openDocument.pages.item(0)
// const { activePage } = openDocument.layoutWindows[0]

const autoFitProps = {
  // eslint-disable-next-line no-undef
  autoSizingType: AutoSizingTypeEnum.HEIGHT_AND_WIDTH,
  // eslint-disable-next-line no-undef
  autoSizingReferencePoint: AutoSizingReferenceEnum.TOP_LEFT_POINT,
  // eslint-disable-next-line no-undef
  firstBaselineOffset: FirstBaseline.CAP_HEIGHT,
}

const resizeRect = (rect, scaleFactor) => {
  rect.resize(
    // eslint-disable-next-line no-undef
    CoordinateSpaces.INNER_COORDINATES,
    // eslint-disable-next-line no-undef
    AnchorPoint.TOP_LEFT_ANCHOR,
    // eslint-disable-next-line no-undef
    ResizeMethods.MULTIPLYING_CURRENT_DIMENSIONS_BY,
    [scaleFactor, scaleFactor]
  )
}

/* adding logos */
const placeSvg = (url) => {
  const rect = activePage.rectangles.add()
  const svg = rect.svgs.add()
  const file = new File(url)
  svg.place(file)
  // eslint-disable-next-line no-undef
  rect.fit(FitOptions.FRAME_TO_CONTENT)
  rect.frameFittingOptions.autoFit = true
  rect.strokeWeight = 0
  rect.move([0, 0])
  return { svg: rect.allGraphics[0], rect }
}

const findKProps = (scaleFactor) => {
  const { rect: kRect } = placeSvg(k)
  resizeRect(kRect, scaleFactor)
  kRect.move([0, 0])
  const kDimensions = kRect.geometricBounds
  const kProps = [kDimensions[2], kDimensions[3]]
  kRect.remove()
  return kProps
}

const runScript = () => {
  const newLayer = openDocument.layers.add()
  const pageBounds = activePage.bounds
  const pageWidth = pageBounds[3]
  const pageHeight = pageBounds[2]

  const count = closestFraction(pageWidth / pageHeight)

  const { rect } = placeSvg(img, newLayer)
  // finding scale
  const imgBounds = rect.geometricBounds
  const imageWidth = imgBounds[3] - imgBounds[1]
  const scaleFactor = pageWidth / (imageWidth * count)
  resizeRect(rect, scaleFactor)

  rect.move([0, pageHeight - rect.geometricBounds[2]])

  const rectWidth = rect.geometricBounds[3] - rect.geometricBounds[1]
  for (let j = 1; j < count; j++) {
    const { rect } = placeSvg(img, newLayer)
    resizeRect(rect, scaleFactor)
    rect.move([j * rectWidth, pageHeight - rect.geometricBounds[2]])
  }

  const kProps = findKProps(scaleFactor)
  const kHeight = kProps[0]
  const kWidth = kProps[1]

  /* ADDING TEXT */
  const addTexts = () => {
    const kasperskyFontRegular = app.fonts.item("Kaspersky Sans Display")
    const kasperskyFont = app.fonts.item("Kaspersky Sans Display	Medium")

    const findkFontSize = () => {
      const textFrame = activePage.textFrames.add()
      textFrame.name = "test"
      textFrame.contents = "TEST"
      const myParagraph = textFrame.paragraphs.item(0)
      myParagraph.properties = {
        appliedFont: kasperskyFont,
        pointSize: 24,
      }
      textFrame.textFramePreferences.properties = autoFitProps

      const textHeight = textFrame.geometricBounds[2]
      const _scaleFactor = kHeight / textHeight

      myParagraph.pointSize *= _scaleFactor
      const kFontSize = myParagraph.pointSize
      textFrame.remove()
      return kFontSize
    }
    const kFontSize = findkFontSize()

    let offsetY = kWidth
    const offsetX = kWidth

    // order.forEach((key) => {
    for (let i = 0; i < order.length; i++) {
      let key = order[i]
      const fontSize = Math.round(multipliers[key] * kFontSize)

      const textFrame = activePage.textFrames.add()
      textFrame.name = key

      textFrame.contents = names[key]

      const paragraph = textFrame.paragraphs.item(0)
      paragraph.properties = {
        appliedFont: kasperskyFont,
        pointSize: fontSize,
        noBreak: true,
      }
      if (key === "teaser" || key === "baseText")
        paragraph.appliedFont = kasperskyFontRegular

      textFrame.textFramePreferences.properties = autoFitProps

      textFrame.move([offsetX, offsetY])
      offsetY = textFrame.geometricBounds[2] += kWidth / 2
    }
    // })
  }

  addTexts()

  const addGuides = () => {
    const pageHeight = pageBounds[2] - pageBounds[0]
    openDocument.guides.add(undefined, {
      location: kWidth,
      // eslint-disable-next-line no-undef
      orientation: HorizontalOrVertical.VERTICAL,
    })
    openDocument.guides.add(undefined, {
      location: pageWidth - kWidth,
      // eslint-disable-next-line no-undef
      orientation: HorizontalOrVertical.VERTICAL,
    })
    openDocument.guides.add(undefined, {
      location: kWidth,
      // eslint-disable-next-line no-undef
      orientation: HorizontalOrVertical.HORIZONTAL,
    })
    openDocument.guides.add(undefined, {
      location: pageHeight - kWidth,
      // eslint-disable-next-line no-undef
      orientation: HorizontalOrVertical.HORIZONTAL,
    })
  }

  addGuides()

  // —————————————————————————————————————————————
}

runScript()
