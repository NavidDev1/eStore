import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredientials } from '../../redux/features/auth/authSlice';
import Loader from '../../components/Loader';
import { useRegisterMutation } from '../../redux/api/userApiSlice';

const Register = () => {
  //setting up the states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  // Accessing Redux functionalities
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  // Fetching data using our custom mutation hook
  const [register, { isLoading }] = useRegisterMutation();

  // Extracting search parameters from the current URL
  const { search } = useLocation();
  const sp = new URLSearchParams(search);

  // Extracting 'redirect' parameter from the URL, defaulting to '/' if not present
  const redirect = sp.get('redirect') || '/';

  // Using useEffect to navigate when 'userInfo' changes
  // If user information is available, navigate to the specified redirect path
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if the password and confirmedPassword match

    if (password != confirmedPassword) {
      toast.error('Password do not match');
    } else {
      try {
        // Attempt to register a new user by calling the register mutation function
        const res = await register({ username, email, password }).unwrap();
        // Dispatch an action to set user credentials in the Redux store
        // and  redirect to the specified path after successful registration
        dispatch(setCredientials({ ...res }));
        navigate(redirect);
        // Display a success toast message
        toast.success('User signed up successfully ');
      } catch (error) {
        console.log(error);
        toast.error(error.data.message);
      }
    }
  };

  return (
    <section className='pl-[10rem] flex justify-center items-center min-h-screen'>
      <div className='bg-white p-8 border rounded-lg shadow-md'>
        <h1 className='text-2xl font-semibold mb-4'>Register</h1>

        <form onSubmit={submitHandler} className='container w-[20rem]'>
          <div className='my-[2rem]'>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-black'
            >
              Username
            </label>

            <input
              type='text'
              id='username'
              className='mt-1 p-2 border rounded w-full'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

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

          <div className='my-[2rem]'>
            <label
              htmlFor='confirmedPassword'
              className='block text-sm font-medium text-black'
            >
              Confirm Password
            </label>

            <input
              type='password'
              id='confirmedPassword'
              className='mt-1 p-2 border rounded w-full'
              value={confirmedPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            type='submit'
            className='bg-green-800 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'
          >
            {isLoading ? 'Signing up...' : 'Sign up'}
          </button>

          {isLoading && <Loader />}
        </form>

        <div className='mt-4'>
          <p className='text-black'>
            Already have an account?{' '}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
              className='text-pink-500 hover:underline'
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
