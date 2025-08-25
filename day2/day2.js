const marksArray = [10, 76, 66, 77, 92, 3, 66, 30, 87]
let highest = marksArray[0]

for (let i = 0; i < marksArray.length; i++) {
    if (marksArray[i] > highest) {
        highest = marksArray[i]
    }
}

console.log(highest)