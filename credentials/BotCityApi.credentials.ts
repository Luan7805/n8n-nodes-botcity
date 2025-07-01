import type {
	CredentialInformation,
	IAuthenticateGeneric,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestHelper,
	INodeProperties,
} from 'n8n-workflow';

export class BotCityApi implements ICredentialType {
	name = 'botCityApi';

	displayName = 'BotCity API';
	documentationUrl = 'https://developers.botcity.dev/v3/api-docs';

	properties: INodeProperties[] = [
		{
			displayName: 'Session Token',
			name: 'sessionToken',
			type: 'hidden',
			typeOptions: {
				expirable: true,
			},
			default: '',
		},
		{
			displayName: 'Workspace',
			name: 'workspace',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Login',
			name: 'username',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Key',
			name: 'key',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
		{
			displayName: 'Orchestrator URL',
			name: 'url',
			type: 'string',
			default: '',
			placeholder: 'https://developers.botcity.dev',
		},
	];

	// method will only be called if "sessionToken" (the expirable property)
	// is empty or is expired
	async preAuthentication(this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) {
		const url = credentials.url as string;
		const requestBody: Record<string, CredentialInformation> = {
			login: credentials.username,
			key: credentials.key,
		};

		const { accessToken } = (await this.helpers.httpRequest({
			method: 'POST',
			url: `${url.endsWith('/') ? url.slice(0, -1) : url}/api/v2/workspace/login`,
			body: requestBody,
		})) as { accessToken: string };
		return { sessionToken: accessToken };
	}

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'token': '={{$credentials.sessionToken}}',
				'organization': '={{$credentials.workspace}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.url.replace(new RegExp("/$"), "")}}',
			method: 'GET',
			url: '/api/v2/maestro/version',
		},
	};
}
