import { data } from "./data.js"
import { drawArtboard } from "./drawArtboard.js"
/// <reference types="types-for-adobe/InDesign/2018"/>
// load json
const start = () => {
  // Assuming 'data' is already defined somewhere else in your script

  let dialog = app.dialogs.add({ name: "Artboard Selector", canCancel: true })
  let column = dialog.dialogColumns.add()
  let dropdown = column.dropdowns.add()

  let artboards = data.document.children[0]
  let artboardNames = []

  for (let i = 0; i < artboards.children.length; i++) {
    let artboardName = artboards.children[i].name
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
    let selectedArtboardName = dropdown.stringList[dropdown.selectedIndex]
    const artboards = data.document.children[0]

     let number

     // Find the index of the selected artboard
     for (let i = 0; i < artboards.children.length; i++) {
       let name = artboards.children[i].name
       if (
         name.indexOf("A") === 0 &&
         name.indexOf("Horizontal") === -1 &&
         name.indexOf("Vertical") === -1
       ) {
         name = name + " Vertical"
       }
       if (name === selectedArtboardName) {
         number = i
         break
       }
     }

    const artboardData = artboards.children[number]
    drawArtboard(artboardData, selectedArtboardName)
    dialog.destroy()
    // Use 'selectedArtboardName' here...
  } else {
    dialog.destroy()
  }
}

start()
