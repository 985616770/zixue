// forEach
function queue(things) {
  let promise = Promise.resolve();
  things.forEach(thing => {
    promise = promise.then(() => {
      return new Promise(resolve => {
        doThing(thing, () => {
          resolve;
        });
      });
    });
  });
}

// reduce

function queue(things) {
  return things.reduce((promise, thing) => {
    return promise.then(() => {
      return new Promise(resolve => {
        doThing(thing, () => {
          resolve();
        });
      });
    });
  },Promise.resolve());
}

queue(['lots', 'of']);
