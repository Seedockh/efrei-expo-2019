import React, { useEffect } from 'react';
import Navigation from './src/components/navigation';
import { StateProvider } from './src/hooks/state';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BackHandler } from 'react-native'

const client = new ApolloClient({
	uri: 'https://lebonangle.herokuapp.com/',
});

const App = () => {
	const handleBackButton = () => {
		return true;
	}
	
	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', handleBackButton);
	})

	const initialState = {
		isLogged: true,	
		firstName: "Anonymous",
		lastName: "User",
		city: "Somewhere",
		id: 1,
		products: [
			{
				title: "Product n°1",
				description: "Buy a nice forest in North America. This forest can't burn because it's wet",
				category: "Forest",
				price: "10.000",
				photo: ["https://picsum.photos/700", "https://picsum.photos/701"],
				ownerID: 1
			},
			{
				title: "Product n°2",
				description: "Buy something useless",
				category: "Object",
				price: "10",
				photo: ["https://picsum.photos/700", "https://picsum.photos/701"],
				ownerID: 8
			}
		],
		productTitle: "",
		productCategory: 1,
		productPrice: "1",
		productImage: "",
		productId: null,
		onEditProduct: false
	};

	const reducer = (state, action) => {
		switch (action.type) {
		case 'setState':
			return({
				...state,
				[action.state]: action.value
			});
		default:
			return state;
		}
	};

	return (	
		<ApolloProvider client={client}>
			<StateProvider initialState={initialState} reducer={reducer}>
				<Navigation style={{fontFamily:'futur,OPTIMA'}}/>
			</StateProvider>
		</ApolloProvider>
	);
}

export default App;