import axios from 'axios';

export const SearchSchool = async (keyword, setUnivlist) => {
  try {
    const response = await axios.get(process.env.REACT_APP_OPEN_API + keyword);
    const list = response.data.dataSearch.content;
    setUnivlist(list);
    return list;
  } catch (error) {
    console.error('ERROR: ', error);
    return [];
  }
};
