const API_BASE_URL = 'https://3.111.128.67/assignment/chat';

export async function getChatData(page) {
  const url = `${API_BASE_URL}?page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching chat data');
  }
}
