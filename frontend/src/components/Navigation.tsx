import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Stock } from '../types/stock';

const Navigation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStockSuggestions = async () => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { data } = await api.get(
          `/stocks/find`,
          {
            params: { query: searchTerm }
          }
        );
        setSuggestions(data);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
        setError('Erro ao buscar sugestões. Tente novamente.');
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchStockSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStockSelect = (stock: any) => {
    setSearchTerm(stock.symbol);
    setShowSuggestions(false);
    const params = new URLSearchParams({symbol: stock.symbol});
    navigate(`/?${params.toString()}`)
  };

  return (
    <div className='py-5'>
      <div className='flex w-full justify-between h-10 items-center'>
        <div className='w-8 opacity-80'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#173622" d="M384 160c-17.7 0-32-14.3-32-32s14.3-32 32-32l160 0c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-82.7L342.6 374.6c-12.5 12.5-32.8 12.5-45.3 0L192 269.3 54.6 406.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160c12.5-12.5 32.8-12.5 45.3 0L320 306.7 466.7 160 384 160z"/></svg>
        </div>
        <div className='w-80 h-full relative' ref={dropdownRef}>
          <div className='rounded border border-gray-200 h-full'>
            <div className='h-full flex items-center justify-center'>
              <svg className='opacity-80 mr-3 ml-3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="20" width="20">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"></path>
              </svg>
              <div className='w-full items-center'>
                <input
                  className='text-gray-700 text-sm w-full focus:outline-none'
                  placeholder='Procure uma ação...'
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                />
              </div>
              {isLoading && (
                <div className='mr-3'>
                  <div className='animate-spin h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full'></div>
                </div>
              )}
            </div>
          </div>
          
          {/* Suggestions Dropdown */}
          {showSuggestions && (searchTerm.length >= 2) && (
            <div className='absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50'>
              {error ? (
                <div className='px-4 py-2 text-red-500'>{error}</div>
              ) : suggestions.length > 0 ? (
                suggestions.map((stock) => (
                  <div
                    key={stock.symbol}
                    className='px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between'
                    onClick={() => handleStockSelect(stock)}
                  >
                    <div>
                      <div className='font-medium text-sm'>{stock.symbol}</div>
                      <div className='text-xs text-gray-600'>{stock.companyName}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='px-4 py-2 text-gray-500'>Nenhum resultado encontrado</div>
              )}
            </div>
          )}
        </div>
        <div>
          <Link className='inline-flex items-center justify-center rounded-lg font-medium text-sm bg-green-500 text-white px-3 py-3' to='/signup'>Cadastre-se</Link>
        </div>
      </div>
    </div>
  )
}

export default Navigation;