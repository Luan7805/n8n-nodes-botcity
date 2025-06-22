import {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

export class BotCity implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'BotCity',
		name: 'botCity',
		icon: 'file:BotCity.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'BotCity orchestrator API',
		defaults: {
			name: 'BotCity',
		},
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: [NodeConnectionType.Main],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: [NodeConnectionType.Main],

		credentials: [
			{
				name: 'botCityApi',
				required: true,
			},
		],

		requestDefaults: {
			baseURL: '={{$credentials.url.replace(new RegExp("/$"), "")}}',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},

		properties: [

		],
	};

}
