const productosPet = [
  { id: 1, title: "Cat chow Multiproteínas para Gatitos x3kg", price:3200, img: "https://hiperlibertad.vteximg.com.br/arquivos/ids/197744-1000-1000/ALIMENTO-PARA-GATOS-CAT-CHOW-GATITOS-PESCADO-CARNE-Y-VEGETALES-X-8-Kg-1-29005.jpg?v=637904938039600000", },
  { id: 2, title: "Cat chow para gatos Esterilizados x3kg.", price:2900, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9KTYDxwvL83zjDRukQ0jnb8orbx_d_rJSlA&usqp=CAU3", },
  { id: 3, title: "Dod chow razas minis x8kg.", price:7800, img: "https://7483c243aa9da28f329c-903e05bc00667eb97d832a11f670edad.ssl.cf1.rackcdn.com/20428697-p_oLGmuE.jpg", },
  { id: 4, title: "Dog Chow Raza mediana y grande x21kg.", price:19990, img: "https://www.timberline.com.ar/5307-home_default/dog-chow-adulto-raza-mediana-y-grande-con-colorantes-x-21kg.jpg", },
  { id: 5, title: "Dog chow cachorros x1.5kg.", price:3250, img: "https://www.lacoopeencasa.coop/media/lcec/publico/articulos/2/6/8/2688cd789af66df3cc744beda5a660eb", },
];

let carrito = [];

const items = document.querySelector("#items");
const carritoHTML = document.querySelector("#carrito");

//pintar productos en la tienda
function renderizarProductos(){
  productosPet.forEach((producto) => {
      let productoHTML = `
      <div class="col-12 col-md-6 mb-5 d-flex justify-content-center">
      <div class="card text-light bg-dark" style="width: 18rem;">
          <img class="card-img-top" src="${producto.img}" alt="Card image cap">
          <div class="card-body">
              <h5 class="card-title">${producto.title}</h5>
              <p class="card-text"> Some quick example texr to build on the card title and make up the bulk of the card's content.</p>
              <p>$${producto.price}</p>
              <button class="btn btn-primary" onclick="agregarProductoAlCarrito(${producto.id})">Añadir al carrito</button>
          </div>
      </div>
      </div>
  `;
      items.innerHTML += productoHTML;
  });
}
renderizarProductos();

/* Añadir productos al carrito */
/* Identificar el producto que eligió */
/* Mostrar la info del producto */
/* Si el producto ya esta solo modifica la cant */
/* Calcular el total */

let guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito)); 
}
let carritoStorage = JSON.parse(localStorage.getItem("carrito"));

function agregarProductoAlCarrito(id){
  let producto = productosPet.find((producto)=> producto.id === id);
  
  let productoEnCarrito = carrito.find((producto) => producto.id === id);
  productoEnCarrito ? productoEnCarrito.cantidad++ : (producto.cantidad = 1, carrito.push(producto));

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Producto agregado al carrito',
    showConfirmButton: false,
    timer: 1500
  })
  guardarCarrito();
  renderizarCarrito();
  calcularTotal();
  
}

function renderizarCarrito(){
  
let htmlCarrito = ""

  carrito.forEach((prod, id) =>{
      htmlCarrito+=`
      <div class=" d-flex flex-row justify-content-center">
          <div class="card text-dark flex-row" style="width: 15rem;">
              <img style="width: 100%;" src="${prod.img}" alt="Card image cap">
          </div>
          <div class"card-body">
              <h5 class="card-title">${prod.title}</h5>
              <p>${prod.price}</p>
              <p>Cantidad: ${prod.cantidad}</p>
              <button class="btn btn-danger" onclick="eliminarProductoDelCarrito(${id})">Eliminar</button>
          </div>
      </div>
      `
  })
carritoHTML.innerHTML = htmlCarrito
}

function calcularTotal(){
let total = 0

carrito.forEach((prod)=>{
  total += prod.price * prod.cantidad;
});
const t = document.getElementById("total")
t.innerHTML = `<h5>$${total}</h5>`
}

carritoStorage ? (carrito = carritoStorage, renderizarCarrito(), calcularTotal()) : ("");

function eliminarProductoDelCarrito(id) {

    carrito[id].cantidad--;
    carrito[id].cantidad === 0 ? carrito.splice(id, 1) : ("");

    guardarCarrito();
    calcularTotal();
    renderizarCarrito();

}

function vaciarCarrito(){
 
  Swal.fire({
    title: 'Está seguro de eliminar el carrito?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar!'
  }).then((result) => {
    result.isConfirmed ? (carrito = [], renderizarCarrito(), calcularTotal(), localStorage.clear(), Swal.fire('Elimiando!', 'Tu carrito ha sido elimiando.', 'success') ) : ("");
  })
  
}

const vaciar = document.querySelector("#boton-vaciar");
vaciar.addEventListener("click", vaciarCarrito);