import Loader from '../../components/Loader'; // Component for displaying loading state
import { FaTimes, FaCheck, FaEdit, FaTrash } from 'react-icons/fa'; // Icon components
import { toast } from 'react-toastify'; // Library for displaying toasts
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '../../redux/api/userApiSlice'; // API query and mutation hooks
import { useEffect, useState } from 'react'; // React hooks for side effects and state
import Message from '../../components/Message'; // Component for displaying messages

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery(); // Fetching users data
  const [deleteUser] = useDeleteUserMutation(); // Mutation hook for deleting a user
  const [updateUser] = useUpdateUserMutation(); // Mutation hook for updating a user

  const [editableUserId, setEditableUserId] = useState(null); // State for tracking editable user
  const [editableUserName, setEditableUserName] = useState(''); // State for editable username
  const [editableUserEmail, setEditableUserEmail] = useState(''); // State for editable user email

  useEffect(() => {
    refetch(); // Refetch users data on component mount or update
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteUser(id); // Delete user
        refetch(); // Refetch users data after deletion
      } catch (err) {
        toast.error(err?.data?.message || err.error); // Display error toast
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold mb-4'>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className='flex flex-col md:flex-row'>
          {/* <AdminMenu /> */}
          <table className='w-full md:w-4/5 mx-auto'>
            <thead>
              <tr>
                <th className='px-4 py-2 text-left'>ID</th>
                <th className='px-4 py-2 text-left'>NAME</th>
                <th className='px-4 py-2 text-left'>EMAIL</th>
                <th className='px-4 py-2 text-left'>ADMIN</th>
                <th className='px-4 py-2'></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  {/* ... Table rows for displaying user data ... */}
                  <td className='px-4 py-2'>{user._id}</td>
                  <td className='px-4 py-2'>
                    {editableUserId === user._id ? (
                      <div className='flex items-center'>
                        <input
                          type='text'
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className='w-full p-2 border rounded-lg'
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className='ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg'
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className='flex items-center'>
                        {user.username}{' '}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className='ml-[1rem]' />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className='px-4 py-2'>
                    {editableUserId === user._id ? (
                      <div className='flex items-center'>
                        <input
                          type='text'
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className='w-full p-2 border rounded-lg'
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className='ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg'
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className='flex items-center'>
                        <a href={`mailto:${user.email}`}>{user.email}</a>{' '}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.name, user.email)
                          }
                        >
                          <FaEdit className='ml-[1rem]' />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className='px-4 py-2'>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td className='px-4 py-2'>
                    {!user.isAdmin && (
                      <div className='flex'>
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
