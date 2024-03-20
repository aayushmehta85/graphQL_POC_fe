import Header from './components/Common/Header';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import NotFoundPage from './pages/NotFound';
import ProjectPage from './pages/ProjectPage';
const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				clients: {
					merge(existing, incoming) {
						return incoming;
					},
				},
				projects: {
					merge(existing, incoming) {
						return incoming;
					},
				},
			},
		},
	},
});

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
	// cache: new InMemoryCache(),
	cache: cache,
});

function App() {
	return (
		<>
			<ApolloProvider client={client}>
				<Router>
					<Header />

					<div className="container">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/projects/:id" element={<ProjectPage />} />
							<Route path="*" element={<NotFoundPage />} />
						</Routes>
					</div>
				</Router>
			</ApolloProvider>
		</>
	);
}

export default App;
