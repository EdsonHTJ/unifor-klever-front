export type Article = {
  _id: number;
  title: string;
  sentiment: string;
  klv_sentiment: string;
  category: string[];
};

let API_URL = "https://crypto-articles-back.onrender.com";

export const getArticle = async (): Promise<Article> => {
  const response = await fetch(`${API_URL}`);
  const data = await response.json();
  return data;
};

export const updateArticle = async (article: Article) => {
  const response = await fetch(`${API_URL}/update_article`, {
    method: "POST",
    body: JSON.stringify(article),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
