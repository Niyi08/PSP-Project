let carrito = [];

function agregarProducto(button) {
  const producto = button.parentNode;
  const id = producto.getAttribute('data-id');
  const nombre = producto.getAttribute('data-nombre');
  //const precio = parseFloat(producto.getAttribute('data-precio'));
  const precio = parseFloat(producto.getAttribute('data-precio'));

  const itemCarrito = carrito.find(item => item.id === id);

  if (itemCarrito) {
    itemCarrito.cantidad++;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }

  actualizarTablaCarrito();
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarTablaCarrito();
}

function editarCantidad(index, input) {
  const nuevaCantidad = parseInt(input.value);

  if (nuevaCantidad >= 0) {
    carrito[index].cantidad = nuevaCantidad;
    actualizarTablaCarrito();
  }
}

function actualizarTablaCarrito() {
  const tablaCarrito = document.getElementById('tablaCarrito');
  tablaCarrito.innerHTML = `
    <tr>
      <th>Producto</th>
      <th>Precio</th>
      <th>Cantidad</th>
      <th>Total</th>
      <th>Eliminar productos</th>
    </tr>
  `;

  let total = 0;

  carrito.forEach((item, index) => {
    const fila = document.createElement('tr');
    const totalItem = item.precio * item.cantidad;
    total += totalItem;

    fila.innerHTML = `
      <td>${item.nombre}</td>
      <td>$${item.precio}</td>
      <td>
        <input type="number" value="${item.cantidad}" onchange="editarCantidad(${index}, this)">
      </td>
      <td>$${totalItem}</td>
      <td>
        <button onclick="eliminarProducto(${index})">Eliminar</button>
      </td>
    `;
    tablaCarrito.appendChild(fila);
  });

  const filaTotal = document.createElement('tr');
  filaTotal.innerHTML = `
    <td colspan="3"></td>
    <td><strong>Total:</strong></td>
    <td><strong>$${total}</strong></td>
  `;
  tablaCarrito.appendChild(filaTotal);
}
