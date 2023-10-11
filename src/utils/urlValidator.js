// this is used in both front-end and back-end 
export default (url) => {
  return /^(https?|http):\/\/[^\s/$.?#]+\.[^\s]*$/i.test(url);
};
