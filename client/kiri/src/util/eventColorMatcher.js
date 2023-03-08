const eventColorMatcher = (type) => {
  let colorcode;
  switch (type) {
    case '축제':
      colorcode = '#FFCF70';
      break;
    case '전시':
      colorcode = '#759CFF';
      break;
    case '공연':
      colorcode = '#FF8CDF';
      break;
    case '강연':
      colorcode = '#FF7878';
      break;
    case '대회':
      colorcode = '#9479FF';
      break;
    default:
      colorcode = '#86DDB8';
      break;
  }
  return colorcode;
};

export default eventColorMatcher;
