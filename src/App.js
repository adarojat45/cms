import { Sidebar, Header } from "./components";
import {
	PostList,
	Login,
	Dashboard,
	CategoryList,
	CategoryCreate,
	CategoryEdit,
	PostCreate,
	PostEdit,
} from "./pages";
import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [isSidebar, setIsSidebar] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const history = useHistory();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setIsLoggedIn(true);
			setIsSidebar(true);
		} else {
			history.push("/login");
		}
	}, [history]);

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		setIsSidebar(false);
		localStorage.removeItem("token");
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
					<Route exact path="/">
						<Dashboard />
					</Route>
					<Route path="/post/create">
						<PostCreate />
					</Route>
					<Route path="/post/:id">
						<PostEdit />
					</Route>
					<Route path="/post">
						<PostList />
					</Route>
					<Route path="/category/create">
						<CategoryCreate />
					</Route>
					<Route path="/category/:id">
						<CategoryEdit />
					</Route>
					<Route path="/category">
						<CategoryList />
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default App;
