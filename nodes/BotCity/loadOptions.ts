import {ILoadOptionsFunctions, INodePropertyOptions} from "n8n-workflow";
import {bcApiRequest, bcApiRequestAllItems} from "./GenericFunctions";

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

export async function getBotParams(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const responseData = await bcApiRequest.call(
		this,
		'GET',
		'/api/v2/activity/' + this.getNodeParameter('activityLabel'),
	);

	const parametersItems = responseData as { parameters: [{ label: string, type: string, required: boolean }] };
	return parametersItems.parameters.map((item) => {
		const name = item.label;
		const description = `type: ${item.type}, required: ${item.required ? 'YES' : 'NO'}`;
		const value = item.label;
		return {name, description, value};
	});
}

export async function getAllDatapools(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const responseData = await bcApiRequestAllItems.call(
		this,
		'content',
		'GET',
		'/api/v2/datapool',
	);

	const datapools = responseData as [{ label: string, active: boolean }];
	return datapools
		.filter(datapool => datapool.active)
		.map(datapool => ({
			name: datapool.label,
			value: datapool.label,
		}));
}

export async function getSingleDatapool(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const responseData = await bcApiRequest.call(
		this,
		'GET',
		'/api/v2/datapool/' + this.getNodeParameter('datapool'),
	);

	const schemaItems = responseData as { schema: [{ label: string, type: string }] };
	return schemaItems.schema.map((item) => {
		const name = item.label;
		const description = `type: ${item.type}`;
		const value = item.label;
		return {name, description, value};
	});
}
