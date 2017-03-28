export const BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000'

export const ensureCorrectUser = (pathId) => {
  let token = localStorage.getItem('token');
  if(!token){return false;}
  let tokenId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id
  return +tokenId === +pathId;
}

export const userID = () => JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id

export const config = {
  headers: {
    'Accept':'application/json',
    'ContentType':'application/json',
    'Authorization':'bearer ' + localStorage.getItem('token')
  }
}
