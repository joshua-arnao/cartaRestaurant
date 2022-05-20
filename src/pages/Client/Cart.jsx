import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { size } from "lodash";
import { useProduct } from "../../hooks";
import { getProductsCart } from "../../api/cart";
import { ListProductCart } from "../../components/Client";
import { Button } from "@chakra-ui/react";

export function Cart(props) {
  const [products, setProducts] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const { getProductById } = useProduct();
  const { tableNumber } = useParams();

  useEffect(() => {
    (async () => {
      const idProductsCart = getProductsCart();
      //console.log(idProductsCart);
      const productArray = [];
      for await (const idProduct of idProductsCart) {
        //console.log(idProduct);
        const response = await getProductById(idProduct);
        //console.log(response);
        productArray.push(response);
      }
      setProducts(productArray);
    })();
  }, [reloadCart]);

  const onReloadCart = () => setReloadCart((prev) => !prev);

  return (
    <div>
      <h2>Carrito</h2>
      {!products ? (
        <p>Cargando...</p>
      ) : size(products) === 0 ? (
        <div>
          <p>Tu carrito esta vacio</p>
          <Link to={`/client/${tableNumber}/orders`}>
            <Button>Ver pedidos</Button>
          </Link>
        </div>
      ) : (
        <ListProductCart products={products} onReloadCart={onReloadCart} />
      )}
    </div>
  );
}
