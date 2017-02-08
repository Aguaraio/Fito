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
import TimerMixin from 'react-timer-mixin';
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
var timerSourceString = '';
var btnStartPressed = 0;
class ViewImage extends Component {
  mixins: [TimerMixin]
  constructor(props) {
    super(props);
    this.state={
      viewGif: '',
      viewStr:'',
      viewRepeat:'',
      modalVisible: false,
      transparent:true,
      time: this.props.time ? this.props.time : '',
      disabled: false,
      btnModalTxt: "Ya!",
      btnModalColor: "#F9CF00",
      clearID: '',
    };
    this.setViewGif = this._setViewGif.bind(this);
  }
  propTypes:{
    source: React.propTypes.string,
    timerSource : React.propTypes.string
  }


   //////////////////////////////
  //MODAL countDown
  _setModalVisible(visible){
    this.setState({modalVisible: visible});
   }
   _closeModal(){
     this.setState({modalVisible: false});
     TimerMixin.clearTimeout(this.state.clearID);
     btnStartPressed = 0;
   }

   /////////////////
  //countDown
  _startCountDown(){
    if (btnStartPressed == 0) {
      btnStartPressed = 1;
      this.setState({btnModalTxt: "Ya!"});
      this.setState({btnModalColor: "#F9CF00"});
      var timer = ()=> {
        var time= this.state.time -1;
        this.setState({time: time});
        if (time > 0) {
          var innerClearid = TimerMixin.setTimeout(timer, 1000);
          this.setState({clearID:innerClearid});
        }else if (time == 0) {
          this.setState({btnModalTxt: "Otra vez?"});
          this.setState({btnModalColor: "#9e2818"});
          btnStartPressed = 0;
        } else {
          this.setState({disabled: false});
          this.setState({time: this.state.viewRepeat});
          btnStartPressed = 0;
        }
      };
      var clearid = TimerMixin.setTimeout(timer.bind(this), 1000);
      this.setState({clearID: clearid});
    }else if (btnStartPressed ==1 ) {
      this.setState({btnModalTxt: "Reanudar"});
      TimerMixin.clearTimeout(this.state.clearID);
      btnStartPressed = 0;
    }
  }

   //countDown
  ///////////////////

 //MODAL countDown
//////////////////////////

  _RealmModel(){
    sourceString = this.props.source;
    timerSourceString = this.props.timerSource;
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
        repeat: timerSourceString,
      })
    });
    //this.setState({viewGif:NewBulking.gifString});
    this.setState({viewGif:NewBulking.gifString});
    //viewGif = NewBulking.gifString;
    viewWeight = NewBulking.weight;
    //viewRepeat = NewBulking.repeat;
    this.setState({viewRepeat: NewBulking.repeat});

    this.setState({time: NewBulking.repeat});
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

   _returnNavigator(){
     this.props.navigator.pop();
   }

  componentWillMount(){
    this._RealmModel();
    btnStartPressed = 0;
  }

  render () {
    return(
      <View style={styles.container}>
        <View style={styles.gifView}>
          <Switcher source={this.state.viewGif}/>
        </View>
        <View style={styles.detailView}>

          <TouchableHighlight onPress={()=>{this._setModalVisible(true)}} style={styles.btnStartHighLight}>
              <View style={styles.btnStart}>
                <Text style={styles.btnStartTxt}>
                  EMPEZAR
                </Text>
              </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={this._returnNavigator.bind(this)} style={styles.btnStartHighLight}>
              <View style={styles.btnStart}>
                <Text style={styles.btnStartTxt}>
                  VOLVER
                </Text>
              </View>
          </TouchableHighlight>

        </View>

        <Modal
          animationType='slide'
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          >
          <TouchableWithoutFeedback onPress={this._closeModal.bind(this)}>
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
                {this.state.time}
              </Text>
            </View>
            <TouchableHighlight onPress={this._startCountDown.bind(this)} style={{height: 50, width: windowWidth}}>

              <View style={{backgroundColor:this.state.btnModalColor,
                            flexDirection: 'row',
                            flex: .15,
                            alignItems: 'center',
                            justifyContent: 'center'}}>

                <Text style={styles.btnStopTxt}>
                  {this.state.btnModalTxt}
                </Text>
              </View>
            </TouchableHighlight>

            <View style={styles.fillView}></View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9CF00',
    marginLeft: 5,
    height: 70,
    width: 160,
  },
  btnStartHighLight:{
    marginLeft: 2,
    marginRight: 2,
  },
  btnStartTxt:{
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

});
export default ViewImage
