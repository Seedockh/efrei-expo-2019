import React from 'react';
import { Provider, Button, Card, Title, Paragraph  } from 'react-native-paper';
import { ScrollView, Text, Picker, View } from 'react-native';
import { useStateValue } from '../../hooks/state';
import Disconnected from '../../components/disconnected';
import { useQuery } from '@apollo/react-hooks';
import * as queries from '../../apollo/queries';
import Style from '../../styles'

const Screen = ({ navigation }) => {
    const [{ isLogged, productCategory, filter }, dispatch] = useStateValue();
    const { data } = useQuery(queries.GET_POSTS);
    const pickerData = useQuery(queries.GET_CATEGORIES, {fetchPolicy: "no-cache"}).data;

    const setState = (state, value) => {
        return dispatch({
            type: 'setState',
            state,
            value
        })
    }

    return (
      <Provider>
        <View style={Style.main.container}>
          <Text style={Style.main.filterTitle} >Filter:</Text>
          {pickerData != undefined &&
            <View style={{width: '90%', borderWidth: 5, borderColor: '#5f7195', borderRadius: 7}}>
              <Picker
                selectedValue={filter}
                style={Style.main.picker}
                itemStyle={Style.main.pickerItem}
                onValueChange={(itemValue, itemIndex) => setState("filter", itemValue)}>
                  <Picker.Item label={"All"} value={999} />
                  {pickerData.categories.map((item, index) =>
                    <Picker.Item style={Style.main.pickerItem} key={index} label={item.name} value={item.id} />
                  )}
              </Picker>
            </View>
          }

          {pickerData == undefined &&
            <Picker
              selectedValue={productCategory}
              style={Style.main.picker}
              onValueChange={(itemValue, itemIndex) => setState("productCategory", itemValue)}>
                <Picker.Item label="" value={null} />
            </Picker>
          }

          {isLogged && data != undefined && (
            <ScrollView style={Style.main.productsList}>
              {data.posts.map((post, index) => {
                if (post.CategoryId == filter.toString() || filter == "999") {
                  return (
                    <Card key={index} style={Style.main.card}>
                      <Card.Content style={Style.main.cardHeader}>
                        <Title style={Style.main.cardTitle}>{post.title}</Title>
                        <Paragraph style={Style.main.cardText}>${post.price}</Paragraph>
                      </Card.Content>
                      <Card.Cover style={Style.main.cardCover} source={{ uri: post.image}} />
                      <Card.Actions>
                        <Button color='white' onPress={() => navigation.navigate('viewProduct', { productId: post.id })}  dark={true}>See details</Button>
                      </Card.Actions>
                    </Card> )
                  }
              })}
            </ScrollView>
          )}

          {isLogged &&
            <Button mode="contained" onPress={() => navigation.navigate('createPost')} style={Style.main.roundButton}>New</Button>
          }

          {!isLogged &&
            <Disconnected navigation={navigation}/>
          }

        </View>
      </Provider>
    )
}

export default Screen;