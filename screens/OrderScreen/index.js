//import liraries
import React, { Component } from "react";
import { View,FlatList,StyleSheet,ScrollView,SafeAreaView} from "react-native";
import {Appbar,Card,Text,Button} from "react-native-paper";
import {DrawerActions} from "react-navigation";
import {Colors} from '../../constants'
const orderData=[
  {
    imageUrl: "https://media.gettyimages.com/photos/hamburger-on-white-picture-id166543020?k=6&m=166543020&s=612x612&w=0&h=nrAtpF6R4frym64PnqKqMNdlgyUoKdsO-3mA3ypMLNE=",
    title: "Burgers",
    price:"R90.00",
    quantity:"2"
  },
  {
    imageUrl: "https://media.gettyimages.com/photos/fruit-smoothies-picture-id173501950?k=6&m=173501950&s=612x612&w=0&h=lqqIi0A4DgyxekW40kTL7zIaC-fcg0C7rZknLjhKYK0=",
    title: "Shakes",
    price:"R28.00",
    quantity:"1"
  },
  {
    imageUrl: "https://media.gettyimages.com/photos/vegetarian-pizza-03-picture-id184098729?k=6&m=184098729&s=612x612&w=0&h=9uE3n_sHYObLkmIgysvM__X94zwYPOpCMs5_nLXKil4=",
    title: "Pizza",
    price:"R250.00",
    quantity:"5"
  },
  {
    imageUrl: "https://media.gettyimages.com/photos/man-food-picture-id172259570?k=6&m=172259570&s=612x612&w=0&h=Lz-ar6ZjRCRmW6WKhXRqJDMu0z8sTqJRioHc61RhaHI=",
    title: "Ribs",
    price:"R190.00",
    quantity:"2"
  },
  {
    imageUrl: "https://media.gettyimages.com/photos/chicken-wings-take-out-picture-id174686395?k=6&m=174686395&s=612x612&w=0&h=VdJPzzlYp6ywE9NIfUWLd0osaGTGZHwWvrkgsdvY33U=",
    title: "Wings",
    price:"R112.00",
    quantity:"1"
  },
  {
    imageUrl: "https://media.gettyimages.com/photos/fries-in-a-cardboard-tray-on-a-white-background-picture-id155287019?k=6&m=155287019&s=612x612&w=0&h=0BO4cxIQdviqkmwVKQN9LIey96WW1ls3KUHOkZ3HJVA=",
    title: "Fries",
    price:"R105.00",
    quantity:"2"
  }
];


// create a component
class OrderScreen extends Component {
  constructor(props){
    super(props);
    this.state ={
      orders:orderData
    }
  }
  render() {
    return (
      <View>
        <Appbar.Header style={{backgroundColor :  Colors.romansRed}}>
          <Appbar.Action
            icon="menu"
            onPress={() =>
              this.props.navigation.dispatch(DrawerActions.toggleDrawer())
            }
          />
          <Appbar.Content title="Orders" />
          <Appbar.Action icon="shopping-cart" />
        </Appbar.Header>
        <ScrollView>
        <SafeAreaView>
        <FlatList
        contentContainerStyle={{paddingBottom:50}}
        showsVerticalScrollIndicator={false}
        data={this.state.orders}
        renderItem={({ item: rowData }) =>{
          return (
                <Card style={{
                  elevation:1,
                  borderColor:"#000",
                  margin:10,
                  flex:1
                }}>
                    <Card.Title title={rowData.title} />
                    <Card.Cover source={{ uri: rowData.imageUrl }} />
                    <View style={styles.cardContainer}>
                    <Card.Content style={styles.cardContent}>
                      <Text>Total : {rowData.price}</Text>
                      <Text>Quantity : {rowData.quantity}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button color={Colors.romansRed} mode="outlined">Reorder</Button>
                    </Card.Actions>
                    </View>
                </Card>
              );
        }}
        />
        </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  cardContainer:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-evenly"
  },
  cardContent:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around"
  }
});

//make this component available to the app
export default OrderScreen;
