import { toPoints, textAlignMap, fontMedium, fontRegular } from "./constants"

export function createSvg(child, x, y, isLogo) {
    // eslint-disable-next-line no-undef
    const currentScriptPath = $.fileName
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

    let startX = xInPoints - docXInPoints
    let startY = yInPoints - docYInPoints
    textFrame.geometricBounds = [
        startY,
        startX,
        startY + heightInPoints,
        startX + widthInPoints,
    ]

    const font = node.style.fontWeight === 500 ? fontMedium : fontRegular

    const text = textFrame.texts[0]

    text.appliedFont = font
    text.pointSize = node.style.fontSize * toPoints

    let diff = 0
    if (node.layoutVersion === 0) {
        // diff = calcDiff(text, node.style.lineHeightPx)
    }

    const leading = node.style.lineHeightPx * toPoints
    text.leading = leading

    textFrame.parentStory.hyphenation = false // Disable hyphenation

    // Set the text
    textFrame.contents = node.characters



    if (node.rotation && Math.abs(node.rotation) >= 0.01) {
        textFrame.geometricBounds = [
            startX,
            startY,
            startX + widthInPoints,
            startY + heightInPoints,
        ]
        // eslint-disable-next-line no-undef
        textFrame.fit(FitOptions.FRAME_TO_CONTENT)

        const frameBounds = textFrame.geometricBounds
        const textWidth = frameBounds[3] - frameBounds[1]
        const textHeight = frameBounds[0] - frameBounds[2]

        textFrame.rotationAngle = -(node.rotation * 180) / Math.PI

        startX += widthInPoints - diff

        textFrame.geometricBounds = [
            startY,
            startX,
            startY + textWidth,
            startX + textHeight,
        ]

    } else {
        // textFrame.move(["-" + diff, 0])

        textFrame.textFramePreferences.autoSizingReferencePoint = textAlignMap[node.style.textAlignHorizontal][node.style.textAlignVertical]
        // eslint-disable-next-line no-undef
        textFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY

        // eslint-disable-next-line no-undef
        textFrame.fit(FitOptions.FRAME_TO_CONTENT)
    }



    textFrame.name = node.name
}

export function calcDiff(textFrame, lineHeightPx) {
    // Convert line height from pixels to points
    const lineHeightInPoints = lineHeightPx * toPoints

    // Clone text frame
    const clone = textFrame.duplicate()

    // Capture Y position before lineHeight change
    const yBefore = clone.geometricBounds[0]

    // Set lineHeight (leading) and capture Y position after lineHeight change
    clone.texts[0].leading = lineHeightInPoints
    const yAfter = clone.geometricBounds[0]

    // Calculate difference
    const diff = yAfter - yBefore

    // Remove cloned text frame
    clone.remove()

    return diff
}

export function createLineNodes(node, docXInPoints, docYInPoints, page) {
    let lines = node

    let linesArr = []

    // For each child node, create Line
    for (var j = 0; j < node.children.length; j++) {
        const child = node.children[j]
        const { absoluteBoundingBox, strokeWeight, strokes } = child

        // If strokes is undefined, skip
        if (!strokes || !strokes[0]) return

        let xInPoints = child.absoluteBoundingBox.x * toPoints
        let yInPoints = child.absoluteBoundingBox.y * toPoints

        const startX = xInPoints - docXInPoints
        const startY = yInPoints - docYInPoints

        let colorObj = {
            "r": 0,
            "g": 0.8941176533699036,
            "b": 0.7960784435272217,
            "a": 1
        }

        // InDesign's color value range is 0-255, so we scale up the values
        let red = Math.round(colorObj.r * 255)
        let green = Math.round(colorObj.g * 255)
        let blue = Math.round(colorObj.b * 255)

        let colorName = "MyColor"

        // Check if color already exists
        let existingColor = app.activeDocument.colors.itemByName(colorName)

        if (!existingColor.isValid) {
            // Create a new color
            var newColor = app.activeDocument.colors.add({
                name: "MyColor",
                model: ColorModel.PROCESS,
                space: ColorSpace.RGB,
                colorValue: [red, green, blue]  // r, g, b are between 0 and 255
            });

            // Now you can apply newColor to your objects
            existingColor = newColor
        }

        const line = page.graphicLines.add({
            strokeWeight: strokeWeight,
            geometricBounds: [
                startY,
                startX,
                startY,
                startX + absoluteBoundingBox.width * toPoints
            ],
            strokeColor: existingColor, // Assuming that the color exists in the document's colors
        })

        linesArr.push(line)
    }

    // Group all lines
    const group = page.groups.add(linesArr)
    group.name = node.name

    // Make group.visible = true if starts with 12
    if (node.name.match(/^12pt$/)) {
        group.visible = true
    } else {
        group.visible = false
    }
}