const BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000'

export {BASE_URL}

export const ensureCorrectUser = (pathId) => {
  let token = localStorage.getItem('token');
  if(!token){return false;}
  let tokenId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id
  return tokenId === pathId;
}
