import React, {Component} from 'react';
import {TabBarIOS, View, StyleSheet, Navigator, TouchableHighlight, Text, Dimensions, Image} from 'react-native';
import BarcodeScannerIOS from './BarcodeScannerIOS';
import ViewImage from './ViewImage';
import UserProfile from './UserProfile';
import realm from './../Realm/User';
import Login from  './../Login';
import Modal from './Modal';
import UserInfo from './UserInfo';
let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;
var showModal = false;
let result;
class TabBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'barcodeTab',
      userPicture: '',
    };
    this._selectProfile = this._selectProfile.bind(this);
    this._selectBarcode = this._selectBarcode.bind(this);
    this._selectViewImage = this._selectViewImage.bind(this);
    this._setShowModal = this._setShowModal.bind(this);
  }
  propTypes:{
    userPicture: React.propTypes.string,
  }

  _selectProfile(){
    result = realm.objects('FBUser').filtered('id=1');
    userPicture = result[0].picture;

    this.setState({
      selectedTab: 'profileTab',
    });

  }

  _validarModal(){
    let isDone  = realm.objects('User').filtered('done = true');
    if(isDone.length == 0){
      showModal = true;
    }else{
      showModal = false;
    };
  }

  _selectBarcode(){

    this.setState({
      selectedTab: 'barcodeTab',
    });
  }

  _setShowModal(){
    this.showModal = true;
  }

  _selectViewImage(){
    this.setState({
      selectedTab: 'viewTab',
    });
  }

  render(){
    return(
      <TabBarIOS
        unselectedTintColor="yellow"
        tintColor="white"
        barTintColor="#363739">

        <TabBarIOS.Item

          title="ESCANEAR"
          selected={this.state.selectedTab === 'barcodeTab'}
          onPress={this._selectBarcode.bind(this)}>
          <BarcodeScannerIOS source={this.showModal} navigator={this.props.navigator}/>
        </TabBarIOS.Item>

        <TabBarIOS.Item

          title="PERFIL"
          selected={this.state.selectedTab === 'profileTab'}
          onPress={this._selectProfile.bind(this)}>
            <UserProfile source={this.userPicture} navigator={this.props.navigator}/>
        </TabBarIOS.Item>

      </TabBarIOS>

    );

    /*return (
      <TabBarIOS
        unselectedTintColor="yellow"
        tintColor="white"
        barTintColor="#363739">

        <TabBarIOS.Item

          title="Profile"
          selected={this.state.selectedTab === 'profileTab'}
          onPress={this._selectProfile.bind(this)}>
          <View>
            <UserProfile source={this.userPicture}/>
            <View style={styles.profileFooter}>
              <View style={styles.footerSettings}>
                <TouchableHighlight>
                  <Image source={require('./../img/settingButton.png')} style={{width: windowWidth * .05, height: windowHeight * .05}}/>
                </TouchableHighlight>
              </View>
              <View style={styles.footerLogOut}>
                <Login fbButton={this._selectBarcode.bind(this)} showModal={this._setShowModal.bind(this)} />
              </View>
            </View>
          </View>
        </TabBarIOS.Item>

        <TabBarIOS.Item

          title="Barcode"
          selected={this.state.selectedTab === 'barcodeTab'}
          onPress={this._selectBarcode.bind(this)}>
          <BarcodeScannerIOS source={this.showModal}/>
        </TabBarIOS.Item>

        <TabBarIOS.Item

          title="ViewImage"
          selected={this.state.selectedTab === 'viewTab'}
          onPress={this._selectViewImage.bind(this)}>
          <ViewImage/>
        </TabBarIOS.Item>

      </TabBarIOS>
            );*/

          }

}
const styles = StyleSheet.create({
  greenTab:{
    flex: 1,
    backgroundColor: 'green'
  },
  redTab:{
    flex: 1,
    backgroundColor: 'red'
  },
  blueTab:{
    flex: 1,
    backgroundColor: 'blue'
  },
  profileFooter:{
    flexDirection: 'row',
  },
  footerSettings:{
    marginLeft: windowWidth * .1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLogOut:{
    marginLeft: windowWidth * .4
  },
})

export default TabBar
