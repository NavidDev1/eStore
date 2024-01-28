import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from '../../redux/api/productApiSlice';
import { useEffect } from 'react';
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice';
import { toast } from 'react-toastify';
import { useState } from 'react';
import AdminMenu from './AdminMenu';

const ProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);

  console.log(productData);

  const [quantity, setQuantity] = useState(productData?.quantity || '');
  const [image, setImage] = useState(productData?.image || '');
  const [name, setName] = useState(productData?.name || '');
  const [description, setDescription] = useState(
    productData?.description || ''
  );
  const [price, setPrice] = useState(productData?.price || '');
  const [category, setCategory] = useState(productData?.category || '');
  const [stock, setStock] = useState(productData?.countInStock || '');
  const [brand, setBrand] = useState(productData?.brand || '');

  // hook
  const navigate = useNavigate();

  // Fetch categories using RTK Query
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();

  // Define the update product mutation
  const [updateProduct] = useUpdateProductMutation();

  // Define the delete product mutation
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success('Item added successfully', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setImage(res.image);
    } catch (err) {
      toast.success('Item added successfully', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        'Are you sure you want to delete this product?'
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate('/admin/allproductslist');
    } catch (err) {
      console.log(err);
      toast.error('Delete failed. Try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('quantity', quantity);
      formData.append('brand', brand);
      formData.append('countInStock', stock);

      // Update product using the Query mutation
      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.success(`Product successfully updated`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        navigate('/admin/allproductslist');
      }
    } catch (err) {
      console.log(err);
      toast.error('Product update failed. Try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 mt-6'>
      <div className='flex flex-col md:flex-row'>
        <AdminMenu />
        <div className='md:w-3/4 p-3'>
          <div className='text-2xl mb-4'>Create Product</div>

          {image && (
            <div className='text-center'>
              <img
                src={image}
                alt='product'
                className='block mx-auto max-h-[200px]'
              />
            </div>
          )}

          <div className='mb-3'>
            <label className='border text-green px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11'>
              {image ? image.name : 'Upload Image'}
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
                className='p-4 w-full border rounded-lg bg-[#101011] text-white'
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
                className='p-4 w-full border rounded-lg bg-[#101011] text-white'
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
                className='p-4 w-full border rounded-lg bg-[#101011] text-white'
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
                className='p-4 w-full border rounded-lg bg-[#101011] text-white'
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
            className='p-2 w-full border rounded-lg bg-[#101011] text-white'
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
                className='p-4 w-full border rounded-lg bg-[#101011] text-white'
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
                className='p-4 w-full border rounded-lg bg-[#101011] text-white'
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
          <div className=''>
            <button
              onClick={handleSubmit}
              className='py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-green-600 mr-6'
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className='py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-pink-600'
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
