import { toPoints, textAlignMap, fontMedium, fontRegular, fontMono } from "./constants"

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
    frame.fit(FitOptions.PROPORTIONALLY)
    frame.strokeWeight = 0

    const contentBounds = frame.svgs[0].geometricBounds
    const contentWidth = contentBounds[3] - contentBounds[1]
    const contentHeight = contentBounds[2] - contentBounds[0]

    frame.resize(
        // eslint-disable-next-line no-undef
        CoordinateSpaces.INNER_COORDINATES,
        // eslint-disable-next-line no-undef
        AnchorPoint.LEFT_CENTER_ANCHOR,
        // eslint-disable-next-line no-undef
        ResizeMethods.REPLACING_CURRENT_DIMENSIONS_WITH,
        [contentWidth, contentHeight]
    )

    frame.fit(FitOptions.PROPORTIONALLY)
    // eslint-disable-next-line no-undef
    // frame.fit(FitOptions.FRAME_TO_CONTENT)
    frame.name = child.name

    if (isLogo) {
        // return the right side of the logo position
        return {
            dataLogoRight: widthInPoints + xInPoints, logoRight: frame.geometricBounds[3]
        }
    } else {
        return {
            dataSloganLeft: xInPoints, slogan: frame,
            top: frame.geometricBounds[0]
        }
    }
}

function calcLeadingFix(textFrameOG, textOG, page) {

    const { geometricBounds } = textFrameOG
    const { pointSize: fontSize, leading } = textOG
    const font = textOG.appliedFont

    // Create a new text frame
    let textFrame = page.textFrames.add()
    textFrame.geometricBounds = geometricBounds

    // Set the font, leading, and font size
    let text = textFrame.texts[0]
    text.appliedFont = font
    text.leading = leading
    text.pointSize = fontSize

    // Set its contents to 'T'
    textFrame.contents = 'T'

    // Store the original top Y position
    const originalY = textFrame.geometricBounds[0]

    // Outline the text frame. This creates a new group item and removes the original text frame.
    const arr = textFrame.createOutlines() // Pass false to prevent removing the original item
    const outlinedGroup = arr[0]

    // Calculate the height of the outlined text
    const capHeight = outlinedGroup.geometricBounds[2] - outlinedGroup.geometricBounds[0]

    // Calculate the new top Y position
    const newY = outlinedGroup.geometricBounds[0]

    // Calculate the difference between the original and new Y positions
    const diffY = newY - originalY

    // Remove the temporary text frame and outlined group
    // textFrame.remove()
    outlinedGroup.remove()

    // Return the calculated values
    return {
        capHeight,
        diffY
    }
}

function setTextAlignment(textFrame, textAlignHorizontal) {
    // Map the provided string values to InDesign's Justification
    const horizontalAlignments = {
        // eslint-disable-next-line no-undef
        "LEFT": Justification.LEFT_ALIGN,
        // eslint-disable-next-line no-undef
        "CENTER": Justification.CENTER_ALIGN,
        // eslint-disable-next-line no-undef
        "RIGHT": Justification.RIGHT_ALIGN
    }

    // Apply the alignments to each paragraph in the text frame
    for (var i = 0; i < textFrame.parentStory.paragraphs.length; i++) {
        textFrame.parentStory.paragraphs[i].justification = horizontalAlignments[textAlignHorizontal.toUpperCase()]
    }
}

export function createTextFrame(node, docXInPoints, docYInPoints, page, align) {
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

    let font
    if (node.style.fontFamily === "Kaspersky Sans Mono") {
        font = fontMono
    } else {
        font = node.style.fontWeight === 500 ? fontMedium : fontRegular
    }

    const text = textFrame.texts[0]

    text.appliedFont = font
    text.pointSize = node.style.fontSize * toPoints

    const leading = node.style.lineHeightPx * toPoints
    text.leading = leading

    let diff = 0
    // if (node.layoutVersion === 0) {
    //     // diff = calcDiff(text, node.style.lineHeightPx, node)
    // }

    let { capHeight, diffY } = calcLeadingFix(textFrame, text, page)

    let leadingDiff
    if (node.layoutVersion === 0) {
        leadingDiff = (leading - capHeight) / 2
    } else {
        leadingDiff = (leading - capHeight) / 2
        leadingDiff -= diffY
    }
    if (node.style.textAlignVertical === "BOTTOM") {
        startY -= leadingDiff
    } else {
        startY += leadingDiff
    }

    textFrame.parentStory.hyphenation = false // Disable hyphenation

    // Set the text
    let textContents = node.characters
    if (textContents.indexOf("Website") !== -1) {
        textContents = textContents.replace("(", "\r")
    }
    textFrame.contents = textContents

    setTextAlignment(textFrame, node.style.textAlignHorizontal)

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
        textFrame.geometricBounds = [
            startY, //+ diff
            startX,
            startY + heightInPoints, //+ diff
            startX + widthInPoints,
        ]

        textFrame.textFramePreferences.autoSizingReferencePoint = textAlignMap[node.style.textAlignHorizontal][node.style.textAlignVertical]
        // eslint-disable-next-line no-undef
        textFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY

        // eslint-disable-next-line no-undef
        textFrame.fit(FitOptions.FRAME_TO_CONTENT)
    }



    textFrame.name = node.name

    if (align) {
        const yTopBefore = textFrame.geometricBounds[0]
        const yBottomBefore = textFrame.geometricBounds[2]

        textFrame.texts[0].alignToBaseline = true

        const yTopAfter = textFrame.geometricBounds[0]
        const yBottomAfter = textFrame.geometricBounds[2]

        const diffTop = yTopAfter - yTopBefore
        const diffBottom = yBottomAfter - yBottomBefore

        if (Math.abs(diffTop) > 4.5 || Math.abs(diffBottom) > 4.5) {
            textFrame.move(undefined, [0, -9])
        }
    }
}

export function calcDiff(textFrame, lineHeightPx, node) {
    // textFrame.textFramePreferences.autoSizingReferencePoint = textAlignMap[node.style.textAlignHorizontal][node.style.textAlignVertical]
    // eslint-disable-next-line no-undef
    textFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY

    // eslint-disable-next-line no-undef
    textFrame.fit(FitOptions.FRAME_TO_CONTENT)

    // Convert line height from pixels to points
    const lineHeightInPoints = lineHeightPx * toPoints

    // Clone text frame
    const clone = textFrame.duplicate()

    // Capture Y position before lineHeight change
    const yBefore = clone.geometricBounds[0]

    // Set lineHeight (leading) and capture Y position after lineHeight change

    clone.texts[0].leading = lineHeightInPoints
    // eslint-disable-next-line no-undef
    clone.fit(FitOptions.FRAME_TO_CONTENT)

    const yAfter = clone.geometricBounds[0]

    // Calculate difference
    const diff = yAfter - yBefore

    // Remove cloned text frame
    clone.remove()

    return diff
}

export function createLineNodes(node, docXInPoints, docYInPoints, page) {

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
            })

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

export function setupBaselineGrid(node, doc, y) {
    // Calculate the baseline grid start position
    const first = node.children[0]
    const start = first.absoluteBoundingBox.y * toPoints - y

    // Set the increment for the baseline grid
    const increment = 12 * toPoints  // You can change this value as needed

    // Access the baseline grid preferences
    var gridPreferences = doc.gridPreferences

    // Setup baseline grid
    gridPreferences.baselineStart = start
    gridPreferences.baselineDivision = increment
    gridPreferences.baselineGridShown = true // To display the baseline grid
}
