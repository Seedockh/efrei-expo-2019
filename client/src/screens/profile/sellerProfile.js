import React, { useEffect, useState } from 'react';
import { Provider, Text, Button, List, ProgressBar } from 'react-native-paper';
import { View, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import * as queries from '../../apollo/queries';
import Style from '../../styles';

const Screen = ({ navigation }) => {
    const { loading, data } = useQuery(queries.GET_USER, {
  		variables: {
  			id: navigation.getParam('sellerId')
      },
      fetchPolicy: "no-cache"
    });

    const Item = ({ id, title, price, image }) => {
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
            source={{ uri: image }}
        />
      </TouchableOpacity>
    )};

    return (
        <Provider>
            {loading &&
              <ProgressBar progress={0.5} color='white' />
            }
            {!loading &&
              <View style={Style.main.detailContainer}>
                <ScrollView>
                  <View style={Style.main.section}>
                    <Text style={Style.main.midTitle}>{data.user.firstname} {data.user.lastname}</Text>
                  </View>
                  <View style={Style.main.section}>
                    <Text style={Style.main.textRed}>{data.user.city}</Text>
                  </View>
                  <View style={Style.main.section}>
                    <Text style={Style.main.filterTitle}>More products from this seller</Text>
                    <FlatList
                      data={data.user.posts}
                      style={Style.main.list}
                      renderItem={ ({ item }) => (
                          <Item
                            id={item.id}
                            title={item.title}
                            price={`$ ${item.price.toString()}`}
                            image={item.image}
                            left={props => <List.Icon {...props} icon="attachment" />}
                          />
                        )
                      }
                      keyExtractor={item => item.id}
                    />
                  </View>
                </ScrollView>
              </View>
            }
        </Provider>
    )
}

export default Screen;
