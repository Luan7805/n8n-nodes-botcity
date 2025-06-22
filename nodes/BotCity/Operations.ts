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
				name: 'Stop queue execution',
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
				name: 'Stop running execution',
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
				value: 'getMany',
				action: 'Get many executions details',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v2/task',
					},
				},
			},

		],
		default: 'start',
	},
];
