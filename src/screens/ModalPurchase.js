import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

export default function ModalPurchase({ modalVisible, toggleModal, totalQuantity, totalPrice }) {
  const foodData = useSelector(state => state.cart);

  return (
    <Modal
      animationInTiming={200}
      animationOutTiming={200}
      onBackdropPress={() => toggleModal()}
      transparent={true}
      isVisible={modalVisible}
      animationType={"slide"}
    >
      <ScrollView
        style={{
          marginTop: 20,
          height: 550,
          alignSelf: 'center',
          borderRadius: 25,
          width: 350,
          backgroundColor: '#ffffff',
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={{ flex: 2, marginLeft: 15, marginRight: 15 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Payment</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Cart items</Text>
          </View>
          <View style={{ flex: 5, }}>
            {foodData.filter(item => item.quantity >= 1).map((item) => (
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.quantity}</Text>
                </View>
                <View style={{ flex: 4 }}>
                  <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.foodName}</Text>
                </View>
                <View style={{ flex: 2 }}>
                  <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.price * item.quantity}</Text>
                </View>
              </View>)
            )}
          </View>
          <View style={{ flex: 2 }}>
            <TouchableHighlight>
              <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#3bf511', borderRadius: 20, justifyContent: 'center' }}>
                <View>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Payment methods</Text>
                </View>
                <View style={{ marginTop: 10, flexDirection: 'column' }}>
                  <View>
                    <Text style={{ fontSize: 15, fontWeight: '900' }}>Quantity in cart: {totalQuantity} x</Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 15, fontWeight: '900' }}>Total Price: $ {totalPrice}</Text>
                  </View>
                </View>
                <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row' }}>
                  <Icon
                    name="cash-marker"
                    color="#fffccc"
                    size={30}
                  />
                  <Text style={{ marginLeft: 5, fontSize: 18, fontWeight: 'bold' }}>Cash payment</Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </Modal>
  )
}