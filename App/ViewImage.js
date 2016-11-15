import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  Animated
} from 'react-native';
import Switcher from './Switcher';
let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;
//import viewImageHistory from  './viewImageHistory';
import BulkingModel from './../Realm/User';
var viewStr = '';
var viewGif = '';
var strRepeat = '';
var viewWeight = '';
var viewRepeat = '';
var sourceString = '';
class ViewImage extends Component {
  constructor(props) {
    super(props);
    this.state={
      viewGif: '',
      viewStr:'',
      viewRepeat:'',
      modalVisible: false,
      transparent:true,
    };
    this.setViewGif = this._setViewGif.bind(this);
  }
  propTypes:{
    source: React.propTypes.string
  }


  _RealmModel(){
    sourceString = this.props.source;
    //Borramos todos los registros
    let AllBulking = BulkingModel.objects('Bulking');
    BulkingModel.write(() => {
      BulkingModel.delete(AllBulking);
    });

    let NewBulking;
    //Creamos uno nuevo
    BulkingModel.write(() => {
      NewBulking = BulkingModel.create('Bulking', {
        id:1,
        gifString: sourceString,
        weight: '150 k',
        repeat: '30:00'
      })
    });
    //this.setState({viewGif:NewBulking.gifString});
    this.setState({viewGif:NewBulking.gifString});
    //viewGif = NewBulking.gifString;
    viewWeight = NewBulking.weight;
    //viewRepeat = NewBulking.repeat;
    this.setState({viewRepeat: NewBulking.repeat});
  }

  _setViewGif(strGif){
    //if (strGif != strRepeat){
    //  this.setState({viewGif: strGif});
    //}else{

    //}
    //strRepeat = strGif;
      //console.log('strGif  ' + strGif);
      //console.log('viewGif  ' + this.state.viewGif);

    this.setState({viewGif: strGif});
    //this.viewGif = strGif;
      //console.log('viewGif Transformado  ' + this.state.viewGif);
    //viewStr = strGif;
    //console.log('PASA SETVIEWGIF');
  }

  _setModalVisible(visible){
    this.setState({modalVisible: visible});
   }

   _returnNavigator(){
     this.props.navigator.pop();
   }

  componentWillMount(){
    this._RealmModel();
  }

  render () {
    return(
      <View style={styles.container}>
        <View style={styles.gifView}>
          <Switcher source={this.state.viewGif}/>
        </View>
        <View style={styles.detailView}>
          <View style={styles.btnStart}>
            <TouchableHighlight onPress={()=>{this._setModalVisible(true)}} style={styles.btnStartHighLight}>
                <Text style={styles.btnStartTxt}>
                  EMPEZAR
                </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.btnStart}>
            <TouchableHighlight onPress={this._returnNavigator.bind(this)} style={styles.btnStartHighLight}>
                <Text style={styles.btnStartTxt}>
                  Volver
                </Text>
            </TouchableHighlight>
          </View>
        </View>

        <Modal
          animationType='slide'
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          >
          <TouchableWithoutFeedback onPress={()=>{this._setModalVisible(!this.state.modalVisible)}}>
            <View style={styles.viewInvisible}>
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.containerModal}>
            <View style={styles.headerModal}>
              <TouchableHighlight onPress={()=>{this._setModalVisible(!this.state.modalVisible)}}>

                <Image source={require('./../img/btnExit.png')} style={styles.btnExitModal}/>

            </TouchableHighlight>
            </View>
            <View style={styles.pushUpsViewModal}>
              <Text style={styles.pushUpsTxt}>
                {this.state.viewGif}
              </Text>
            </View>
            <View style={styles.TimerViewModal}>
              <Text style={styles.TimerTxt}>
                {this.state.viewRepeat}
              </Text>
            </View>
            <View style={styles.btnStopViewModal}>
              <Text style={styles.btnStopTxt}>
                YA!
              </Text>
            </View>
            <View style={styles.fillView}/>
          </View>
        </Modal>

      </View>
    );
  }

//componentWillReceiveProps(viewGif){
//  console.log('entraWILLRECEIVEPROPS')
//  console.log('viewGif  ' +  viewGif);
//  console.log('viewStr  ' + viewStr);
//  this.setState({viewStr:viewGif});
//}

}
const styles = StyleSheet.create({
   ///////////////////
  //fito
  container:{
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#58626f',
  },
  gifView:{
    flexDirection: 'row',
    flex: .75,
    backgroundColor: '#5cbd5c',
  },
  detailView:{
    flexDirection: 'row',
    flex: .25,
    backgroundColor: '#6a6c6e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStart:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9CF00',
    marginLeft: 5,
    height: 70,
    width: 200,
  },
  btnStartHighLight:{
    flex: 1,
  },
  btnStartTxt:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontSize: 20,
    color: '#ffffff',
  },
  ////ModalExercise
  containerModal:{
    flexDirection: 'column',
    flex: .4,
    backgroundColor: '#6a6c6e',
  },
  viewInvisible:{
    flexDirection: 'row',
    flex: .6,
    backgroundColor: 'rgba(52,52,52,0)',
  },
  headerModal:{
    flexDirection: 'row',
    flex: .05,
  },
  btnExitModal:{
    height: 25,
    width: 25,
  },
  pushUpsViewModal:{
    flexDirection: 'row',
    flex: .15,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  pushUpsTxt:{
    color: '#ffffff',
    fontSize: 35,
  },
  TimerViewModal:{
    flexDirection: 'row',
    flex: .6,
    alignItems:'flex-start',
    justifyContent: 'center',
  },
  TimerTxt:{
    color: '#F9CF00',
    fontSize: 110,
  },
  btnStopViewModal:{
    flexDirection: 'row',
    flex: .15,
    backgroundColor: '#F9CF00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStopTxt:{
    color:'#ffffff',
    fontSize: 30
  },
  fillView:{
    flexDirection:'row',
    flex: .05
  },
 //fito
/////////////////////
containerTimer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rowTimer: {
    padding: 7,
    backgroundColor: 'red',
    borderRadius: 7,
  },
  tipTimer: {
    fontSize: 20,
  },
  cdTimer: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },

});
export default ViewImage
