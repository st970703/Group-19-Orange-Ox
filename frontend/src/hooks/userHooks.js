import axios from 'axios';

const url = 'http://localhost:3001/api/user/';

async function getUser(email) {
  axios.get(url+email)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}

export {getUser};