import React, { useEffect } from 'react';
import Navigation from './src/components/navigation';
import { StateProvider } from './src/hooks/state';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BackHandler } from 'react-native'
import Style from './src/styles'

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
		isLogged: false,
		firstName: "",
		lastName: "",
		city: "",
		id: null,
		products: [],
		productTitle: "",
		productCategory: null,
		productPrice: null,
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
				<Navigation style={Style.main.navigation}/>
			</StateProvider>
		</ApolloProvider>
	);
}

export default App;
