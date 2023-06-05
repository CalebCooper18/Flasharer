import { baseURl } from '../utils/constants';

import { UserLogin } from '../types';

async function login(creds: UserLogin) {
  const res = await fetch(`${baseURl}/user/login`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  });
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.error);
  }
  return data.data;
}

export default {
  login,
};
