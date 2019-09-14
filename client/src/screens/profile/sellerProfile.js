import React from 'react';
import { Provider, Text, Button, List } from 'react-native-paper';
import { View, FlatList } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import * as queries from '../../apollo/queries';
import Style from '../../styles';

const Screen = ({ navigation }) => {
    const { data } = useQuery(queries.GET_USER, {
		variables: {
			id: 1
        },
        fetchPolicy: "no-cache"
    });

    return (
        <Provider>
            {data != undefined && (
                <View style={Style.main.detailContainer}>
                  <View style={Style.main.section}>
                    <Text style={Style.main.midTitle}>{data.user.firstname} {data.user.lastname}</Text>
                  </View>
                  <View style={Style.main.section}>
                    <Text style={Style.main.textCandy}>Location: {data.user.city}</Text>
                  </View>
                  <View style={Style.main.section}>
                    <Text style={Style.main.filterTitle}>More products from this seller</Text>
                    <FlatList
                      data={data.user.posts}
                      renderItem={({item}) =>
                        <List.Item
                          style={{color: 'white'}}
                          title={item.title}
                          description={`$ ${item.price.toString()}`}
                          left={props => <List.Icon {...props} icon="attachment" />}
                        />
                      }
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                </View>
            )}
        </Provider>
    )
}

export default Screen;
