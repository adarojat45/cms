import { Sidebar, Header } from "./components";
import { PostList, Login } from "./pages";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	const [isSidebar, setIsSidebar] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	return (
		<div className="App">
			<Sidebar isActive={isSidebar} onClick={() => setIsSidebar(!isSidebar)} />
			<div id="main">
				{isLoggedIn && <Header onClick={() => setIsSidebar(!isSidebar)} />}
				<Router>
					<Switch>
						<Route path="/login">
							<Login onLogin={handleLogin} />
						</Route>
						<Route path="/">
							<PostList />
						</Route>
					</Switch>
				</Router>
			</div>
		</div>
	);
}

export default App;
