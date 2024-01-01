const reqImage = (value) => {
  if (value) {
    return `http://localhost:8000/${value}`;
  }
};

export default reqImage;
