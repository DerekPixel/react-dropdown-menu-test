
export function duplicateObjectsInArrayOrObject(thingThatNeedsToBeDupped) {
  let thingClone;

  if(Array.isArray(thingThatNeedsToBeDupped)) {
    thingClone = makeNewArrayThenPopulateWithClonedObjects(thingThatNeedsToBeDupped);
  } else {
    thingClone = makeNewObjectThenPopulateWithClonedObjects(thingThatNeedsToBeDupped);
  }
  
  return thingClone;
}

function makeNewArrayThenPopulateWithClonedObjects(arrayThatIsBeingCloned) {
  let newArray = [];
  let arrayCopy = arrayThatIsBeingCloned.slice();
  populateArrayWithClonedObjects(arrayCopy, newArray);

  return newArray;
}

function populateArrayWithClonedObjects(arrayCopy, newArray) {
  for (let i = 0; i < arrayCopy.length; i++) {
    let objClone = { ...arrayCopy[i] };
    newArray.push(objClone);
  }
  return newArray
}

function makeNewObjectThenPopulateWithClonedObjects(ObjectThatIsBeingCloned) {
  let newObject = {};
  let objectCopy = { ...ObjectThatIsBeingCloned };
  populateObjectWithClonedObjects(objectCopy, newObject);

  return newObject;
}

function populateObjectWithClonedObjects(objectCopy, newObject) {
  for (let i = 0; i < Object.keys(objectCopy).length; i++) {
    let objClone = { ...objectCopy[Object.keys(objectCopy)[i]] };
    newObject[Object.keys(objectCopy)[i]] = objClone;
  }
  return newObject;
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