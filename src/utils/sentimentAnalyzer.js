export default (text) => {
  const positiveWords = ["good", "happy", "excellent", "positive", "beautiful"];
  const negativeWords = ["bad", "sad", "terrible", "negative"];

  const words = text.toLowerCase().replace(/;/g, "").split(" ");
  let sentimentScore = words.reduce((score, word) => {
    if (positiveWords.includes(word)) return ++score;
    if (negativeWords.includes(word)) return --score;
    return score;
  }, 0);

  return sentimentScore > 0
    ? "positive"
    : sentimentScore < 0
    ? "negative"
    : "neutral";
};
