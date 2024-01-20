import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
import { setCredientials } from '../../redux/features/auth/authSlice';
import { useProfileMutation } from '../../redux/api/userApiSlice';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  //here we are handling the information we get from the user to change userinfo, senduing it using useProfileMutation
  const submitHandler = async (e) => {
    e.preventDefault();

    if (password != confirmedPassword) {
      toast.error('Password do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredientials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <div className='container mx-auto p-4 mt-[10rem]'>
      <div className='flex justify-center align-center md:flex md:space-x-4'>
        <div className='med:w-1/3'>
          <h2 className='text-2xl font-semibold mb-4'> Update Profile</h2>

          <form onSubmit={submitHandler}>
            <div className='mb-4'>
              <label className='block text-black mb-2'>Name</label>
              <input
                type='text'
                placeholder='Enter name'
                className='form-input p-4 rounded-sm w-full'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-black mb-2'>Email</label>
              <input
                type='email'
                placeholder='Enter email'
                className='form-input p-4 rounded-sm w-full'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-black mb-2'>Password</label>
              <input
                type='password'
                placeholder='Enter password'
                className='form-input p-4 rounded-sm w-full'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-black mb-2'>Confirm password</label>
              <input
                type='password'
                placeholder='Enter password'
                className='form-input p-4 rounded-sm w-full'
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
              />
            </div>
            <div className='flex justify-between'>
              <button
                type='submit'
                className='bg-green-800 text-white px-4 py-2 rounded cursor-pointer my-[1rem] hover:bg-green-500'
              >
                Update
              </button>
              <Link
                to='/user-orders'
                className='bg-green-800 text-white px-4 py-2 rounded cursor-pointer my-[1rem] hover:bg-green-500'
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>

        {loadingUpdateProfile && <Loader />}
      </div>
    </div>
  );
};

export default Profile;
