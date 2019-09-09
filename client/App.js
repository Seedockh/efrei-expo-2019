import React from 'react';
import Navigation from './src/components/navigation';
import { StateProvider } from './src/hooks/state';
import { View, SafeAreaView, StatusBar, Platform } from 'react-native';

const App = () => {
	const initialState = {
		isLogged: false,
		user: {},
		productsScreen: 'productsList',
		profileScreen: 'viewProfile'
	};

	const reducer = (state, action) => {
		switch (action.type) {
		case 'isLogged':
			return ({
				...state,
				isLogged: action.status
    	});
		case 'switchScreen':
			return({
				...state,
				[action.tab]: action.screen
			});
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
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
			<View style={{flex: 1, backgroundColor: "#fff", paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
				<StateProvider initialState={initialState} reducer={reducer}>
					<Navigation style={{fontFamily:'futur,OPTIMA'}}/>
				</StateProvider>
			</View>
		</SafeAreaView>
	);
}

export default App;