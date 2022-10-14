const prompts = require("prompts");
const {getFullArticles2, get40News2, getPoints2, getFirstArticle2, getNumberOfNewsBuffered} = require("./requests.js");



async function example6(){

	const question = await prompts(
		{
			type: "number",
			name: "value",
			message: "How many articles do you want?",
		});

	const number = question.value;
	

	const question2 = await prompts(
		{
			type: "select",
			name: "value",
			message: "Wich type of search do you wish??",
			choices: [
				{ title: "Buffered", value: "buffered" },
				{ title: "Iterator", value: "iterator" },
			],
		});

	const type = question2.value;	
	
	
	if(type === "buffered"){

		return getNumberOfNewsBuffered(number);
	}
	else{

		return getNumberOfNewsBuffered(number);
	}


}

example6().then(console.log);