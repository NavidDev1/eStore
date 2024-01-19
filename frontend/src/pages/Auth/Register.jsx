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
  const [confirmPassword, setConfirmPassword] = useState('');

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

  return (
    <section className='pl-[10rem] flex flex-wrap'>
      <div className='mr-[4rem] mt-[5rem]'>
        <h1 className='text-2xl font-semibold mb-4'> Register</h1>

        <form className='container w-[40rem]'>
          <div className='my-[2rem]'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-black'
            >
              {' '}
              Name
            </label>
            <input
              type='text'
              id='name'
              classname='mt-1 p-2 border rounded w-full'
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
