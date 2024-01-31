import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../redux/api/cartSlice';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className='container mx-auto mt-8'>
      {cartItems.length === 0 ? (
        <div className='text-center'>
          Your cart is empty.{' '}
          <Link to='/shop' className='text-pink-500'>
            Go To Shop
          </Link>
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <h1 className='text-3xl font-semibold mb-4'>Shopping Cart</h1>

          {cartItems.map((item) => (
            <div key={item._id} className='flex items-center mb-4'>
              <div className='w-24 h-24'>
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-full h-full object-cover rounded'
                />
              </div>

              <div className='ml-4 flex-1'>
                <div>
                  <Link to={`/product/${item._id}`} className='text-pink-500'>
                    {item.name}
                  </Link>
                </div>

                <div className='text-gray-500'>{item.brand}</div>
                <div className='font-semibold text-gray-800'>
                  $ {item.price}
                </div>
              </div>

              <div className='w-24'>
                <select
                  className='w-full p-1 border rounded text-black'
                  value={item.qty}
                  onChange={(e) =>
                    addToCartHandler(item, Number(e.target.value))
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <button
                  className='text-red-500'
                  onClick={() => removeFromCartHandler(item._id)}
                >
                  <FaTrash className='ml-2 mt-0.5' />
                </button>
              </div>
            </div>
          ))}

          <div className='mt-8 w-full md:w-[40rem]'>
            <div className='p-4 rounded-lg bg-gray-100'>
              <h2 className='text-xl font-semibold mb-2 text-center'>
                Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h2>

              <div className='text-2xl font-bold text-center'>
                ${' '}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </div>

              <button
                className='bg-orange-400 mt-4 py-2 px-4 rounded-full text-lg w-full'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
