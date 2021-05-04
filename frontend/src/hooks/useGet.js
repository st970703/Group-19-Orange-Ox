import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * A custom hook which fetches data from the given URL. Includes functionality to determine
 * whether the data is still being loaded or not.
 */
export default function useGet(url, initialState = null) {

  const [data, setData] = useState(initialState);
  const [isLoading, setLoading] = useState(false);
  const [version, setVersion] = useState(0);

  function reFetch() {
    setVersion(version + 1);
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await axios.get(url);
      setData(response.data);
      setLoading(false);
    }
    fetchData();
  }, [url, version]);

  function update(item) {
    return axios.put(`${url}/${item._id}`, item)
      .then(response => {
        setData(data.map(d => {
          if (d._id === item._id) {
            return { ...d, ...item };
          }
          else {
            return d;
          }
        }))
      })
      .catch(err => {
        console.log(err);
      });
  }

  function deleteItem(id) {
    return axios.delete(`${url}/${id}`)
      .then(response => {
        setData(data.filter(d => d._id !== id));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function create(item) {
    return axios.post(url, item)
      .then(response => {
        setData([...data, response.data]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return { data, isLoading, reFetch, update, deleteItem, create };
}