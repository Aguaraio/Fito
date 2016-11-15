import React, {Component} from 'react';
import {Image, View, Text, Dimensions,TouchableHighlight,StyleSheet,Modal} from 'react-native';
//import BulkingModel from './../Realm/Bulking';
let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height
var ReturnedStr = '';
var strGif = '';
class Switcher extends Component{
  constructor(props){
    super(props);
    this.state={modalVisible:false,
                transparent: true,
                ReturnedStr: '',
                strGif: '',
              };
    this.renderSwitcher = this._renderSwitcher.bind(this);
  }

  propTypes:{
    source: React.propTypes.string
  }

 _setModalVisible(visible){
     this.setState({modalVisible: visible});
  }

  _renderSwitcher(){

    //console.log('//////////////////////////');
    //console.log('ENTRA EN RENDERSWITCHER  ' + this.props.source);
    //console.log('//////////////////////////');
    //this.setState({ReturnedStr: ''});
    //this.setState({strGif:''});
    //this.setState({strGif:this.props.source});
    //strGif = this.props.source;
    switch (this.props.source) {
      case 'cable-bicep-exercises':
            this.setState({ReturnedStr : require('./../img/cable-bicep-exercises.gif')});
            //ReturnedStr = require('./../img/cable-bicep-exercises.gif');
        break;
      case 'curvy-bench-press':
            this.setState({ReturnedStr : require('./../img/curvy-bench-press.gif')});
            //ReturnedStr = require('./../img/curvy-bench-press.gif');
        break;
      case 'curvy-leg-curls':
          this.setState({ReturnedStr : require('./../img/curvy-leg-curls.gif')});
          //ReturnedStr = require('./../img/curvy-leg-curls.gif');
        break;
      case 'curvy-women-back-exercises':
          this.setState({ReturnedStr : require('./../img/curvy-women-back-exercises.gif')});
          //ReturnedStr = require('./../img/curvy-women-back-exercises.gif');
        break;
      case 'curvy-women-leg-exercises':
          this.setState({ReturnedStr : require('./../img/curvy-women-leg-exercises.gif')});
          //ReturnedStr = require('./../img/curvy-women-leg-exercises.gif');
        break;
        case 'decline-bench-press':
          this.setState({ReturnedStr : require('./../img/decline-bench-press.gif')});
          //ReturnedStr = require('./../img/decline-bench-press.gif');
          break;
          case 'dumbbell-exercises':
              this.setState({ReturnedStr : require('./../img/dumbbell-exercises.gif')});
              //ReturnedStr = require('./../img/dumbbell-exercises.gif');
            break;
            case 'giphy':
                this.setState({ReturnedStr : require('./../img/giphy.gif')});
                //ReturnedStr = require('./../img/giphy.gif');
              break;
      default:
          ReturnedStr = '';
    }
  }

  componentWillMount(){
    this.renderSwitcher();
  }

  render(){
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;
    var activeButtonStyle = {
      backgroundColor: '#ddd'
    };

    return(
      <View style={styles.containerView}>
        <View style={styles.redView}>
          <View style={styles.advIconView}>
            <Image source={require('./../img/alertIcon.png')} style={styles.advIconImg}/>
          </View>
          <View style={styles.advView}>
            <Text style={styles.advText}>
              Cuidado no te rompas la espalda loco.
            </Text>
          </View>
        </View>
        <View style={styles.gifView}>
          <Image source={this.state.ReturnedStr} style={{width: windowWidth-8, height: windowWidth-8}}>

          </Image>
        </View>
        <View style={styles.detailView}>
          <View style={styles.columnDetailView}>
            <Text style={styles.detailTitle}>Push-ups</Text>
            <Text style={styles.detailContent}>Este ejercicio se hace asi y asado. Es un hecho establecido hace demasiado tiempo que un lector se distraera con el contenido del texto de un sitio mientras que mira su diseño.</Text>
          </View>
        </View>


      </View>
    );
  }

  componentWillReceiveProps(){
    this.renderSwitcher();
  }
}

const styles = StyleSheet.create({
  /////////////////////
  //////fito
  containerView:{
    flexDirection: 'column',
    flex: 1,
  },
  redView:{
    flexDirection: 'row',
    flex: .05,
    height: 50,
    backgroundColor: '#e34a3e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  advIconView:{
    flexDirection: 'column',
    flex: .1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  advIconImg:{
    height: 30,
    width: 30,

  },
  advView:{
    flexDirection: 'column',
    flex: .9,
  },
  advText:{
    color: '#ffffff',
    fontSize: 15,
  },
  gifView:{
    flexDirection: 'row',
    flex: .72,
    justifyContent: 'center',
  },
  detailView:{
    flexDirection: 'row',
    flex: .20,
    backgroundColor: '#D4D8DC',
  },
  columnDetailView:{
    flexDirection: 'column',
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  detailTitle:{
    flexDirection: 'row',
    flex: .29,
    color: '#ffffff',
    fontSize: 22,
  },
  detailContent:{
    flexDirection: 'row',
    flex: .7,
    color: '#ffffff',
    fontSize: 13,
  },

  /*iButton: {
    flexDirection:'row',
    position:'relative',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
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
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },*/
});

var Button = React.createClass({
  getInitialState() {
    return {
      active: false,
    };
  },

  _onHighlight() {
    this.setState({active: true});
  },

  _onUnhighlight() {
    this.setState({active: false});
  },

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor="#a9d9d4">
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
});
export default Switcher
