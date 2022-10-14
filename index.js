import prompts from "prompts";
import {getNumberOfNewsBuffered, getNewsFromNewsApi2, callAPI} from "./requests.js";




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

		return callAPI(number);
	}
	else{

		return callAPI(number);
	}


}

example6().then(console.log);