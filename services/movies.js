import axios from 'axios';

export  function search(searchTerm,page) {
   return  axios.get('https://www.omdbapi.com/?s='+searchTerm+'&page='+page+'&apikey=4a24f274');  
   //Search pagination added: http://www.omdbapi.com/?s=Batman&page=2

   return new Promise(function(resolve, reject) {
      setTimeout(()=>{
         resolve({data});
      },2000)
   });
}

