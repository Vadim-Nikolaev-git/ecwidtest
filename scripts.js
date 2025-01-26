//задаются переменные
var successBlock = document.getElementById('success')
var carimgBlock = document.getElementById('carimg')

//запуск проверки на количество товара при загрузке страницы
window.onload = () => {
  setTimeout(() => {
    checkProductsQuantity(() => {
      console.log("Проверка товаров завершена");
    });
  }, 600);
  console.log("страница загружена, скрипт начал работу");
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
function checkProductsQuantity () {
  Ecwid.Cart.get(function(cart){
    console.log(cart);
    const productsQuantity = cart.productsQuantity;
    console.log("общеее кол-во товаров", productsQuantity);
    if (productsQuantity == 5) {
      console.log("Вы собрали автомобиль");
      hideCar ()
    } else if (productsQuantity < 5) {
      showCar ()
    } else {
      console.log("ошибка в проверке товара на количество");
    }
    console.log("функция checkProductsQuantity завершила работу");
  });
}

// добавляется надпись о собранном авто, скрывается картинку авто
function hideCar () {
successBlock.style.display = "block";
carimgBlock.style.display = "none";
}

// скрывается надпись о собранном авто, отображается картинку авто
function showCar () {
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
