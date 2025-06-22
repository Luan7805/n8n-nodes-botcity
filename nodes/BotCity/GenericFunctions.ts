import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IRequestOptions,
	JsonObject,
} from 'n8n-workflow';
import {NodeApiError} from 'n8n-workflow';

export interface BodyWithPagination extends IDataObject {
	size: number,
	page: number
}

export async function bcApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: any = {},
	query?: IDataObject,
	uri?: string,
): Promise<any> {
	const options: IRequestOptions = {
		headers: {},
		method,
		qs: query,
		uri: uri || endpoint,
		body,
		json: true,
	};

	try {
		const credentials = await this.getCredentials('botCityApi');
		const baseUrl = credentials.url as string;
		options.uri = `${baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}${options.uri}`;
		return await this.helpers.requestWithAuthentication.call(
			this,
			'botCityApi',
			options,
		);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

export async function bcApiRequestAllItems(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	propertyName: string,
	method: IHttpRequestMethods,
	endpoint: string,
	body: BodyWithPagination = {size: 50, page: 0},
	query: IDataObject = {},
	maxPages: number = 100
): Promise<any> {
	const returnData: IDataObject[] = [];
	let responseData;

	do {
		responseData = await bcApiRequest.call(this, method, endpoint, body, query);
		const values = Object.values(responseData[propertyName] as IDataObject[]);
		returnData.push(...values);
		body.page++
		maxPages--
	} while (!responseData.last && maxPages > 0);

	return returnData;
}
