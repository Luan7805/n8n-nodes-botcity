import {INodeProperties} from 'n8n-workflow';

export const Operations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['Orchestrator'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get execution details',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v2/task/{{$parameter.executionID}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many executions details',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v2/task',
						qs: {
							size: 1000,
						}
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'content',
								},
							},

						],
					},
					operations: {
						pagination: {
							type: 'generic',
							properties: {
								continue: '={{ !$response.body.last }}',
								request: {
									qs: {
										page: '={{ parseInt(($response.body.number ?? 0) + 1) }}',
									}
								}
							}
						},
					},
					send: {
						paginate: false, // Disabled due 'Days' parameter not working
					},
				},
			},
			{
				name: 'Start',
				value: 'start',
				action: 'Start a new bot',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v2/task',
					},
				},
			},
			{
				name: 'Stop Queue Execution',
				value: 'cancel',
				action: 'Cancel an execution',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v2/task/{{$parameter.executionID}}',
						body: {
							state: "CANCELED"
						}
					},
				},
			},
			{
				name: 'Stop Running Execution',
				value: 'stop',
				action: 'Stop an execution',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v2/task/{{$parameter.executionID}}',
						body: {
							interrupted: true,
							killed: true
						}
					},
				},
			},

		],
		default: 'start',
	},

	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,

		displayOptions: {
			show: {
				resource: ['Datapool'],
			},
		},
		options: [
			{
				name: 'Add Item',
				value: 'addItem',
				action: 'Add item to datapool',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v2/datapool/{{$parameter.datapool}}/push',
					},
				},
			},
			{
				name: 'List Datapool Items',
				value: 'listItems',
				action: 'List datapool items',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v2/datapool/{{$parameter.datapool}}/view',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'content',
								},
							},
						],
					},
					operations: {
						pagination: {
							type: 'generic',
							properties: {
								continue: '={{ !$response.body.last }}',
								request: {
									qs: {
										page: '={{ parseInt(($response.body.number ?? 0) + 1) }}',
									}
								}
							}
						}
					},
					send: {
						paginate: true,
					},
				},
			},
			{
				name: 'Delete Datapool Item',
				value: 'deleteItem',
				action: 'Delete an item from datapool',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/v2/datapool/{{$parameter.datapool}}/entry/{{$parameter.itemId}}',
					},
					output: {
						postReceive: [
							{
								type: 'set',
								properties: {
									value: '={{ { "success": true } }}', // Replace original output (blank value)
								},
							},
						],
					},
				},
			},

		],
		default: 'addItem',
	},
];

