export const drawArtboard = (artboard, name = "") => {
  const { absoluteBoundingBox } = artboard
  const { width, height } = absoluteBoundingBox

  // Create a new page at the end of the document
  // Create a new document with specified page size
  let newDoc = app.activeDocument

  var widthInPoints = width / 1.3333
  var heightInPoints = height / 1.3333

  var widthInPicas = widthInPoints / 12
  var heightInPicas = heightInPoints / 12

  newDoc.documentPreferences.pageWidth = widthInPicas
  newDoc.documentPreferences.pageHeight = heightInPicas

  // Set the frame's name
  newDoc.name = name
}
