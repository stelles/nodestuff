const Index = require('./index');

// Call an example function, to demonstrate overall structure
test('Example', () => {
  expect(Index.example('test')).toBe('test');
});

// Test that "sum" function can add two arguments
test('sum works on two arguments', () => {
  expect(Index.sum(3, 4)).toBe(7);
  expect(Index.sum(-15, 5)).toBe(-10);
  expect(Index.sum(-30.5, 45.5)).toBe(15);
});

// Test that same "sum" function can add any number of arguments
test('sum works on many arguments', () => {
  expect(Index.sum(4, 5, 6)).toBe(15);
  expect(Index.sum(1,2,3,4,5,6,7,8,9,10)).toBe(55)
  expect(Index.sum(-5,-4,-3,-2,-1,0,1,2,3,4,5)).toBe(0);
});

// Test that same "sum" function understands corner cases
test('sum works on a single argument, or zero args', () => {
  expect(Index.sum(12)).toBe(12);
  expect(Index.sum()).toBe(0);
});

// test the function "vowelize" (vowels are “a”, “e”, “i”, “o”, and “u”)
test('the vowelize function', () => {
  expect(Index.vowelize(['cornhole', 'waistcoat', 'tumblr'])).toEqual(['ooe', 'aioa', 'u']);
  expect(Index.vowelize(['bacon', 'ham', 'pork'])).toEqual(['ao', 'a', 'o']);
});

// should return nothing for words without vowels
test('the vowelize function for words without vowels', () => {
  expect(Index.vowelize(['sky', 'gypsy', 'nymph'])).toEqual([]);
});

// test the "combineAndSort" function, which should combine and alphabetize
test('combineAndSort function', () => {
  expect(Index.combineAndSort(['kiwi', 'apple', 'banana'], ['orange', 'coconut'])).toEqual(['apple', 'banana', 'coconut', 'kiwi', 'orange']);
  expect(Index.combineAndSort([], ['zucchini', 'cauliflower'])).toEqual(['cauliflower', 'zucchini']);
  expect(Index.combineAndSort(['beta', 'alpha'], [])).toEqual(['alpha', 'beta']);
  expect(Index.combineAndSort([], [])).toEqual([]);

});

test('don\'t modify combineAndSort arguments', () => {
  const arr1 = ['kombucha', 'scooter', 'snowboard'];
  const arr2 = ['macbook', 'iphone', 'airpods'];
  Index.combineAndSort(arr1, arr2);

  expect(arr1).toEqual(['kombucha', 'scooter', 'snowboard']);
  expect(arr2).toEqual(['macbook', 'iphone', 'airpods']);
});


// test the "anagramTester" function (an anagram is a word with the letters rearranged)
test('anagramTester function for two words', () => {
  expect(Index.anagramTester('stressed', 'desserts')).toEqual(true);
  expect(Index.anagramTester('The Morse code', 'Here come dots')).toEqual(true);
  expect(Index.anagramTester('hipster', 'mustache')).toEqual(false);
  expect(Index.anagramTester('O Draconian devil', 'Leonardo da Vinci')).toEqual(true);
});

// Write our own version of forEach()
test('forEach', () => {
  const heidi = {
    name: 'Heidi',
    cute: true,
  };

  const heidiKeys = [];
  Index.forEach(heidi, (_value, key) => {
    heidiKeys.push(key);
  });

  expect(heidiKeys).toContain('name');
  expect(heidiKeys).toContain('cute');
});

// Write a setIn() function that sets a value at a dotted path inside an object
test('setIn works on a nested object with dotted path', () => {
  const obj = {
    student123: {
      gpa: {
        inMajor: 3.5,
        total: 3.2,
      },
      birthday: '1997-02-21',
    },
    student124: {
      gpa: {
        inMajor: 3.6,
        total: 3.4,
      },
      birthday: '1998-04-12',
    },
  };

  Index.setIn(obj, 'student123.gpa.inMajor', 3.55);
  expect(obj.student123.gpa.inMajor).toBe(3.55);
  expect(obj.student124.gpa.inMajor).toBe(3.6); // other student unchanged
  expect(obj.student123.gpa.total).toBe(3.2); // other gpa unchanged
});

// Sets up an array of random objects, then calls a shallowMergeObjects function with each object as an argument
// Important note: it does not pass the array directly, it calls the function with multiple arguments (one for each object in the array)
// shallowMergeObjects should return a new object which consists of all keys (at a shallow level) from every passed object (effectively merging all passed objects into a new object)
test('Create new object from merging existing objects', () => {
  const objects = [
    { a: 1, b: 2 },
    { c: 3, d: 4 },
    { nested: { deep: true, fibs: [0, 1, 1, 2, 3, 5, 8] } },
    { a: 5, b: 6 }, // overwrite earlier keys
  ];
  const objectsClone = JSON.parse(JSON.stringify(objects))
  const newObject = Index.shallowMergeObjects(...objects);

  // The original object should be unchanged
  expect(objects).toEqual(objectsClone);

  // when keys match, the later one takes precedence
  expect(newObject.a).toBe(5);
  expect(newObject.b).toBe(6);

  // The new object should be merged
  const mergedObject = Object.assign({}, ...objects);
  expect(newObject).toEqual(mergedObject);
});

// Test new Class "Car" that initiates with "initialFuelLevel" and "fuelCapacity"
// The "Car" can be filled with any number of gas, but no more than it's tank size
test('Car cannot be filled beyond capacity', () => {
  const camry = new Index.Car({ initialFuelLevel: 4.25, fuelCapacity: 13 });
  expect(camry.getFuelLevel()).toBe(4.25);
  camry.addFuel(6);
  expect(camry.getFuelLevel()).toBe(10.25);
  camry.addFuel(10);
  expect(camry.getFuelLevel()).toBe(13);
});

// Tests that cookThanksgivingDinner accepts a single parameter with a variety of actions on it
// and calls those actions in the correct order: preheatOven first, then when that's done
// both cookTurkey and cookDressing can be done simultaneously, and then when both of those are done
// serveDinner can be called (beware of burning things though by leaving it in the oven too long!)
// Note: the test passes when "done();" is called (meaning serveDinner needs to be successfully called for it to pass)

test('Promises', (done) => {
  let ovenPreheated = false;
  let turkeyCooked = false;
  let turkeyBurned = false;
  let dressingCooked = false;
  let dressingBurned = false;
  const actions = {
    preheatOven: () => new Promise((resolve) => {
      setTimeout(() => {
        ovenPreheated = true;
        resolve();
      }, 50);
    }),
    cookTurkey: () => new Promise((resolve, reject) => {
      if (!ovenPreheated) reject(new Error('must preheat the oven before cooking turkey'));

      setTimeout(() => {
        turkeyCooked = true;
        resolve();
      }, 300);

      setTimeout(() => { turkeyBurned = true; }, 400);
    }),
    cookDressing: () => new Promise((resolve, reject) => {
      if (!ovenPreheated) reject(new Error('must preheat the oven before cooking dressing'));
      setTimeout(() => {
        dressingCooked = true;
        resolve();
      }, 100);

      setTimeout(() => { dressingBurned = true; }, 400);
    }),
    serveDinner: () => new Promise((resolve, reject) => {
      if (!turkeyCooked || !dressingCooked) reject(new Error("Whoops, can't serve before we cook the turkey and dressing"));
      setTimeout(() => {
        if (turkeyBurned || dressingBurned) {
          done.fail('turkey or dressing burned');
          reject(new Error(`Uh oh, you burned the ${turkeyBurned ? 'turkey' : 'dressing'}! Maybe try multitasking?`));
          return;
        }
        resolve();
        done();
      }, 30);
    }),
  };

  // okay, enough setup. Let's do the test.
  Index.cookThanksgivingDinner(actions)
   .then(() => console.log('nice work on the turkey dinner!'))
   .catch((err) => {
     console.error(err);
     throw err;
   });
});

// Test the "calc" function which will allow the following to work:
// calc(10)('+')(12) >> 22
// calc(90)('-')(10) >> 80
test('the calc function', () => {
  expect(Index.calc(10)('+')(12)).toBe(22);
  expect(Index.calc(90)('-')(10)).toBe(80);
});
