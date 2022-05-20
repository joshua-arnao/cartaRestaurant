import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../../hooks";
import { ListProducts } from "../../components/Client";

export function Products() {
  const { tableNumber, idCategory } = useParams();
  //console.log(useParams());
  const { loading, products, getProductsByCategory } = useProduct();

  useEffect(() => {
    getProductsByCategory(idCategory);
  }, [idCategory]);

  console.log(products);

  return (
    <div>
      <Link to={`/client/${tableNumber}`}>Volver a Categorias</Link>
      {loading ? <p>Cargando...</p> : <ListProducts products={products} />}
    </div>
  );
}
