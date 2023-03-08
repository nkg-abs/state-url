const stores = {
	create: ({ url, data }) => ({
		method: 'post',
		url: url,
		data: data,
	}),

	update: ({ data: { id }, url, data }) => ({
		method: 'put',
		url: `${ url }${ id }`,
		data: data,
	}),

	delete: ({ data: { id }, url, data }) => ({
		method: 'delete',
		url: `${ url }${ id }`,
		data: data,
	}),

	read: (context) => {
		const { data: { id } = {}, url } = context;

		return {
			method: 'get',
			url: id ? `${ url }${ id }/` : url,
		};
	},
};

export default stores;
