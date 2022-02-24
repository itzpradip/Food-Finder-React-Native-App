import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modal";
import { useSelector } from 'react-redux';
import { spicesData } from '../model/data';

export default function ModalSpices({ modalSpicesVisible, toggleModalSpices }) {
  const foodData = useSelector(state => state.cart);

  const renderItems = ({ item }) => {

    return (
      <View
        item={item}
        key={item.id}
        style={styles.viewTouchable} >
        <View style={{ flex: 3, justifyContent: 'center' }}>
          <View>
            <Text style={styles.textTouchable}>{item.name}</Text>
          </View>
        </View>

        <View style={{
          flex: 2,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          // backgroundColor: '#f0655bbb'
        }}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <TouchableOpacity
              hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
            // onPress={() => handleAdd(item)}
            >
              <Text style={{
                color: '#3bf511',
                fontSize: 30,
                fontWeight: 'bold',
              }}>
                +
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            {/* <Text
                        style={{
                          color: '#000',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>{item.quantity}</Text> */}
          </View>

          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <TouchableOpacity
            // onPress={() => handleSubtraction(item)}
            // disabled={item.quantity > 0 ? '' : 'disabled'}
            >
              <Text style={{
                color: '#000',
                fontSize: 40,
                fontWeight: 'bold',
              }}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return (
    <Modal
      animationInTiming={200}
      animationOutTiming={200}
      onBackdropPress={() => toggleModalSpices()}
      transparent={true}
      isVisible={modalSpicesVisible}
      animationType={"slide"}
    >
      {/* <ScrollView
        style={{
          marginTop: 100,
          marginBottom: 100,
          width: 350,
          height: 550,
          alignSelf: 'center',
          borderRadius: 10,
          backgroundColor: '#ffffff',
        }}
      // contentContainerStyle={{
      //   flexGrow: 1,
      // }}
      > */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // flex: 1,
          width: 350,
          height: 510,
          alignSelf: 'center',
          borderRadius: 10,
          backgroundColor: '#ffffff',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 2
          }}>
          <Text
            style={{
              color: "#000",
              fontWeight: "700",
              fontSize: 20,
              fontWeight: "bold"
            }}>Spices and sauces</Text>
        </View>
        <View style={{ flex: 11 }}>
          <FlatList
            data={spicesData}
            extraData={item => item.id}
            renderItem={renderItems}
          />
        </View>
        <View style={{
          marginTop: 5,
          marginBottom: 5,
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          width: 320,
          height: 70,
          backgroundColor: '#3bf511',
          borderRadius: 10,
          elevation: 4,
        }}>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', flex:3}}>
            <Icon
              name="add-shopping-cart"
              color="#ffffffff"
              size={30}
            />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 18,
                fontWeight: 'bold',
                color: '#ffffffff'
              }}>Add Spices</Text>
          </View>
          <View style={{flexDirection:'column', alignItems:'flex-start', justifyContent:'center', flex:2}}>
            <View>
              <Text style={{color:'#ffffff', fontWeight:'900'}}>Quantity: </Text>
            </View>
            <Text style={{color:'#ffffff', fontWeight:'900'}}>Price: </Text>
          </View>
          </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewTouchable: {
    marginTop: 12,
    marginLeft: 8,
    borderColor: '#FF6347',
    borderWidth: 1,
    borderRadius: 4,
    width: 330,
    height: 40,
    backgroundColor: '#ffe',
    flexDirection: 'row'
  },
  textTouchable: {
    color: "#FF6347",
    fontWeight: "700",
    fontSize: 17,
    fontWeight: "bold",
  },
});
