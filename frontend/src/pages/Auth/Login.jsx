import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../../redux/api/userApiSlice';
import { setCredientials } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/'; //Get redirect path from URL query parameter or default to '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect); //Redirect to the specified path after successful login
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault(); //Prevent the default form submission behavior

    try {
      // Attempt to perform a login by calling the login mutation function
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredientials({ ...res })); // Dispatch an action to set user credentials in the Redux store
    } catch (error) {
      toast.error(error?.data?.message || error.message); //Display an error toast with a specific message, if available
    }
  };

  return (
    <div>
      <section className='pl-[10rem] flex flex-wrap'>
        <div className='mr-[4rem] mt-[5rem]'>
          <h1 className='text-2xl font-semibold mb-4'> Sign In</h1>

          <form onSubmit={submitHandler} className='container w-[40rem]'>
            <div className='my-[2rem]'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-black'
              >
                Email Address
              </label>

              <input
                type='email'
                id='email'
                className='mt-1 p-2 border rounded w-full'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='my-[2rem]'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-black'
              >
                Password
              </label>

              <input
                type='password'
                id='password'
                className='mt-1 p-2 border rounded w-full'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              disabled={isLoading}
              type='submit'
              className='bg-green-800 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className='mt-4'>
            <p className='text-black'>
              New Customer = {''}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                className='="text-pink-500 hover:underline'
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
