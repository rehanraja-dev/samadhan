// Using reduce method to find total marks from marksArray
const marksArray = [70, 80, 85, 60, 89];
const totalMarks = marksArray.reduce((total, item) => {
    return total + item;
}, 0);

console.log("Total from marksArray:", totalMarks);

// Nested object with subject details
const marksNestedObject = {
    Math: { marksObtained: 70 },
    English: { marksObtained: 80 },
    Science: { marksObtained: 85 },
    History: { marksObtained: 60 },
    Computer: { marksObtained: 89 },
};

// Extract marks and use reduce to find total
const totalFromNested = Object.values(marksNestedObject).reduce((total, subject) => {
    return total + subject.marksObtained;
}, 0);

console.log("Total from nested object:", totalFromNested);
