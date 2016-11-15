import React, {Component} from 'react';
import {Image, View,ScrollView} from 'react-native';
class viewImageHistory extends Component{

render(){
  return(
    <View>
      <ScrollView
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  centerContent={true}>
            <Image source={require('./../img/curvy-bench-press.gif')} style={{width: 250, height: 250}}/>
            <Image source={require('./../img/dumbbell-exercises.gif')} style={{width: 250, height: 250}}/>
            <Image source={require('./../img/decline-bench-press.gif')} style={{width: 250, height: 250}}/>
            <Image source={require('./../img/curvy-leg-curls.gif')} style={{width: 250, height: 250}}/>
            <Image source={require('./../img/cable-bicep-exercises.gif')} style={{width: 250, height: 250}}/>
      </ScrollView>
    </View>
    );
  }
}

export default viewImageHistory
