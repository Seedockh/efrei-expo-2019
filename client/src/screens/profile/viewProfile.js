import React from 'react';
import { Provider, Text, Button, ProgressBar } from 'react-native-paper';
import { View, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { useStateValue } from '../../hooks/state';
import { useQuery } from '@apollo/react-hooks';
import * as queries from '../../apollo/queries';
import Disconnected from '../../components/disconnected';
import Style from '../../styles'

const Screen = ({ navigation }) => {
    const [{ isLogged, id, firstName, lastName, city, image }, dispatch] = useStateValue();
    const { loading, data } = useQuery(queries.GET_USER_POSTS, {
  		variables: {
  			id: id
  		}
	  });

    const Item = ({ id, title, price, productImage }) => {
      return (
      <TouchableOpacity
        style={Style.main.card}
        onPress={() => navigation.navigate('viewProduct', { productId: id })}
      >
        <View style={Style.main.rowSection}>
          <Text style={Style.main.smallTitle}>{title}</Text>
          <Text style={Style.main.textRed}>{price}</Text>
        </View>
        <Image
            style={{height: 200}}
            source={{ uri: productImage }}
        />
      </TouchableOpacity>
    )};

    return (
        <Provider>
          {loading &&
            <ProgressBar progress={0.5} color='white' />
          }
          {!loading && isLogged && (
                <View style={Style.main.detailContainer}>
                  <ScrollView>
                    <View style={Style.main.section}>
                      <View style={Style.main.userSection}>
                        <View style={Style.main.leftColumn}>
                        {image &&
                          <Image source={{ uri: image }} style={Style.main.profilePic}/>
                        }
                        </View>
                        <View style={Style.main.rightColumn}>
                          <Text style={Style.main.smallTitle}>{firstName}</Text>
                          <Text style={Style.main.smallTitle}>{lastName}</Text>
                          <Text style={Style.main.smallTitle}>{city}</Text>
                        </View>
                      </View>
                      <View style={Style.main.section}>
                        <Button style={Style.main.button} icon="edit" mode="contained" onPress={() => navigation.navigate('editProfile')}>Edit</Button>
                      </View>
                      <View style={Style.main.section}>
                        <Text style={Style.main.filterTitle}>Your products</Text>
                        <FlatList
                          data={data.userPosts}
                          style={Style.main.list}
                          renderItem={ ({ item }) => (
                              <Item
                                id={item.id}
                                title={item.title}
                                price={`$ ${item.price.toString()}`}
                                productImage={item.image}
                                left={props => <List.Icon {...props} icon="attachment" />}
                              />
                            )
                          }
                          keyExtractor={item => item.id}
                        />
                      </View>
                    </View>
                  </ScrollView>
                </View>
            )}
            {!loading && !isLogged && (
                <Disconnected navigation={navigation}/>
            )}
        </Provider>
    )
}

export default Screen;
