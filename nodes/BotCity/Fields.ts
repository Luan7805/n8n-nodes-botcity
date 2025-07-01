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
						displayName: 'Param name',
						name: 'varName',
						type: 'options',
						description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/" target="_blank">expression</a>',
						required: true,
						typeOptions: {
							loadOptionsMethod: 'getBotParams',
							loadOptionsDependsOn: ['activityLabel'],
						},
						default: [],
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

const Days: INodeProperties[] = [
	{
		displayName: 'Days',
		name: 'days',
		description: 'Relative number of days to fetch data',
		type: 'number',
		required: false,
		displayOptions: {
			show: {
				resource: ['Orchestrator'],
				operation: ['getAll'],
			},
		},
		routing: {
			send: {
				property: 'days',
				type: 'query',
			},
		},
		default: 7,
	},
];

const DatapoolName: INodeProperties[] = [
	{
		displayName: 'Datapool',
		name: 'datapool',
		description: 'Name of datapool',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getAllDatapools',
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['Datapool'],
				operation: ['addItem', 'listItems', 'deleteItem'],
			},
		},
		default: '',
	},
];

const DatapoolItemId: INodeProperties[] = [
	{
		displayName: 'Item ID',
		name: 'itemId',
		description: 'ID of item',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['Datapool'],
				operation: ['deleteItem'],
			},
		},

		default: '',
	},
];

const AddItemToDatapool: INodeProperties[] = [
	{
		displayName: 'Values',
		name: 'values',
		placeholder: 'Add Value',
		type: 'fixedCollection',
		typeOptions: {
			multipleValueButtonText: 'Add Value',
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['Datapool'],
				operation: ['addItem'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Values',
				name: 'value',
				values: [
					{
						displayName: 'Label',
						name: 'label',
						type: 'options',
						description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/" target="_blank">expression</a>',
						typeOptions: {
							loadOptionsMethod: 'getSingleDatapool',
							loadOptionsDependsOn: ['datapool'],
						},
						default: [],
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						routing: {
							send: {
								value: '={{$value}}',
								property: '=values.{{$parent.label}}',
								type: 'body',
							},
						},
						default: '',
					},
				],
			},
		],
	},
];

export const Fields: INodeProperties[] = [
	...Start,
	...Manage,
	...Days,
	...DatapoolName,
	...DatapoolItemId,
	...AddItemToDatapool
];
