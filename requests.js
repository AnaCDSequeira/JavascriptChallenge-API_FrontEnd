

function getNumberOfNewsBuffered(numberOfArticles){
	
	/*const response = function () {
		let finalArr = [];
		let number = 0;
		let numberOfArticlesToRequest = numberOfArticles;
		async function array(numberOfPage){ await fetch(`http://hn.algolia.com/api/v1/search?page=${numberOfPage}`)
		.then(response => response.json())
		.then(json => json.hits)
		//.then(hits => hits.filter(e => e != undefined))
		.then(hits => {
			
			let numberOfRequests = 0;
			if(numberOfArticlesToRequest > 20){
				numberOfRequests = 20;
				numberOfArticlesToRequest -= numberOfRequests;
			} 

			for(let i = 0; i < 20; i++) {
				const article = {
					title: hits[i].title,
					url: hits[i].url
				}
				finalArr.push(article);
			}
		
			if(finalArr.length<numberOfArticles){
				array(++number);
			}
			
		})};
		array(number);
		return finalArr;
	}
	
}*/





module.exports = {getNumberOfNewsBuffered};