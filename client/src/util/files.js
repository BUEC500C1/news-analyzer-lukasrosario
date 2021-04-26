import { authFetch } from './auth';

export const uploadFile = async ({ title, file }) => {
  const data = new FormData();
  data.append('title', title);
  data.append('file', file);
  const response = await authFetch('/api/v1/file', {
    method: 'post',
    body: data
  }).then((r) => r.json());
  return response;
};

export const fetchFiles = async () => {
  const response = await authFetch('/api/v1/file').then((r) => r.json());
  if (response.files) {
    return response.files.map((file) => ({
      ...file,
      created: new Date(Date.parse(file.created))
    }));
  }
  return [];
};

export const getFile = async (id) => {
  const response = await authFetch(`/api/v1/file/${id}`).then((r) => r.json());
  if (response.url) {
    return response;
  }
  return -1;
};

export const searchNews = async (term) => {
  const response = await fetch(`/api/v1/search/${term}`).then((r) => r.json());
  if (response.articles) {
    return response.articles;
  }
  return -1;
};

export const importFile = async (title, previewUrl, fileUrl) => {
  console.log('importing');
  const response = await authFetch('/api/v1/import', {
    method: 'post',
    body: JSON.stringify({
      title: title,
      previewUrl: previewUrl,
      fileUrl: fileUrl
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((r) => r.json());
  if (response.code === 200) {
    return 1;
  }
  return -1;
};
