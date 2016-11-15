import React, {Component} from 'react';
import {Modal, View, Image, StyleSheet, Dimensions,Text, TouchableHighlight} from 'react-native';
import Login from './../Login';
import FBLogin from './FBLogin';
import realm from './../Realm/User';

let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;

class ModalFB extends Component{
  constructor(props){
    super(props);
    this.state={
      modalVisible: false,
      transparent:true,
    };
    this._setModalVisible = this._setModalVisible.bind(this);
    this._validarLogin = this._validarLogin.bind(this);
  }

  propTypes:{
    source: React.propTypes.bool;
  }

  _setModalVisible(visible){
      this.setState({modalVisible: visible});
   }

  _validarLogin(){
       let isDone  = realm.objects('User').filtered('done = true');
       if(isDone.length == 0){
         this._setModalVisible(true);
       }else{
         this._setModalVisible(false);
       }
   }

   componentWillMount(){
     this._validarLogin();
   }

  render(){
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var activeButtonStyle = {
      backgroundColor: '#ddd'
    };
    return(

      <Modal
        animationType='slide'
        transparent={this.state.transparent}
        visible={this.state.modalVisible}
        >
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>
              FITo
            </Text>
          </View>
          <View style={styles.loginView}>
              
                <Login onPressFB={this._setModalVisible.bind(this)}/>

            <TouchableHighlight>
              <View style={styles.btnWoLoginView}>
                <Text style={styles.btnWoLoginText}>
                  continuar sin registrarse
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.btnPrivacyView}>
            <TouchableHighlight>
              <View style={styles.btnWoLoginView}>
                <Text style={styles.btnPrivacyText}>
                  politica de privacidad
                </Text>
              </View>
            </TouchableHighlight>
          </View>

        </View>
      </Modal>
    );
  }

  componentWillReceiveProps(modalVisible){
    this._validarLogin();
    //this._setModalVisible(modalVisible);
  };


}

const styles = StyleSheet.create({
  iButton: {
    flexDirection:'row',
    position:'relative',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  container: {
    flex: 1,
    backgroundColor: '#363739',
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
  //  overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
  statusBar: {
    position:'relative',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: windowHeight * .7

  },
///////Fito section
  title:{
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowHeight * .21,
  },
  titleText:{
   color: '#F9CF00',
   fontSize: 120,
  },
  loginView:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowHeight * .02,
    height: 50,
  },
  btnLoginView:{
    backgroundColor: '#F9CF00',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    flex: 1,
  },
  btnLoginText:{
    backgroundColor: '#F9CF00',
    fontSize: 15,
  },
  btnWoLoginView:{
    top: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  btnWoLoginText:{
    color: '#717171',
    textDecorationLine: 'underline',
  },
  btnPrivacyView:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowHeight * .35,
    height: 50,
  },
  btnPrivacyText:{
    color: '#F9CF00',
    textDecorationLine: 'underline',
  }




  });

export default ModalFB
