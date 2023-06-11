import { data } from "./data.js"
/// <reference types="types-for-adobe/InDesign/2018"/>
// load json
const start = () => {
  // Assuming 'data' is already defined somewhere else in your script

  var dialog = app.dialogs.add({ name: "Artboard Selector", canCancel: true })
  var column = dialog.dialogColumns.add()
  var dropdown = column.dropdowns.add()

  var artboards = data.document.children[0]
  var artboardNames = []

  for (var i = 0; i < artboards.children.length; i++) {
    var artboardName = artboards.children[i].name
    // Check if the artboard name starts with 'A' and does not contain 'Horizontal' or 'Vertical'
    if (
      artboardName.indexOf("A") === 0 &&
      artboardName.indexOf("Horizontal") === -1 &&
      artboardName.indexOf("Vertical") === -1
    ) {
      artboardName = artboardName + " Vertical"
    }
    artboardNames.push(artboardName)
  }

  // sort them by name
  artboardNames.sort()

  // populate the dropdown with the sorted names
  dropdown.stringList = artboardNames
  dropdown.selectedIndex = 0 // select the first item by default

  if (dialog.show() === true) {
    var selectedArtboardName = dropdown.stringList[dropdown.selectedIndex]
    dialog.destroy()
    // Use 'selectedArtboardName' here...
  } else {
    dialog.destroy()
  }
}

start()
