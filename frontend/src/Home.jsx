import { useGetProductsQuery } from './redux/api/productApiSlice';
import { Link, useParams } from 'react-router-dom';
import Header from './components/Header';
import Loader from './components/Loader';
import Message from './components/Message';

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {/* Add the rest of your component logic here */}
    </>
  );
};

export default Home;
