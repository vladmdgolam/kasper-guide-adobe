import { toPoints } from "./constants"

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
}


// export const createSvg = (
//     child: VectorNode,
//     x: number,
//     y: number,
//     isLogo: boolean,
// ) => {
//     const svg = isLogo ? logo : slogan
//     const logoNode = figma.createNodeFromSvg(svg)
//     newArtboard.appendChild(logoNode)
//     const { absoluteBoundingBox } = child as VNode
//     if (isLogo) {
//         let logoSvg = figma.ungroup(logoNode)[0] as VectorNode
//         logoSvg.resize(absoluteBoundingBox!.width, absoluteBoundingBox!.height)
//         logoSvg.x = absoluteBoundingBox!.x - x
//         logoSvg.y = absoluteBoundingBox!.y - y
//         logoSvg.name = child.name
//     } else {
//         let sloganSvg = figma.flatten([logoNode], newArtboard)
//         sloganSvg.resize(absoluteBoundingBox!.width, absoluteBoundingBox!.height)
//         sloganSvg.x = absoluteBoundingBox!.x - x
//         sloganSvg.y = absoluteBoundingBox!.y - y
//         sloganSvg.name = child.name
//     }
// }
