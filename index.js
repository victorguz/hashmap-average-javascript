/**
 * your task is to create a function that will take an array of objects and return a new array of objects. 
 * Take in account you must to return the same output array structure as in the example.
 * 
 */

//Input
// [
//   { id: 'A1', quantity: 2, price: 10.0 },
//   { id: 'B2', quantity: 1, price: 5.0 },
//   { id: 'A1', quantity: 3, price: 12.0 }, // same id A1 at different price
//   { id: 'C3', quantity: 4, price: 2.5 }
// ]
// Output
// [
//   { id: 'A1', quantity: 5, unitPrice: 11.20, totalPrice: 56.00 }
//   { id: 'B2', quantity: 1, unitPrice: 5.00, totalPrice: 5.00 },
//   { id: 'C3', quantity: 4, unitPrice: 2.50, totalPrice: 10.00 }
// ]

function combineArrays(inputArray) {
  const firstResult = inputArray.map((elem) => {
    const equal = findEqualId(inputArray, elem.id);

    const sum = equal.reduce((acc, val) => acc + val.price * val.quantity, 0);

    const quantity = equal.reduce((acc, val) => acc + val.quantity, 0);

    const avg = sum / quantity;

    return {
      ...elem,

      quantity,

      unitPrice: avg,

      totalPrice: sum,
    };
  });

  return firstResult;
}

function findEqualId(arr, id) {
  return arr.filter((val) => val.id == id);
}

const input = [
  { id: "A1", quantity: 2, price: 10.0 },

  { id: "B2", quantity: 1, price: 5.0 },

  { id: "A1", quantity: 3, price: 12.0 }, // same id A1 at different price

  { id: "C3", quantity: 4, price: 2.5 },
];

const result = combineArrays(input);

console.log(result);
