// ! Headers, related with API, should be sent as well. 
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '67b644ce10msh15ed3d9b4aa757ap18baa4jsn2cf5451f9be2',
		'x-rapidapi-host': 'shazam.p.rapidapi.com'
	}
};

// ! IN ORDER TO KEEP FUNCTIONS TOGETHER, PREFER TO USE CLASS 

export default class API {
    // BRING POPULAR MUSICS
    async getPopular() {
      const data1 = await this.searchMusic("tarkan");
      const data2 = await this.searchMusic("müslüm");
  
      return [...data1, ...data2];
    }
  
    // ! SEARCH'YAPILACAK ARAMAYA GÖRE SONUÇLARI GETİRECEK
    async searchMusic(query) {
      
      const url = `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr`;
  
      
      const res = await fetch(url, options);
      const data = await res.json();
  
      // ! VERİYE FORMAT ATMAMIZA OLANAK SAĞLADI
      const formatted = data.tracks.hits.map((item) => item.track);
  
   
      return formatted;
    }
  }