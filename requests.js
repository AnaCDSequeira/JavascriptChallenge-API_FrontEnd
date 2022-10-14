import ansiEscapes from "ansi-escapes";
import NewsAPI from "newsapi";
const newsapi = new NewsAPI("6b47cad506d34778bb7dfddf12b15ec2");

async function getNumberOfNewsBuffered(numberOfArticles){

	const articlesPerPage = 20;
	const numberOfLoops = Math.ceil(numberOfArticles / articlesPerPage); 
	const arrayOfNews = [];

	for (let i = 0; i < numberOfLoops; i++) {
		const response = await fetch(`http://hn.algolia.com/api/v1/search?page=${i}`);
		const json = await response.json();
		const result = json.hits.map(e => ansiEscapes.link(e.title, e.url));
		arrayOfNews.push(result);
	}
	
	return arrayOfNews.flat().slice(0,numberOfArticles).forEach(e => console.log(e));
}

async function getNewsFromNewsApi2(number){
    const newsJSON = await newsapi.v2.everything({
        q: "bitcoin",
        from: "2022-10-10",
        to: "2022-10-11",
        language: "en",
        sortBt: "relevancy",
    })
    const arr = await (newsJSON => {
        let dirEntries = [];
        for (let i = 0; i < number; i++){
            const article =
            ansiEscapes.link(newsJSON.articles[i].title,newsJSON.articles[i].url) ;
        dirEntries.push(article);
    }
    return dirEntries
    .flat()
    .slice(0, number)
    .forEach((e) => console.log(e));
    });
return arr(newsJSON);
}

function callAPI(number){
	getNumberOfNewsBuffered(number)
	getNewsFromNewsApi2(number);
}


export {getNumberOfNewsBuffered, getNewsFromNewsApi2, callAPI};