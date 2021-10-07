import { Sidebar, Header } from "./components";
import { PostList, Login } from "./pages";
import { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

function App() {
	const [isSidebar, setIsSidebar] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const history = useHistory();

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		setIsSidebar(false);
		localStorage.removeItem("access_token");
		history.push("/login");
	};

	return (
		<div className="App">
			<Sidebar isActive={isSidebar} onClick={() => setIsSidebar(!isSidebar)} />
			<div id="main">
				{isLoggedIn && (
					<Header
						onMenuClick={() => setIsSidebar(!isSidebar)}
						onLogoutClick={handleLogout}
					/>
				)}
				<Switch>
					<Route path="/login">
						<Login onLogin={handleLogin} />
					</Route>
					<Route path="/">
						<PostList />
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default App;
