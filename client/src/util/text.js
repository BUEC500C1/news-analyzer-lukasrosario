import { authFetch } from './auth';

export const convertAndAnalyze = async (fileId) => {
  const response = await authFetch('/api/v1/text', {
    method: 'post',
    body: JSON.stringify({ fileId: fileId }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((r) => r.json());
  if (response.summary) {
    return response;
  }
  return -1;
};
