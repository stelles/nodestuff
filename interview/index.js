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
    sl1 = s1.toLowerCase().split();
    sl2 = s2.toLowerCase().split();
    sl1.sort();
    sl2.sort();
    for (var i=0)
    return sl1 == sl2;
}

module.exports = {
  example: function(message) { return message; },
  sum: sum,
  vowelize: vowelize,
  combineAndSort: combineAndSort,
  anagramTester: anagramTester,
}
