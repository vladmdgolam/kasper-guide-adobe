/// <reference types="types-for-adobe/InDesign/2018"/>
import img from "./logo.svg"
import k from "./k.svg"

const count = 10
let openDocument = app.activeDocument
const { activePage } = openDocument.layoutWindows[0]

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

  const { rect } = placeSvg(img, newLayer)

  // finding scale
  const pageBounds = activePage.bounds
  const imgBounds = rect.geometricBounds
  const pageWidth = pageBounds[3] - pageBounds[1]
  const imageWidth = imgBounds[3] - imgBounds[1]
  const scaleFactor = pageWidth / (imageWidth * count)
  resizeRect(rect, scaleFactor)

  const pageHeight = pageBounds[2]
  rect.move([0, pageHeight - rect.geometricBounds[2]])

  const kProps = findKProps(scaleFactor)
  const kHeight = kProps[0]
  const kWidth = kProps[1]

  /* ADDING TEXT */
  const addTexts = () => {
    const textFrame = activePage.textFrames.add()
    textFrame.contents = "TEST"

    const kasperskyFont = app.fonts.item("Kaspersky Sans Display")

    const myParagraph = textFrame.paragraphs.item(0)
    myParagraph.properties = {
      appliedFont: kasperskyFont,
      pointSize: 24,
    }

    textFrame.textFramePreferences.properties = {
      // eslint-disable-next-line no-undef
      autoSizingType: AutoSizingTypeEnum.HEIGHT_AND_WIDTH,
      // eslint-disable-next-line no-undef
      autoSizingReferencePoint: AutoSizingReferenceEnum.TOP_LEFT_POINT,
      // eslint-disable-next-line no-undef
      firstBaselineOffset: FirstBaseline.CAP_HEIGHT,
    }

    const textHeight = textFrame.geometricBounds[2]
    const _scaleFactor = kHeight / textHeight

    myParagraph.pointSize *= _scaleFactor
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
