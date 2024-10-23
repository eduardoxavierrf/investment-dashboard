import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login, user } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await login(username, password)
    if (user) {
      console.log(user)
      navigate('/')
    }
  };

  return (
    <div className='w-full mx-auto flex justify-center'>
      <div className='w-96'>
        <div className='mt-[10vh] mb-5 text-xl font-medium'>
          <span>Sign In</span>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">User created successfully!</div>}
        <form onSubmit={handleSubmit}>
          <label>
            <div className='flex items-center mb-2 mt-2 min-h-5 relative'>
              <span className='text-[#63727d] font-medium text-sm mr-1'>Username</span>
            </div>
            <input 
              className='text-[#2d2f31] px-4 rounded w-full border border-[#adb6be] h-10' 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            <div className='flex items-center mb-2 mt-2 min-h-5 relative'>
              <span className='text-[#63727d] font-medium text-sm mr-1'>Senha</span>
            </div>
            <input 
              type='password' 
              className='text-[#2d2f31] px-4 rounded w-full border border-[#adb6be] h-10'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button 
            type='submit' 
            className='mt-8 rounded-sm h-10 px-4 w-full relative bg-green-500 text-white cursor-pointer text-sm items-center justify-center inline-flex font-semibold'
          >
            Logar
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
