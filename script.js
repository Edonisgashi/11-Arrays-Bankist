"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (acc) {
  containerMovements.innerHTML = "";

  acc.movements.forEach(function (value, i) {
    const type = value > 0 ? "deposit" : "withdrawal";
    const html = `
        <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        
        <div class="movements__value">${value}€</div>
        `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
const updateUI = function (acc) {
  displayMovements(acc);

  calcDisplayBalance(acc);

  calcDisplaySummary(acc);
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => (acc += curr), 0);

  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const deposits = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const withdrawals = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${deposits}€`;
  labelSumOut.textContent = `${Math.abs(withdrawals)}€`;

  const interests = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interests}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((letter) => letter.at(0))
      .join("");
  });
};
createUsernames(accounts);

let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back , ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();
  } else if (
    !currentAccount ||
    currentAccount.pin !== Number(inputLoginPin.value)
  ) {
    labelWelcome.textContent =
      "Your username/pin is not correct . Please , check your infromations !";
    containerApp.style.opacity = 0;
  }
  updateUI(currentAccount);
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  inputTransferTo.value = inputTransferAmount.value = "";

  if (
    amount > 0 &&
    amount < currentAccount.balance &&
    receiverAcc &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  } else {
    document.querySelector("h2").textContent =
      "Your transaction hasn't been made . Try again !";
    inputTransferAmount;
    value = "";
    inputTransferTo.value = "";
    btnTransfer.disabled = true;
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
// SIMPLE ARRAY METHODS
// slice
// const arr = ["a", "b", "c", "d", "e"];
// // console.log(arr.slice()); // returns a shallow copy of array
// // console.log(arr.slice(-1)); // extracts last element of an array
// // console.log(arr.slice(1, 3)); // extracts from position 1 (includes) until position 3(doesn't include)

// // // splice
// // //console.log(arr.splice(2, 3)); // deletes from positon 2 , 3 is deleteCount
// // console.log(arr.splice(-1)); // deletes last element

// // reverse
// const arr2 = ["k", "j", "i", "h", "g", "f"];
// console.log(arr2.reverse());

// // concat
// //const letters = arr.concat(arr2); // equivalent of the spread operator
// const letters = [...arr, ...arr2];
// console.log(letters);

// // join
// console.log(letters.join("_"));

// // at

// console.log(letters.at(0));
// console.log(letters.at(-1));
// console.log(letters.at(25)); // undefined

// forEach

// // for (let movement of movements) {
// //   if (movement > 0) {
// //     console.log(`You deposited ${movement}$`);
// //   } else {
// //     console.log(`You withdrew ${Math.abs(movement)} $`);
// //   }
// // }

// movements.forEach(function (movement, index, arr) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}$`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}$`);
//   }
//   //   console.log(index);
//   //   console.log(arr);
// });

// maps
// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);
// currencies.forEach(function (value, key, map) {
//   console.log(`${key} : ${value}`);
// });

// const currenciesUnique = new Set(["USD", "EUR", "EUR", "USD", "GBP"]);
// currenciesUnique.forEach(function (value, _, set) {
//   console.log(`${value} : ${value}`);
//   console.log(set);
// });

//////////////////////////
// CODING CHALLENGE #1

// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
// 1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
// 4. Run the function for both test datasets
// HINT: Use tools from all lectures in this section so far 😉
// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// const checkDogs = function (dogsJulia, dogsKate = 0) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);
//   const allDogs = [...dogsJuliaCorrected, ...dogsKate];
//   console.log(allDogs);

//   allDogs.forEach(function (dog, i) {
//     if (dog >= 3) {
//       console.log(`Dog number ${i + 1} is an adult , and is ${dog} years old`);
//     } else if (dog < 3) {
//       console.log(`Dog number ${i + 1} is still a puppy`);
//     }
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// map array method
//
// const eurToUsd = 1.1;
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const movementsUsd = movements.map(function (move) {
//   return move * eurToUsd;
// });
// console.log(movementsUsd);

// const movementsUsd = movements.map((mov) => mov * eurToUsd);

// console.log(movementsUsd);

// const movementsDescription = movements.map((mov, i, arr) => {
//   const str =
//     mov > 0 ? `You deposited ${mov}€` : `You witdhrew ${Math.abs(mov)}€`;
//   return `Movement ${i + 1} : ${str}`;
// });

// console.log(movementsDescription);

// filer

// const deposits = movements.filter((mov) => mov > 0);
// const withdrawals = movements.filter((mov) => mov < 0);
// console.log(withdrawals);
// console.log(deposits);

// const deposits = [];
// const withdrawals = [];
// for (const mov of movements) {
//   if (mov > 0) {
//     deposits.push(mov);
//   } else {
//     withdrawals.push(mov);
//   }
// }
// console.log(deposits);
// console.log(withdrawals);

// reduce

// const balance = movements.reduce((previousValue, currentValue, i) => {
//   return (previousValue += currentValue);
// }, 0);
// console.log(balance);

// let sum = 0;
// for (let mov of movements) {
//   sum += mov;
// }
// console.log(sum);

//const maximum = movements.reduce((acc, curr) => {
//  if (acc > curr) return acc;
//  else return curr;
//});
//console.log(maximum);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map((age) => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter((age) => age >= 18);

//   console.log(humanAges);
//   console.log(adults);

//   // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
//   const average = adults.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );

//   return average;
// };
// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.13;
// const deposits = movements
//   .filter((mov) => mov > 0)
//   .map((mov) => mov * eurToUsd)
//   .reduce((acc, mov) => (acc += mov));
// console.log(deposits);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4] */

// const calcAverageHumanAge = (ages) =>
//   ages
//     .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter((age) => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// console.log(avg1, avg2);
