import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from '../../redux/api/productApiSlice';
import AdminMenu from './AdminMenu';

import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice';

const ProductList = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);

  // Query to fetch categories from the API
  const { data: categories } = useFetchCategoriesQuery();

  // Mutation hooks for uploading product image and creating a new product
  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();

  // Create a FormData object and append the selected image file
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      // Upload the image using the mutation
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  // Handler for submitting the product form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a FormData object and append product details
      const productData = new FormData();
      productData.append('image', image);
      productData.append('name', name);
      productData.append('description', description);
      productData.append('price', price);
      productData.append('category', category);
      productData.append('quantity', quantity);
      productData.append('brand', brand);
      productData.append('countInStock', stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error('Product create failed. Try Again.');
      } else {
        toast.success(`${data.name} is created`);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      toast.error('Product create failed. Try Again.');
    }
  };
  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 mt-6'>
      <div className='flex flex-col md:flex-row justify-center'>
        <AdminMenu />
        <div className='md:w-3/4 p-3'>
          <div className='text-2xl mb-4 text-center'>Create a new product</div>

          {imageUrl && (
            <div className='text-center'>
              <img
                src={imageUrl}
                alt='product'
                className='block mx-auto max-h-[200px]'
              />
            </div>
          )}

          <div className='mb-3'>
            <label className='border text-white bg-green-400 hover:bg-green-700 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11'>
              {image ? image.name : 'Upload Image Here'}
              <input
                type='file'
                name='image'
                accept='image/*'
                onChange={uploadFileHandler}
                className={!image ? 'hidden' : 'text-green'}
              />
            </label>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label htmlFor='name' className='block mb-1'>
                Name
              </label>
              <input
                type='text'
                className='p-4 w-full border rounded-lg'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='name' className='block mb-1'>
                Price
              </label>
              <input
                type='number'
                className='p-4 w-full border rounded-lg'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            <div>
              <label htmlFor='name' className='block mb-1'>
                Quantity
              </label>
              <input
                type='number'
                className='p-4 w-full border rounded-lg'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='name' className='block mb-1'>
                Brand
              </label>
              <input
                type='text'
                className='p-4 w-full border rounded-lg'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
          </div>

          <label htmlFor='' className='block my-4'>
            Description
          </label>
          <textarea
            type='text'
            className='p-2 w-full border rounded-lg'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            <div>
              <label htmlFor='name' className='block mb-1'>
                Count In Stock
              </label>
              <input
                type='text'
                className='p-4 w-full border rounded-lg'
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='name' className='block mb-1'>
                Category
              </label>
              <select
                placeholder='Choose Category'
                className='p-4 w-full border rounded-lg'
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className='py-4 px-10 mt-5 rounded-lg text-lg font-bold text-white bg-green-400 hover:bg-green-600'
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
