import { Sidebar, Header } from "./components";
import { PostList, Login } from "./pages";
import { useState } from "react";

function App() {
	const [isSidebar, setIsSidebar] = useState(true);
	return (
		<div className="App">
			<Sidebar isActive={isSidebar} onClick={() => setIsSidebar(!isSidebar)} />
			<div id="main">
				<Header onClick={() => setIsSidebar(!isSidebar)} />
				<PostList />
				<Login />
			</div>
		</div>
	);
}

export default App;
