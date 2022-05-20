import React from "react";
import { map } from "lodash";
import { toast } from "react-toastify";
import { addProductCart } from "../../../api/cart";
import { Image, Text, Button } from "@chakra-ui/react";

export function ListProducts(props) {
  const { products } = props;
  console.log("productos ->", products);

  const addcart = (product) => {
    //console.log("Añadido carrito", product.title);
    addProductCart(product.id);
    toast.success(`${product.title} Añadido al carrito`);
  };

  return (
    <div>
      {map(products, (product) => (
        <div key={product.id}>
          <div>
            <Image src={product.image} />
            <Text>{product.title}</Text>
          </div>
          <Button onClick={() => addcart(product)}>Agregar</Button>
        </div>
      ))}
    </div>
  );
}
