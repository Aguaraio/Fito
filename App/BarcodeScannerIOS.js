import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Vibration,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  TabBarIOS
} from 'react-native';
//import {Actions} from 'react-native-router-flux';
import Camera from 'react-native-camera';
import ViewImage from './ViewImage';
import realm from './../Realm/User';
import Login from './../Login';
import Modal from './Modal';

let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;
var qrString = '';
var sendCode = false;
var isLogged = false;

class BarcodeScannerApp extends Component {

  constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      camera: {

        //aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.temp,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.portrait,
        flashMode: Camera.constants.FlashMode.off,
        barCodeType: 'org.iso.QRCode'
      },
      barcode:''
    };
  }

  propTypes:{
    source : React.propTypes.bool
  }

  barcodeReceived(e) {
    if (e.data !== qrString && e.type == this.state.camera.barCodeType && sendCode )
    {

//    Vibration.vibrate();

      this.props.navigator.push({
            name: 'ViewImage',
            passProps: {
              source:e.data,
              timerSource: '30'
            }
          });
      qrString = e.data;
  }
}

  _sendCodeIn(){
    return sendCode = true;
  }
  _sendCodeOut(){
    return sendCode = false;
  }

  _renderCamera(){
    return(
        <View style={styles.container}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={{flex:1}}
            onBarCodeRead={this.barcodeReceived.bind(this)}
            viewFinderHeight={this.state.viewFinderHeight}
            viewFinderWidth={this.state.viewFinderWidth}>

            <View style={styles.statusBar}>
              <TouchableHighlight
                underlayColor='transparent'
                onLongPress={this._sendCodeIn.bind(this)}
                onPressOut={this._sendCodeOut.bind(this)}>
                <View style={styles.btnCapture}></View>
              </TouchableHighlight>
            </View>
          </Camera>
          <Modal source={this.props.source}/>
        </View>

    );
  }

  render() {
    return (
      this._renderCamera()
    );
  }
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

  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
    marginTop: windowHeight * .4
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

    marginTop: windowHeight * .7,
    marginBottom: windowHeight * .5


  },
  btnCapture:{
    backgroundColor: '#F9CF00',
    width: 100,
    height: 100,
    borderRadius: 50
  }
  });

export default BarcodeScannerApp
