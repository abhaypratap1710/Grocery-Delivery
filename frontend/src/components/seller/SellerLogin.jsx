import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SellerLogin = () => {
  const { isSeller, setIsSeller } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/seller/login', { email, password });

      if (data.success) {
        toast.success(data.message);
        setIsSeller(true);
        navigate('/seller');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate('/seller');
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <div className="h-screen w-screen flex justify-center items-center bg-white">
        <form
          onSubmit={onSubmitHandler}
          className="bg-white rounded-lg shadow-xl border border-gray-200 p-8 py-12 min-w-80 sm:min-w-96 flex flex-col gap-5"
        >
          <p className="text-xl font-medium text-center">
            <span className="text-primary font-semibold">Seller</span> Login
          </p>

          <div className="w-full">
            <p className="mb-1">Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border border-gray-200 rounded w-full p-2 outline-primary"
              required
            />
          </div>

          <div className="w-full">
            <p className="mb-1">Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border border-gray-200 rounded w-full p-2 outline-primary"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white w-full py-2 rounded-md cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    )
  );
};

export default SellerLogin;
