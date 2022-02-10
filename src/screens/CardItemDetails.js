import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';

import * as Animatable from 'react-native-animatable';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { foodData } from '../model/foodData';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { set } from 'react-native-reanimated';
import Modal from './ModalPurchase';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

const CardItemDetails = ({ route }) => {
  const itemData = route.params.itemData;
  const [cartItems, setCartItems] = useState(foodData);
  const [totalQuantity, setTotalQuantity] = useState();
  const [totalPrice, setTotalPrice] = useState();
  console.log('total preço  ', totalPrice)
  const [modalVisible, setModalVisible] = useState(false);
  const navTitleView = useRef(null);

  const handleAdd = (item) => {
    let newQuantity = [...foodData];
    newQuantity[item.id - 1].quantity++;
    setCartItems(newQuantity);
    calculateTotalQuantity();
    calculateTotalPrice();
  };

  const handleSubtraction = (item) => {
    let newQuantity = [...foodData];
    newQuantity[item.id - 1].quantity--;
    setCartItems(newQuantity);
    calculateTotalQuantity();
    calculateTotalPrice();
  };

  const toggleModalPayment = () => {
    setModalVisible(!modalVisible)
  };

  const calculateTotalQuantity = () => {
    let totalItemQuantity = foodData.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    setTotalQuantity(totalItemQuantity)
  };

  const calculateTotalPrice = () => {
    let totalItemPrice = foodData.reduce(total, 0);
    function total(total, item) {
      return total + (item.price * item.quantity);
    };
    setTotalPrice(totalItemPrice)
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderImageScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        renderHeader={() => (
          <Image source={itemData.image} style={styles.image} />
        )}
        renderForeground={() => (
          <View style={styles.titleContainer}>
            <Text style={styles.imageTitle}>{itemData.title}</Text>
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View style={styles.navTitleView} ref={navTitleView}>
            <Text style={styles.navTitle}>{itemData.title}</Text>
          </Animatable.View>
        )}
      >
        <TriggeringView
          style={styles.section}
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(100)}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.title}>Overview</Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <FontAwesome name="star" size={16} color="#FF6347" />
              <Text style={{ marginHorizontal: 2 }}>{itemData.rating}</Text>

              <Text>({itemData.reviews})</Text>
            </View>
          </View>
        </TriggeringView>
        <View style={[styles.section, styles.sectionLarge]}>
          <View>
            <ScrollView
              horizontal={false}>
              {foodData.map((item) =>
              (
                <View
                  item={item}
                  key={item.id}
                  style={styles.viewTouchable} >
                  <View style={{ flex: 3, justifyContent: 'center' }}>
                    <Text style={styles.textTouchable}>{item.foodName}</Text>
                  </View>

                  <View style={{
                    flex: 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    backgroundColor: '#f0655b'
                  }}>
                    <View style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <TouchableOpacity
                        hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
                        onPress={() => handleAdd(item)}
                      >
                        <Text style={{
                          color: '#3bf511',
                          fontSize: 40,
                          fontWeight: 'bold',
                        }}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>{item.quantity}</Text>
                    </View>

                    <View style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <TouchableOpacity
                        onPress={() => handleSubtraction(item)}>
                        <Text style={{
                          color: '#000',
                          fontSize: 40,
                          fontWeight: 'bold',
                        }}>-</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <Text
                      style={{ color: '#FF6347', fontSize: 16, fontWeight: '700' }}>{item.price * item.quantity}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View
              style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                  marginTop: 10,
                  elevation: 5,
                  borderRadius: 10,
                  width: 290,
                  height: 50,
                  backgroundColor: '#3bf511',
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}>
                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon
                    name="cart-plus"
                    color="#fffccc"
                    size={40}
                  />
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Shopping Cart</Text>
                </View>

              </TouchableOpacity>
            </View>

          </View>
          <View>
            <Modal
              modalVisible={modalVisible}
              toggleModal={toggleModalPayment}
              totalQuantity={totalQuantity}
              totalPrice={totalPrice}
            />
          </View>
        </View>


        <View style={styles.section}>
          <View style={styles.categories}>
            {itemData.categories.map((category, index) => (
              <View style={styles.categoryContainer} key={index}>
                <FontAwesome name="tag" size={16} color="#fff" />
                <Text style={styles.category}>{category}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { height: 250 }]}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            region={{
              latitude: itemData.coordinate.latitude,
              longitude: itemData.coordinate.longitude,
              latitudeDelta: 0.00864195044303443,
              longitudeDelta: 0.000142817690068,
            }}>

            <MapView.Marker
              coordinate={itemData.coordinate}
              image={require('../assets/map_marker.png')}
            />
          </MapView>
        </View>
      </HeaderImageScrollView>
    </View>
  );
};

export default CardItemDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewTouchable: {
    flex: 1,
    marginTop: 10,
    borderColor: '#FF6347',
    borderWidth: 1,
    borderRadius: 4,
    width: 370,
    height: 50,
    backgroundColor: '#ffe',
    flexDirection: 'row'
  },
  textTouchable: {
    color: "#FF6347",
    fontWeight: "700",
    fontSize: 17,
    fontWeight: "bold",
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF6347',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 5,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    minHeight: 300,
  },
});
