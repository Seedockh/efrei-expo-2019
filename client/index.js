import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    // No warning ignored yet
    // example : 'Warning: componentWillMount is deprecated',
]);

export default function Main() {
    return (
        <PaperProvider>
            <App/>
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => App);
