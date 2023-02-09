export const getQuestions = async (token) => {
  const BASEURL = `https://opentdb.com/api.php?amount=${amount}&token=${token}`;
  try {
    const result = await fetch(BASEURL);
    const data = result.json();

    return data;
  } catch (e) {
    localStorage.removeItem('token');
  }
};
