import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useCreateOrderMutation } from '../../redux/api/orderApiSlice';
import { clearCartItems } from '../../redux/api/cartSlice';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className='container mx-auto mt-8'>
      {cart.cartItems.length === 0 ? (
        <Message>Your cart is empty</Message>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr>
                <th className='p-2 text-left'>Image</th>
                <th className='p-2 text-left'>Product</th>
                <th className='p-2 text-left'>Quantity</th>
                <th className='p-2 text-left'>Price</th>
                <th className='p-2 text-left'>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.cartItems.map((item, index) => (
                <tr key={index}>
                  <td className='p-2'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-16 h-16 object-cover'
                    />
                  </td>
                  <td className='p-2'>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </td>
                  <td className='p-2'>{item.qty}</td>
                  <td className='p-2'>{item.price.toFixed(2)}</td>
                  <td className='p-2'>
                    $ {(item.qty * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className='mt-8'>
        <h2 className='text-2xl font-semibold mb-5'>Order Summary</h2>
        <ul className='text-lg'>
          <li>
            <span className='font-semibold mb-4'>Items:</span> $
            {cart.itemsPrice}
          </li>
          <li>
            <span className='font-semibold mb-4'>Shipping:</span> $
            {cart.shippingPrice}
          </li>
          <li>
            <span className='font-semibold mb-4'>Tax:</span> ${cart.taxPrice}
          </li>
          <li>
            <span className='font-semibold mb-4'>Total:</span> $
            {cart.totalPrice}
          </li>
        </ul>

        {error && <Message variant='danger'>{error.data.message}</Message>}

        <div className='mt-4 p-4 rounded-lg bg-gray-100'>
          <h2 className='text-xl font-semibold mb-2 text-center'>Shipping</h2>
          <p className='text-l mb-2 text-center'>
            <strong>Address:</strong> {cart.shippingAddress.address},{' '}
            {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' '}
            {cart.shippingAddress.country}
          </p>
          <h2 className='text-xl font-semibold mb-2 text-center mt-4'>
            Payment Method
          </h2>
          <p className='text-l mb-2 text-center'>
            Method: {cart.paymentMethod}
            <strong className='text-center'></strong>
          </p>
        </div>

        <button
          type='button'
          className='bg-orange-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4'
          disabled={cart.cartItems === 0}
          onClick={placeOrderHandler}
        >
          Place Order
        </button>

        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default PlaceOrder;
