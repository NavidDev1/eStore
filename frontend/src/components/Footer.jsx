import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='fixed bottom-80 right-0 text-white p-4'>
      <div className='flex items-center justify-between'>
        <div></div>
        <div className='flex flex-col items-end'>
          {/* Add your social media links here */}
          <a
            href='https://www.facebook.com/yourfacebookpage'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaFacebook className='text-green-400 hover:text-gray-500 mb-2' />
          </a>
          <a
            href='https://www.instagram.com/yourinstagrampage'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaInstagram className='text-green-400 hover:text-gray-500 mb-2' />
          </a>
          <a
            href='https://twitter.com/yourtwitterpage'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaTwitter className='text-green-400 hover:text-gray-500 mb-2' />
          </a>
          <a
            href='https://www.linkedin.com/in/yourlinkedinpage'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaLinkedin className='text-green-400 hover:text-gray-500 mb-2' />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
