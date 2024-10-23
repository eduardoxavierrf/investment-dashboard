import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Order {
  stock: Stock;
  orderType: 'buy' | 'sell';
  quantity: number;
}

interface Stock {
  symbol: string
}

const OrderTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [symbol, setSymbol] = useState<string>('');
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth()

  const handleAddOrder = async () => {
    if (symbol && quantity) {
      if (!user) return

      const newOrder: Order = {
        stock: {symbol},
        orderType,
        quantity: Number(quantity),
      };
      setOrders([...orders, newOrder]);

      api.post("/orders", {
        'userId': user.userId,
        'symbol': symbol,
        'orderType': orderType,
        'quantity': quantity,
      }, {
        auth: {
          username: user.username,
          password: user.password
        }
      })
      .then(response => {
        console.log("teste")
      })
      .catch(error => {
        console.error('Error: ', error)
      })
      setSymbol('');
      setQuantity('');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if(!user) return
        const { data: responseData } = await api.get(`/orders/me`, {
          auth: {
            username: user.username,
            password: user.password
          }
        });
        console.log(responseData)
        setOrders(responseData)
      } catch (err: any) {
        setError(
          err.response?.data?.message || 
          'Erro ao carregar dados. Tente novamente mais tarde.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 text-sm">
      <h1 className="text-xl font-bold mb-4">Stock Orders</h1>
      <div className="mb-4 flex items-center">
        <div className=''>
          <input
            type="text"
            placeholder="Simbolo"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="border p-2 mr-2"
          />
        </div>
        <div>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value as 'buy' | 'sell')}
            className="border p-2 mr-2"
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        <div>
          <input
            type="number"
            placeholder="Quantidade"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border p-2 mr-2"
          />
        </div>
        <div>
          <button onClick={handleAddOrder} className="inline-flex items-center justify-center rounded-lg font-medium text-sm bg-green-500 text-white px-3 py-3">
            Adicionar Ordem
          </button>
        </div>
      </div>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Simbolo</th>
            <th className="border border-gray-300 p-2">Tipo</th>
            <th className="border border-gray-300 p-2">Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{order.stock.symbol}</td>
              <td className="border border-gray-300 p-2">{order.orderType}</td>
              <td className="border border-gray-300 p-2">{order.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
