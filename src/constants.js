export const phi = 1.618

export const multipliers = {
  baseText: 1 / phi ** 2,
  teaser: 1 / phi,
  h4: 1,
  h3: phi,
  h2: phi ** 2,
  h1: phi ** 3,
  margin: 1.5,
}

export const lineHeightCoeff = 1.2

export const order = ["h1", "h2", "h3", "h4", "teaser", "baseText"]
export const names = {
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  teaser: "Teaser",
  baseText: "BaseText",
}

export const fractions = [
  ["6:3", 5],
  ["1:1", 3],
  ["3:2", 3],
  ["1:8", 1],
  ["2:3", 3],
  ["8:1", 8],
  ["1:8", 1],
  ["2:3", 3],
  ["3:1", 5],
  ["1:3", 1.5],
]

export function closestFraction(aspect) {
  // Calculate the absolute difference between the given aspectber and each fraction in the list
  const diffs = []
  for (let i = 0; i < fractions.length; i++) {
    // let fraction = 1
    const fraction = Number(fractions[i][0][0] / fractions[i][0][1])
    // for (let j = 0; j < parts.length; j++) {
    //   fraction /= Number(parts[j])
    // }
    diffs.push(Math.abs(fraction - aspect))
  }

  // Find the index of the smallest difference (the closest fraction)
  // const closestIndex = diffs.indexOf(Math.min(...diffs))
  let closestIndex = 0
  let minDiff = diffs[0]
  for (let i = 1; i < diffs.length; i++) {
    if (diffs[i] < minDiff) {
      minDiff = diffs[i]
      closestIndex = i
    }
  }

  // Return the value of the closest fraction
  const closest = fractions[closestIndex]
  return [closest[1]]
}
