import axios from 'axios';
const KEY = 'AIzaSyCdLD10ra1sQQtQRDdY1JUiFZynwfBN8XY';

export default axios.create({
  baseURL:'https://www.googleapis.com/youtube/v3',
  params:{
    part:'snippet',
    type:'video',
    key:KEY    
  }
});