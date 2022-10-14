
async function getFirstArticle2(){

	const response = await fetch("http://hn.algolia.com/api/v1/search");
	const json = await response.json();

	const firstNewsId = json.hits[0].objectID;

	const response2 = await fetch(`http://hn.algolia.com/api/v1/items/${firstNewsId}`);
	const json2 = await response2.json();
	return json2;
}



async function getPoints2(){

	const response = await fetch("http://hn.algolia.com/api/v1/search?page=0");
	const json = await response.json();

	const arrayPoints = json.hits.map(e => e.points);
	return arrayPoints.reduce((acc, curr) => acc + curr, 0);
}



async function get40News2(){

	return Promise.all([
		fetch("http://hn.algolia.com/api/v1/search?page=0").then(response => response.json()).then(json => json.hits),
		fetch("http://hn.algolia.com/api/v1/search?page=1").then(response => response.json()).then(json => json.hits)
	]).then(arr => arr.flat());
	
}


async function getFullArticles2(){

	const response = await fetch("http://hn.algolia.com/api/v1/search");
	const json = await response.json();

	const idArray = json.hits.map(e => e.objectID);

	const responseArray = idArray.map(e => fetch("http://hn.algolia.com/api/v1/items/" + e));
	const jsonArray = responseArray.map(e => e.then(e => e.json()));

	return Promise.all(jsonArray);	
}



module.exports = {getFullArticles2, get40News2, getPoints2, getFirstArticle2};