import {INodeType, INodeTypeDescription, NodeConnectionType} from 'n8n-workflow';
import {Operations} from './Operations';
import {Fields} from './Fields';
import {getBots, getBotParams, getAllDatapools, getSingleDatapool} from './loadOptions'

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
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Execution Orchestrator',
						value: 'Orchestrator',
						description: 'Start, Stop or List an execution',
					},
					{
						name: 'Datapool',
						value: 'Datapool',
						description: 'Datapool manager',
					},
				],
				default: 'Orchestrator',
			},

			...Operations,
			...Fields,
		],
	};

	methods = {
		loadOptions: {
			getBots,
			getBotParams,
			getAllDatapools,
			getSingleDatapool
		},
	};
}
