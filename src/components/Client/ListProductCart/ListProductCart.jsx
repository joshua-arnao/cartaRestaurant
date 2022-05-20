import React, { useState, useEffect } from "react";
import { map, forEach } from "lodash";
import { useParams, useHistory } from "react-router-dom";
import { removeProductCartApi, cleanProductCartApi } from "../../../api/cart";
import { useOrder, useTable } from "../../../hooks";
import { Avatar, Text, IconButton, Button, Divider } from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";

export function ListProductCart(props) {
  const { products, onReloadCart } = props;
  const [total, setTotal] = useState(0);
  const { addOrderToTable } = useOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const history = useHistory();

  useEffect(() => {
    let totalTemp = 0;
    forEach(products, (product) => {
      totalTemp += Number(product.price);
    });
    setTotal(totalTemp.toFixed(2));
  }, [products]);

  const removeProduct = (index) => {
    removeProductCartApi(index);
    onReloadCart();
  };

  const createOrder = async () => {
    const tableData = await getTableByNumber(tableNumber);
    const idTable = tableData[0].id;
    //console.log(idTable);
    //console.log(tableData);
    for await (const product of products) {
      await addOrderToTable(idTable, product.id);
    }

    cleanProductCartApi();
    history.push(`/client/${tableNumber}/orders`);
  };

  return (
    <div>
      <Text>ListProductCart</Text>
      {map(products, (product, index) => (
        <div key={index}>
          <div>
            <Avatar src={product.image} />
            <span>{product.title.substring(0, 15)}</span>
          </div>
          <span>{product.price} $</span>
          <IconButton
            icon={<MdDeleteForever />}
            onClick={() => removeProduct(index)}
          />
          <Divider />
        </div>
      ))}

      <Button onClick={createOrder}>Realizar Pedido ({total} $)</Button>
    </div>
  );
}
