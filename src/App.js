import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import "./App.css"

const fetchData = async (searchTerm) => {
  const response = await axios.get(`https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete?term=${searchTerm}`);
  return response.data;
};

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { data, error, isLoading } = useQuery(['search', searchTerm], () => fetchData(searchTerm));

  // Фильтрация результатов по сходству символов
  const filteredData = data ? data.filter(result => result.name.includes(searchTerm)) : [];
  return (
    <div>
      <input
        type="text"
        placeholder="Введите поисковый запрос"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading && <p>Идет поиск...</p>}
      {error && <p>Произошла ошибка: {error.message}</p>}
      {filteredData.length > 0 ? (
        <ul>
          {filteredData.map((result) => (
            <p key={result.id} className='pOption'>{result.name} | [x]</p>
          ))}
        </ul>
      ) : (
        <p>Нет совпадений</p>
      )}
    </div>
  );
};

export default SearchComponent;