import { createAuthProvider } from 'react-token-auth';

export const [useAuth, authFetch, login, logout] = createAuthProvider({
  onUpdateToken: (token) =>
    fetch('/api/v1/refresh', {
      method: 'POST',
      body: token
    }).then((r) => r.json())
});

export const apiSignup = async ({ email, password }) => {
  const response = await fetch('/api/v1/signup', {
    method: 'post',
    body: JSON.stringify({ email, password })
  }).then((r) => r.json());

  if (response.access_token) {
    login(response.access_token);
    return 1;
  } else {
    return 0;
  }
};

export const apiLogin = async ({ email, password }) => {
  const response = await fetch('/api/v1/login', {
    method: 'post',
    body: JSON.stringify({ email, password })
  }).then((r) => r.json());

  if (response.access_token) {
    login(response.access_token);
    return 1;
  } else {
    return 0;
  }
};
