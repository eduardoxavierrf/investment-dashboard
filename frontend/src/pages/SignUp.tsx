import React, { useState } from 'react';
import api from '../services/api';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    api.post('/users', {
      username,
      password
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.error('Error: ', error)
    })
  };

  return (
    <div className='w-full mx-auto flex justify-center'>
      <div className='w-96'>
        <div className='mt-[10vh] mb-5 text-xl font-medium'>
          <span>Sign Up</span>
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
            className='mt-8 rounded-sm h-10 px-4 w-full relative bg-blue-500 text-white cursor-pointer text-sm items-center justify-center inline-flex font-semibold'
          >
            Cadastre-se
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
