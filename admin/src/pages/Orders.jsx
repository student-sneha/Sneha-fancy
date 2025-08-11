import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-5 md:p-8">
      <h3 className="text-xl font-bold mb-5">Orders</h3>
      <div className="space-y-6">
        {orders.map((order, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-6 border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow duration-200"
          >
            {/* Left Section - Items & Address */}
            <div>
              {/* Items List */}
              <div className="flex flex-col gap-3">
                {order.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-center gap-3 border-b border-gray-100 pb-2 last:border-none"
                  >
                    {item.image?.[0] && (
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg border"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.name} x {item.quantity}
                      </p>
                      {item.price && (
                        <p className="text-gray-500 text-sm">
                          {currency} {item.price}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Address */}
              <div className="mt-4 text-sm text-gray-700">
                <p className="font-semibold">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
                <p>{order.address.phone}</p>
              </div>
            </div>

            {/* Middle Section - Order Info */}
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <span className="font-semibold">Items:</span>{" "}
                {order.items.length}
              </p>
              <p>
                <span className="font-semibold">Method:</span>{" "}
                {order.paymentMethod}
              </p>
              <p>
                <span className="font-semibold">Payment:</span>{" "}
                {order.payment ? "✅ Done" : "⌛ Pending"}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            {/* Right Section - Amount & Status */}
            <div className="flex flex-col justify-between items-start md:items-end">
              <p className="text-lg font-bold text-gray-800">
                {currency} {order.amount}
              </p>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className="mt-3 md:mt-0 p-2 border border-gray-300 rounded-lg font-medium focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
