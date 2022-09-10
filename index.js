
const productos = [
    {id: 102, nombre: "cafe tostado", cant: "1000gr", stock: 15, precio:3000, mayor: "no"},
    {id: 203, nombre: "cafe colombiano", cant: "250gr", stock: 12, precio:1800, mayor: "no"},
    {id: 301, nombre: "cafe descafeinado", cant: "500gr", stock: 18,precio:1750, mayor: "no"},
    {id: 423, nombre: "cafe arábico", cant:"200gr", stock: 14, precio:800, mayor: "no"},
  ]; 

const bebidas = [
  {id: 1235, nombre: "Baileys", stock: 12 , precio:3200},
  {id: 5214, nombre: "Amarula", stock: 10, precio:3000},
  {id: 0120, nombre: "Bacardí carta oro", stock: 6, precio:3500},
  {id: 0025, nombre: "Martini", stock: 12, precio:1800},
  {id: 8686, nombre: "Jack Daniel's Honey", stock: 8, precio:3800},
  {id: 0011, nombre: "Bombay Sapphire", stock: 8, precio:2000},
]

const stockeado = productos.concat(bebidas);
let stockPublico =  stockeado.map(item => {
  return{
      Nombre: item.nombre,
      Stock: item.stock
  }
})

let filtrados = stockeado.filter(item => item.mayor === "no");

let entrada = prompt("¿Tiene 18 años o más?").toLowerCase();
while(entrada !="ESC"){
  switch (entrada) {
      case "Si".toLowerCase():
        alert("Esta es la lista de productos que puede comprar", stockPublico);
      break;

  case "No".toLowerCase():
      alert("Puede acceder a los siguientes productos:", filtrados);
     break; 

  default:
      
      break;
  }
  alert("Gracias. Esperamos su compra");
  entrada = prompt("¿Es mayor a 18 años de edad?");
} 
