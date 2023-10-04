import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Article, getArticle, updateArticle } from "./services/article";

function App() {
  const [article, setArticle] = useState<Article | null>(null);
  const fetchAttempted = useRef(false);

  const fetchArticleSafely = async () => {
    try {
      let data = await getArticle();
      setArticle(data);
    } catch (error) {
      console.error("Error fetching the article:", error);
    }
  };

  useEffect(() => {
    console.log("article", article);
    if (!article && !fetchAttempted.current) {
      fetchAttempted.current = true;
      fetchArticleSafely();
    }
  }, [article]);

  const setSentiment = async (art: Article, sentiment: string) => {
    art.klv_sentiment = sentiment;
    await updateArticle(art);
    fetchArticleSafely();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{article?.title}</h1>
        <h2>Categories: {article?.category.join(", ")}</h2>
        <div className="buttonDiv">
          <button
            className="myButton-green"
            onClick={() => {
              setSentiment(article!, "POSITIVE");
            }}
          >
            Positive
          </button>
          <button
            className="myButton-red"
            onClick={() => {
              setSentiment(article!, "NEGATIVE");
            }}
          >
            Negative
          </button>
          <button
            className="myButton-gray"
            onClick={() => {
              setSentiment(article!, "NEUTRAL");
            }}
          >
            Neutral
          </button>
          <button
            className="myButton-gray"
            onClick={() => {
              setSentiment(article!, "IRRELEVANT");
            }}
          >
            Irrelevant
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
