const toastHelper = (message, type, theme = "colored") => {
	return {
		render(data) {
			return message ? message : data.response.data;
		},
		type,
		theme,
	};
};

export default toastHelper;
