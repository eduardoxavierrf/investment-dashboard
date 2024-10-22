import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import api from '../services/api'; // Adjust the import path as needed
import Dashboard from '../components/Dashboard';

const Home = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const symbol = searchParams.get('symbol');
      if (!symbol) return;
      let startDate = searchParams.get('startDate')
      if(!startDate) {
        startDate = '2024-01-02'
      }
      let endDate = searchParams.get('endDate')
      if (!endDate) {
        endDate = '2024-10-21'
      }
      setLoading(true);
      setError(null);
      
      try {
        const { data: responseData } = await api.get(`/historical_data/find`,
          {
            params: {
              symbol,
              startDate,
              endDate
            }
          }
        );
        setData(responseData);
      } catch (err: any) {
        setError(
          err.response?.data?.message || 
          'Erro ao carregar dados. Tente novamente mais tarde.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center">
          <svg className="w-8 animate-pulse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="#6b7280" d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z"/>
          </svg>
          <span className="text-gray-500">Carregando dados...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center">
          <span className="text-red-500">{error}</span>
        </div>
      );
    }

    if (data) {
      return (
        <div className="flex flex-col items-center">
          <Dashboard data={data} />
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center">
        <svg className="w-8 animate-pulse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path fill="#6b7280" d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z"/>
        </svg>
        <span className="text-gray-500">Procure uma ação para ver informações...</span>
      </div>
    );
  };

  return (
    <div>
      <Navigation />
      <div className="flex mt-16 flex-col items-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;