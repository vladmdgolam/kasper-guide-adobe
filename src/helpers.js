import { toPoints, textAlignMap, fontMedium, fontRegular } from "./constants"

export function createSvg(child, x, y, isLogo) {
    // eslint-disable-next-line no-undef
    const currentScriptPath = $.fileName;
    let core = currentScriptPath.substring(0, currentScriptPath.lastIndexOf("/")) + "/"

    const filePath = isLogo ? core + "logo.svg" : core + "slogan.svg"

    let page = app.activeWindow.activePage
    let frame = page.rectangles.add()

    const svg = frame.svgs.add()

    svg.place(new File(filePath))

    let xInPoints = child.absoluteBoundingBox.x * toPoints
    let yInPoints = child.absoluteBoundingBox.y * toPoints
    let widthInPoints = child.absoluteBoundingBox.width * toPoints
    let heightInPoints = child.absoluteBoundingBox.height * toPoints

    const startX = xInPoints - x
    const startY = yInPoints - y

    frame.geometricBounds = [
        startY,
        startX,
        startY + heightInPoints,
        startX + widthInPoints,
    ]

    // eslint-disable-next-line no-undef
    frame.fit(FitOptions.CONTENT_TO_FRAME)
    // eslint-disable-next-line no-undef
    frame.fit(FitOptions.FRAME_TO_CONTENT)
    frame.name = child.name

    frame.strokeWeight = 0
}



export function createTextFrame(node, docXInPoints, docYInPoints, page) {
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

    const font = node.style.fontWeight === 500 ? fontMedium : fontRegular

    const text = textFrame.texts[0]

    text.appliedFont = font
    text.pointSize = node.style.fontSize * toPoints

    const leading = node.style.lineHeightPx * toPoints
    text.leading = leading

    textFrame.parentStory.hyphenation = false // Disable hyphenation

    // Set the text
    textFrame.contents = node.characters

    textFrame.textFramePreferences.autoSizingReferencePoint = textAlignMap[node.style.textAlignHorizontal][node.style.textAlignVertical]
    // eslint-disable-next-line no-undef
    textFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY

    // eslint-disable-next-line no-undef
    textFrame.fit(FitOptions.FRAME_TO_CONTENT)
    textFrame.name = node.name
}