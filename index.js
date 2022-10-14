const prompts = require("prompts");
const {getFullArticles2, get40News2, getPoints2, getFirstArticle2} = require("./requests.js");



async function example5(){

	const response = await prompts({
		type: "select",
		name: "value",
		message: "Wich API you want to consult?",
		choices: [
			{title: "Algolia", value:"algolia"},
			{title: "DeepL", value: "deepL"}
		],
		hint: "Just use arrow to select and then press enter"
	});

	console.log(response);
}





async function example6(){

	const question = await prompts(
		{
			type: "select",
			name: "value",
			message: "Wich API you want to consult?",
			choices: [
				{title: "Algolia", value:"algolia"},
				{title: "DeepL", value: "deepL"}
			],
			hint: "Just use arrow to select and then press enter"
		});


	if(question.value === "algolia"){

		const question2 = await prompts(
			{
				type: "select",
				name: "request",
				message: "What request you want to make to this API?",
				choices:[
					{title: "Fetch the first news details", value: 1},
					{title: "Fetch the points from a news page", value: 2},
					{title: "Fetch 40 news from 2 pages", value: 3},
					{title: "Fetch the details from a full news page", value: 4}
				],
				hint: "Just use arrow to select and then press enter"
			});

		switch(question2.request){
		case 1 : return getFirstArticle2();
		case 2 : return getPoints2();
		case 3 : return get40News2();
		case 4: return getFullArticles2();
		}

	}else{

		const question3 = await prompts(
			{
				type: "select",
				name: "request",
				message: "What request you want to make to this API?",
				choices:[
					{title: "Fetch the first 10 cars", value: 1},
					{title: "Fetch the points from 10 cars", value: 2},
					{title: "Fetch 40 cars form 2 pages", value: 3},
					{title: "Fetch the details from a full cars page", value: 4}
				],
				hint: "Just use arrow to select and then press enter"
			});

		switch(question3.request){
		case 1 : return "Not available yet";
		case 2 : return "Not available yet";
		case 3 : return "Not available yet";
		case 4: return "Not available yet";
		}
	}	
}

example6().then(console.log);