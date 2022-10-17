import ansiEscapes from "ansi-escapes";
import NewsAPI from "newsapi";
const newsapi = new NewsAPI("6b47cad506d34778bb7dfddf12b15ec2");


async function getNumberOfNewsBuffered(numberOfnews){

    const loops = Math.ceil(numberOfnews / 20);
    const arrayOfNews = [];

    for (let i = 0; i < loops; i++) {
        const response = await fetch(`http://hn.algolia.com/api/v1/search?page=${i}`);
        const json = await response.json();
        const result = json.hits.map(e => ansiEscapes.link(e.title, e.url));
        arrayOfNews.push(result);
    }

    return arrayOfNews.flat().slice(0,numberOfnews);
}


async function getNewsFromNewsApi2(numberOfNews){

    const loops = Math.ceil(numberOfNews / 100);
    const arrayOfNews = [];

    for(let i = 1; i <= loops; i++){

        const newsJSON = await newsapi.v2.everything({
            q: "bitcoin",
            from: "2022-10-10",
            to: "2022-10-11",
            language: "en",
            sortBt: "relevancy",
            page:`${i}`
        })

        const resultArray = newsJSON.articles.map(e => ansiEscapes.link(e.title, e.url));
        arrayOfNews.push(resultArray);
    }
    
    return arrayOfNews.flat().slice(0,numberOfNews);
}


function callIterator(number){
    const arr = getNewsByIterator(number);
    arr.then( arr => arr.forEach(e => console.log(e)));
}

async function callAPI(number){
    const arr = await getNumberOfNewsBuffered(number);
    const arr2 = await getNewsFromNewsApi2(number);
    console.log(arr.concat(arr2).join("\n"))

}


async function* promisesToAsyncIterator(promises){    
    const promisesByKey = new Map();

    for (let i = 0; i< promises.length; i++){
        promisesByKey.set(
            i,
            promises[i].then((value) => ({value, key: i})));
        }
        
    while (promisesByKey.size > 0){
        const promise = await Promise.any(promisesByKey.values());
        promisesByKey.delete(promise.key);
        yield promise.value
    }
}




async function getNewsByIterator(numOfNews) {
    
    const loops2 = Math.ceil(numOfNews / 100);
    const loops = Math.ceil(numOfNews / 20);
    let newsApi = [];
   
    for (let i = 0; i < loops; i++) {
      const response = fetch(`https://hn.algolia.com/api/v1/search?page=${i}`);
      newsApi.push(response);
    }

  
    for (let i = 1; i <= loops2; i++) {
        const response = fetch(`https://newsapi.org/v2/everything?q=keyword&apiKey=88984fe341a64e4da9111e9f6eccf752&page=${i}`);
        newsApi.push(response);
    }

    const result = [];
    let counterNews = numOfNews;
    let counterNews2 = numOfNews;
      
    for await (const elem of promisesToAsyncIterator(newsApi)){
        const response = await elem.json();

        if(response.hits){
            const links = response.hits.map(e => ansiEscapes.link(e.title, e.url));
            if(links.length <= counterNews){
                result.push(links);
                counterNews -= links.length;
            }
            else{
                result.push(links.slice(0,counterNews));
            }
        }

        else{
            const links = response.articles.map(e => ansiEscapes.link(e.title, e.url));

            if(links.length <= counterNews2){
                result.push(links);
                counterNews2 -= links.length;
            }
            else{
                result.push(links.slice(0,counterNews2)) 
            }

        }
    }

    return result.flat();
}


export {callAPI, getNewsByIterator, callIterator};







