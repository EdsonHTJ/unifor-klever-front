export type TextSentiment = {
  sentiment: string;
  pos_prob: number;
  neg_prob: number;
};

export type TextSentimentRequest = {
  text: string;
  useBestModel: boolean;
};

type ApiCallSentiment = {
  news: string;
  model_type: string;
};

let API_URL = "http://192.168.1.162:5000";

export const getSentimentFromText = async (
  request: TextSentimentRequest
): Promise<TextSentiment> => {
  const apiCall = {
    news: request.text,
    model_type: request.useBestModel ? "best" : "trustful",
  };
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    body: JSON.stringify(apiCall),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: TextSentiment = await response.json();
  return data;
};
