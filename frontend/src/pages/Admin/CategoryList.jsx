import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from '../../redux/api/categoryApiSlice';

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updateName, setUpdateName] = useState('');
  const [modalVisibile, setModalVisible] = useState(false);

  // here we are getting the categoris form our database, using out custom hooks
  const [updateCategory] = useUpdateCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  return (
    <div className='ml-[10rem] flex flex-col md:flex-row'>
      {/* Admin menu*/}

      <div className='md:w3/4 p-3'>
        <div className='h-12'> Manage Categories </div>
      </div>
    </div>
  );
};

export default CategoryList;
