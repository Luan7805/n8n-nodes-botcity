import {INodeProperties} from 'n8n-workflow';

const Start: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'activityLabel',
		description: 'Name of the bot you want to start',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getBots',
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['Orchestrator'],
				operation: ['start'],
			},
		},
		routing: {
			send: {
				property: 'activityLabel',
				type: 'body',
			},
		},
		default: '',
	},
	{
		displayName: 'Priority',
		name: 'priority',
		description: 'Priority to run task',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['Orchestrator'],
				operation: ['start'],
			},
		},
		routing: {
			send: {
				property: 'priority',
				type: 'body',
			},
		},
		default: 0,
	},
	{
		displayName: 'Test Task',
		name: 'test',
		description: 'Check if is a test task',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['Orchestrator'],
				operation: ['start'],
			},
		},
		routing: {
			send: {
				property: 'test',
				type: 'body',
			},
		},
		default: false,
	},
	{
		displayName: 'Params',
		name: 'botInput',
		type: 'fixedCollection',
		required: false,
		displayOptions: {
			show: {
				resource: ['Orchestrator'],
				operation: ['start'],
			},
		},
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'values',
				displayName: 'Value',
				values: [
					{
						displayName: 'varName',
						name: 'varName',
						type: 'string',
						required: true,
						default: '',
					},
					{
						displayName: 'Value',
						name: 'valueString',
						type: 'string',
						default: '',
						routing: {
							send: {
								value: '={{$value}}',
								property: '=parameters.{{$parent.varName}}',
								type: 'body',
							},
						},
					},
				],
			},
		],
	},
];

//Cancel, Get or Stop
const Manage: INodeProperties[] = [
	{
		displayName: 'Execution ID',
		name: 'executionID',
		description: 'ID of execution',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['Orchestrator'],
				operation: ['cancel', 'get', 'stop'],
			},
		},
		default: '',
	},
];

export const Fields: INodeProperties[] = [...Start, ...Manage];
