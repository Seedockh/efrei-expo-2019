import React from 'react';
import Navigation from './src/components/navigation';
import { StateProvider } from './src/hooks/state';

const App = () => {
	const initialState = {
		isLogged: true,	
		firstName: "Jack",
		lastName: "Sparrow",
		city: "Caribbean Sea",
		myProducts: [
			{
				title: "Product n°1",
				description: "Buy a nice forest in North America. This forest can't burn because it's wet",
				category: "Forest",
				price: "10.000",
				photo: ["https://picsum.photos/700", "https://picsum.photos/701"]
			},
			{
				title: "Product n°2",
				description: "Buy something useless",
				category: "Object",
				price: "10",
				photo: ["https://picsum.photos/700", "https://picsum.photos/701"]
			}
		]
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
		<StateProvider initialState={initialState} reducer={reducer}>
			<Navigation style={{fontFamily:'futur,OPTIMA'}}/>
		</StateProvider>
	);
}

export default App;