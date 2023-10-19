import { FormEvent, FormEventHandler, useState } from "react";
import "./styles.css";
import {
  TextSentiment,
  TextSentimentRequest,
  getSentimentFromText,
} from "../../services/sentiment";

const CheckerPage = () => {
  const [sentiment, setSentiment] = useState<TextSentiment>({
    sentiment: "NEUTRAL",
    pos_prob: 0,
    neg_prob: 0,
  });

  const [useBest, setUseBest] = useState(false);
  const [text, setText] = useState("");

  const process1Click = () => {
    setUseBest(false);
  };

  const process2Click = () => {
    setUseBest(true);
  };

  const onTextChange = (event: any) => {
    setText(event.target.value);
  };

  const submit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const requestOptions: TextSentimentRequest = {
      text: text,
      useBestModel: useBest,
    };

    let data = await getSentimentFromText(requestOptions);
    console.log(data);
    setSentiment(data);
  };

  return (
    <div className="App-header">
      <form className="Form-data" onSubmit={submit}>
        <h1>KleverSense sentiment checker</h1>
        <div className="Process-selector">
          <div
            className={
              useBest
                ? "Process-item1 Process-inactive"
                : "Process-item1 Process-active"
            }
            onClick={process1Click}
          >
            TRUSTFUL
          </div>
          <div
            className={
              useBest
                ? "Process-item2 Process-active"
                : "Process-item2 Process-inactive"
            }
            onClick={process2Click}
          >
            BEST
          </div>
        </div>
        <textarea
          className="Form-input custom-scrollbar"
          name="articleName"
          placeholder="Btc will pump im 2023"
          onChange={onTextChange}
        ></textarea>
        <div className="Form-info">
          <div className="Form-result">Sentiment: {sentiment.sentiment}</div>
          <div className="Form-result">
            POS%: {(sentiment.pos_prob * 100).toFixed(2)}
          </div>
          <div className="Form-result">
            NEG%: {(sentiment.neg_prob * 100).toFixed(2)}
          </div>
          <button className="Form-submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

export default CheckerPage;
