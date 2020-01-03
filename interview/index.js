function sum(){
    let total = 0;
    for (var i=0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

function vowelize(input_strings) {
    // TODO: refactor for speed
    let vowles = "aeiou";
    let vowelized_strings = [];
    for (var i=0; i < input_strings.length; i++){
        let cur_string = input_strings[i];
        let vowel_string = "";
        for (var k=0; k < cur_string.length; k++){
            let c = cur_string.charAt(k);
            if (vowles.includes(c)){
                vowel_string += c;
            }
        }
        if (vowel_string.length > 0){
            vowelized_strings.push(vowel_string);
        }
    }
    return vowelized_strings;
}

function combineAndSort(a1, a2) {
    // TODO add merge sort
    let newa1 = a1.slice(0, a1.lenth).sort();
    let newa2 = a2.slice(0, a2.lenth).sort();
    let final = [];
    while (newa1.length > 0 || newa2.length > 0) {
        if (newa1.length == 0){
            final.push(newa2.shift());
        } else if ( newa2.length == 0) {
            final.push(newa1.shift());
        }else if (newa1[0] < newa2[0]) {
            final.push(newa1.shift());
        } else {
            final.push(newa2.shift());
        }
    }
    return final;
}

function anagramTester(s1,s2){
    // TODO: make this more efficient
    let sl1 = s1.toLowerCase().split("");
    let sl2 = s2.toLowerCase().split("");
    sl1.sort();
    sl2.sort();
    if (sl1.length != sl2.length) {
        return false;
    }
    for (var i=0; i < sl1.length; i++){
        if (sl1[i] != sl2[i]) {
            return false;
        }
    }
    return true;
}

function forEach(obj, callback) {
    // callback was (val, key) so we keep that order
    for (const k in obj){
        callback(obj[k], k)
    }
}

function setIn(o, p, v){
    // Eval is not good but its so easy
    let evals = "o." + p + "=v;"
    console.log(evals);
    eval(evals);
}

function shallowMergeObjects() {
    // Object.assign pretty much is merge 2nd arg into first
    let copy = {};
    for (var i in arguments){
        let e = arguments[i];
        let c = Object.assign(copy, e);
    }
    return copy;
}

class Car {
    // Maybe could extend object but not sure so just pull out the fields
    constructor(o){
        this.fuel_level = o.initialFuelLevel;
        this.max_fuel = o.fuelCapacity;
    }

    getFuelLevel(){
        return this.fuel_level;
    }
    addFuel(n){
        this.fuel_level = Math.min(this.fuel_level + n, this.max_fuel);
    }
}

async function cookThanksgivingDinner(actions){
    // Prehead -> promise.all will wait for all of them -> finish
    let preheated = await actions.preheatOven();
    let cooked = await Promise.all([actions.cookTurkey(), actions.cookDressing()]);
    let finished = await actions.serveDinner();

    return true;
}

function calc(l) {
    // Evals is not the play but works
    return function(o) {
        return function (r) {
            evals = l + o + r;
            return eval(evals);
        }
    }
}

module.exports = {
  example: function(message) { return message; },
  sum: sum,
  vowelize: vowelize,
  combineAndSort: combineAndSort,
  anagramTester: anagramTester,
  forEach: forEach,
  setIn:setIn,
  shallowMergeObjects:shallowMergeObjects,
  Car:Car,
  calc:calc,
  cookThanksgivingDinner:cookThanksgivingDinner,
}
