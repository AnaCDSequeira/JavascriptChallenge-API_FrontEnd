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


async function callAPI(number){
    const arr = await getNumberOfNewsBuffered(number);
    const arr2 = await getNewsFromNewsApi2(number);
    return arr.concat(arr2).join("\n");
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
    
    const loops = Math.ceil(numOfNews / 20);
    let newsApi = [];
   
    for (let i = 0; i < loops; i++) {
      const response = await fetch(`https://hn.algolia.com/api/v1/search?page=${i}`);
      const json = await response.json();
      const title = json.hits.map(hit => ansiEscapes.link(hit.title, hit.url));
      title.map(link => newsApi.push(new Promise(resolve => setTimeout(() => resolve(link), 500))));
    }

    const loops2 = Math.ceil(numOfNews / 100);
    let newsApi2 = [];

    for (let i = 1; i <= loops2; i++) {
        const newsJSON = await newsapi.v2.everything({
            q: "bitcoin",
            from: "2022-10-10",
            to: "2022-10-11",
            language: "en",
            sortBt: "relevancy",
            page:`${i}`
        })

      const title = newsJSON.articles.map(article => ansiEscapes.link(article.title, article.url));
      title.map(link => newsApi2.push(new Promise(resolve => setTimeout(() => resolve(link), 500))));
  }

    const result = newsApi.flat().slice(0, numOfNews).concat(newsApi2.flat().slice(0, numOfNews));
      
    for await (const promiseValue of promisesToAsyncIterator(result)){
        console.log(promiseValue);
    }
}


export {callAPI, getNewsByIterator};







