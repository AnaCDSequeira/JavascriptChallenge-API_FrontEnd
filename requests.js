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

    console.log(arrayOfNews.flat().slice(0,numberOfArticles).forEach(e => console.log(e)));
}

async function getNewsFromNewsApi2(number){

    const newsPerPage = 100;
    const numberOfLoops = Math.ceil(number / newsPerPage);
    const arrayOfNews = [];


    for(let i = 1; i <= numberOfLoops; i++){

        const newsJSON = await newsapi.v2.everything({
            q: "bitcoin",
            from: "2022-10-10",
            to: "2022-10-11",
            language: "en",
            sortBt: "relevancy",
            page:`${i}`
        })

        arrayOfNews.push(newsJSON.articles);
    }
    
    
    return arrayOfNews.flat().slice(0,number)
                      .map(e => ansiEscapes.link(e.title, e.url))
                      .forEach(e =>console.log(e));
}

function callAPI(number){
    getNumberOfNewsBuffered(number);
    getNewsFromNewsApi2(number);
}




async function* promisesToAsyncIterator(promises) {

    const promisesByKey = new Map();


    for (let i = 0; i < promises.length; i++) {
        promisesByKey.set(
            i,
            promises[i].then((value) => ({ value, key: i}))
        );
    }
    
    while (promisesByKey.size > 0) {
        const promise = await Promise.any(promisesByKey.values());
        promise.then(console.log);
        promisesByKey.delete(promise.key);
        yield promise.value;
    }
}

export {callAPI};







