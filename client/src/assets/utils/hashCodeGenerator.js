const generateRandomCode = () => {
  const randomCode = Math.floor(Math.random() * 9000) + 1000;
  return randomCode.toString();
};

export default generateRandomCode;
