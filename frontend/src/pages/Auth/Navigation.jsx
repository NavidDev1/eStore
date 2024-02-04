import { useState } from 'react';
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineLogin,
} from 'react-icons/ai';

import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Navigation.css';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../redux/api/userApiSlice';
import { logout } from '../../redux/features/auth/authSlice';

export default function Navigation() {
  // here we get the state auth from the store
  const { userInfo } = useSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowsidebar] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  // Accessing Redux functionalities
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetching data using our custom mutation hook
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        style={{ zIndex: 999 }}
        className={`${showSidebar ? 'hidden' : 'flex'} 
      xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-gradient-to-r from-green-400 to-green-600 w-[4%] hover:w-[15%] h-[100vh] fixed`}
        id='navigation-container'
      >
        <div className='flex flex-col justify-center space-y-4'>
          <Link
            to='/'
            className='flex items-center transition-transform transform hover:translate-x-2'
          >
            <AiOutlineHome className='mr-2 mt-[3rem]' size={26} />
            <span className='hidden nav-item-name mt-[3rem]'>HOME</span>{' '}
          </Link>
          {/* <Link
            to='/shop'
            className='flex items-center transition-transform transform hover:translate-x-2'
          >
            <AiOutlineShopping className='mr-2 mt-[3rem]' size={26} />
            <span className='hidden nav-item-name mt-[3rem]'>SHOP</span>{' '}
          </Link>*/}

          <Link
            to='/cart'
            className='flex items-center transition-transform transform hover:translate-x-2'
          >
            <AiOutlineShoppingCart className='mr-2 mt-[3rem]' size={26} />
            <span className='hidden nav-item-name mt-[3rem]'>CART</span>{' '}
            <div className='absolute top-9'>
              {cartItems.length > 0 && (
                <span>
                  <span className='px1- py-0 text-sm text-white bg-orange-400 rounded-full'>
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </span>
                </span>
              )}
            </div>
          </Link>

          {/*  <Link
            to='/favorite'
            className='flex items-center transition-transform transform hover:translate-x-2'
          >
            <FaHeart className='mr-2 mt-[3rem]' size={26} />
            <span className='hidden nav-item-name mt-[3rem]'>
              Favorite
            </span>{' '}
          </Link>*/}
        </div>
        <div className='realative'>
          <button
            onClick={toggleDropdown}
            className='flex item-center text-gray-8000 focus:outline-none'
          >
            {userInfo ? (
              <span className='text-white'>{userInfo.username}</span>
            ) : (
              <></>
            )}

            {userInfo && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className={`h-4 w-4 ml-1 ${
                  dropdownOpen ? 'transform rotate-180' : ''
                }`}
                fill='none'
                viewBox='0 0 24 24'
                stroke='white'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d={dropdownOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
                />
              </svg>
            )}
          </button>
          {dropdownOpen && userInfo && (
            <ul
              className={`absoulute right-0 mt-2 mr-14 space-y-2 text-white${
                !userInfo.isAdmin ? '-top-20' : '-top-80'
              }`}
            >
              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link
                      to='/admin/dashboard'
                      className='block px-4 py-2 hover:bg-green-400'
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/admin/productlist'
                      className='block px-4 py-2 hover:bg-green-400'
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/admin/categorylist'
                      className='block px-4 py-2 hover:bg-green-400'
                    >
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/admin/orderlist'
                      className='block px-4 py-2 hover:bg-green-400'
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/admin/userlist'
                      className='block px-4 py-2 hover:bg-green-400'
                    >
                      Users
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link
                  to='/profile'
                  className='block px-4 py-2 hover:bg-green-400'
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className='block w-full px-4 py-2 text-left  hover:bg-green-400'
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
          {!userInfo && (
            <ul>
              <li>
                <Link
                  to='/login'
                  className='flex items-center mt-5 transition-transform transform hover:translate-x-2'
                >
                  <AiOutlineLogin className='mr-2 mt-[4px]' size={26} />
                  <span className='hidden nav-item-name'>LOGIN</span>
                </Link>
              </li>
              <li>
                <Link
                  to='/register'
                  className='flex items-center mt-5 transition-transform transform hover:translate-x-2'
                >
                  <AiOutlineUserAdd size={26} />
                  <span className='hidden nav-item-name'>REGISTER</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div
        className='flex-col justify-between p-4 text-white text-center bg-gradient-to-r from-green-600 to-green-400'
        style={{ marginBottom: '10px' }}
      >
        <h1 className='flex-col justify-between p-4 text-white bg-gradient-to-r from-green-600 to-green-400 text-2xl font-semibold'>
          HealtyFood
        </h1>
      </div>
    </>
  );
}
