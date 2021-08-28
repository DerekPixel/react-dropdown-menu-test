
export function duplicateObjectsInArrayOrObject(thingThatNeedsToBeDupped) {
  var thingCopy, thingClone;

  if(Array.isArray(thingThatNeedsToBeDupped)) {
    thingCopy = thingThatNeedsToBeDupped.slice();
    thingClone = [];
    for(var i = 0; i < thingCopy.length; i++) {
      var objClone = {...thingCopy[i]}
  
      thingClone.push(objClone);
    }
  } else {
    thingCopy = {...thingThatNeedsToBeDupped};
    thingClone = {};
    for(var i = 0; i < Object.keys(thingCopy).length; i++) {
      var objClone = {...thingCopy[Object.keys(thingCopy)[i]]}
  
      thingClone[Object.keys(thingCopy)[i]] = objClone;
    }
  }

  return thingClone;
}

export function shuffleArray(array) {

  var arrayCopy = array.slice();

  var m = arrayCopy.length, t, i;

  while(m) {
    i = Math.floor(Math.random() * m--);

    t = arrayCopy[m];
    arrayCopy[m] = arrayCopy[i];
    arrayCopy[i] = t;
  }

  return arrayCopy
}


function pimp() {
  console.log('pimp');
  return 'pimp';
}

export default pimp;