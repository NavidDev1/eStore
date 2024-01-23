const CategoryForm = (
  value,
  setValue,
  handleSubmit,
  button = 'Submit',
  handleDelete
) => {
  return (
    <div className='p-3'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className='py-3 pc-4 border rounded-lg w-full'
          placeholder='Write category name'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className='flex justify-between'>
          <button></button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
