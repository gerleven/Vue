/*app.js*/
const order = [["sunglasses", 1], ["bags", 2]];

//
const inventory = {
  sunglasses: 1900,
  pants: 1088,
  bags: 10,
};

const checkInventory = (order) => {
  return new Promise((resolve, reject) => { //ExecutorFunction
    setTimeout(() => {
      let inStock = order.every((item) => inventory[item[0]] >= item[1]);
      if (inStock) {
        resolve(`Thank you. Your order was successful.`);
      } else {
        reject(
          `We're sorry. Your order could not be completed because some items are sold out.`
        );
      }
    }, 1000);
  });
};

// Hendlers
function handleSuccess(resolvedValue) {
  console.log(resolvedValue);
}

function handleFailure(failureValue) {
  console.log(failureValue);
}

checkInventory(order).then(handleSuccess, handleFailure);// Formas sinonimas: //checkInventory(order).then(handleSuccess).then(handleFailure); //checkInventory(order).then(handleSuccess).catch(handleFailure);
