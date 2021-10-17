const toastHelper = (message, type, theme = "colored") => {
	return {
		render(data) {
			if (message) {
				return message;
			}
			return (
				<ul>
					{data?.data?.response?.data?.messages?.map((el) => {
						return <li>{el}</li>;
					})}
				</ul>
			);
		},
		type,
		theme,
	};
};

export default toastHelper;
