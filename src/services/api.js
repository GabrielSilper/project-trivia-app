export const getQuestions = async (token) => {
  const BASEURL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const result = await fetch(BASEURL);
  const data = result.json();

  return data;
};
