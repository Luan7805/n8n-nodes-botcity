import {ILoadOptionsFunctions, INodePropertyOptions} from "n8n-workflow";
import {bcApiRequest} from "./GenericFunctions";


export async function getBots(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const responseData = await bcApiRequest.call(
		this,
		'GET',
		'/api/v2/activity',
	);

	const bots = responseData as [{ name: string, label: string }];
	return bots.map((bot) => {
		const name = bot.name;
		const value = bot.label;
		return {name, value};
	});
}
