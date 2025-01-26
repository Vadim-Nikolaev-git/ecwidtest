//запуск проверки на количество товара при загрузке страницы
// document.addEventListener('load', checkProductsQuantity);
window.onload = () => {
  setTimeout(() => {
    checkProductsQuantity(() => {
      console.log("Проверка товаров завершена");
    });
  }, 700);
  checkProductsQuantity(), console.log("страница загружена, скрипт начил работу");
}

//ф-ия для проверки корзины и добавления товара в корзину
function checkCart(clicked_id){
  Ecwid.Cart.get(function(cart){
    console.log(cart);

    //проверка есть ли товар в корзине
    const CheckID = cart.items.some(item => item.product.id == clicked_id);
      if (CheckID) {
          console.log("Этот товар уже добавлен в корзину");
          alert("Этот товар уже добавлен в корзину");
      } else {
          addToCart(clicked_id);
      }
  });
}


// добавит товар если условие проерки выполнено
function addToCart(clicked_id){
  var product = {
    id: clicked_id,
    quantity: 1,
    callback: function(success, product, cart) {
      //здесь установлена ф-ия проверки, т.к. нужно запускать ее после callback
      checkProductsQuantity ()
      console.log('Добавлен товар с id - ', clicked_id);
    }
  }

  Ecwid.Cart.addProduct(product);

}

// Проверка количества товара в корзине
// function checkProductsQuantity () {
//   function cartCallback(cart) {
//     console.log(cart);
//     const productsQuantity = cart.productsQuantity;
//     console.log("общеее кол-во товаров", productsQuantity);
//     if (productsQuantity == 5) {
//       console.log("Вы собрали автомобиль");
//       hideGroup ()
//     } else if (productsQuantity == 0) {
//       showGroup ()
//     } else {
//       console.log("ошибка в проверке товара на количество");
//     }
//     console.log("функция checkProductsQuantity завершила работу");

//     if (callback) {
//       callback();
//     }
//   }

//   Ecwid.Cart.get(cartCallback);
// }





// Проверка количества товара в корзине
function checkProductsQuantity () {
  Ecwid.Cart.get(function(cart){
    console.log(cart);
    const productsQuantity = cart.productsQuantity;
    console.log("общеее кол-во товаров", productsQuantity);
    if (productsQuantity == 5) {
      console.log("Вы собрали автомобиль");
      hideGroup ()
    } else if (productsQuantity == 0) {
      showGroup ()
    } else {
      console.log("ошибка в проверке товара на количество");
    }
    console.log("функция checkProductsQuantity завершила работу");
  });
}


//задаются переменные
var successBlock = document.getElementById('success')
var carimgBlock = document.getElementById('carimg')

// добавляется надпись о собранном авто, скрывается картинку авто
function hideGroup () {
successBlock.style.display = "block";
carimgBlock.style.display = "none";
}

// добавляется надпись о собранном авто, скрывается картинку авто
function showGroup () {
  successBlock.style.display = "none";
  carimgBlock.style.display = "block";
}

// очистка всей корзины
function removeProduct() {
Ecwid.Cart.clear(function(success,error) {
  if (success == true) {
      console.log("Cart was cleared");
      alert("Cart was cleared");
      checkProductsQuantity ()
  } else {
      console.log("Cart clear failed. Error message: " + error);
  }
});

}
