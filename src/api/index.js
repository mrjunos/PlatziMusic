import conf from "./config"
const URL = `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=colombia&api_key=${conf.apiKey}&format=json`

export default function getArtists(){
	return fetch(URL)
	.then(res => res.json())
	.then(json => json.topartists.artist)
}