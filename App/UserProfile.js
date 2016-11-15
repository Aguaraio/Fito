import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableHighlight, Text, Dimensions, ScrollView, Slider} from 'react-native';
import realm from './../Realm/User';
import AppIOS from './AppIOS';
import Login from  './../Login';
import ViewImage from  './ViewImage';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
  LoginManager
} = FBSDK;
let result;
var value = '';
var valueStr = '';
var userPicture = '';
let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;

class UserProfile extends Component{
  constructor(props){
    super(props);
    this.state={
      dataSource: '',
      loading: true,
      userPicture: '',
      userName: '',
      userGender: '',
      userEmail: '',
      userBirthday: '',
      userID: '',
      userLocation: '',

      modalVisible: false,
    }
    //this.userPicture = '';
    //this._getUser = this._getUser.bind(this);
    this.value = '';
    //this.renderImage = this._renderImage.bind(this);
    this.getUserPic = this._getUserPic.bind(this);
  }
  propTypes:{
    source: React.propTypes.string
  }

  _setModalVisible(visible) {
   this.setState({modalVisible: true});
  }

  _getUserPic(token){
    return fetch('https://graph.facebook.com/v2.7/me?fields=id,name,gender,birthday,picture.type(large)&access_token=' +token)
      .then((response) =>response.json())
      .then((responseJson) => {

        this.setState({userPicture : responseJson.picture.data.url,
                       userName: responseJson.name,
                       userGender: responseJson.gender,
                       userEmail: responseJson.email,
                       userBirthday: responseJson.birthday,
                       userID: responseJson.id});
        console.log(this.state.userPicture);
      })
      .catch((error) => {
      console.error(error);
      });
  }

  _gotoViewImage(gifString){
    console.log(gifString);
          this.props.navigator.push({
                name: 'ViewImage',
                passProps:{
                  source: gifString,
                }
              });
  }

  componentWillMount(){
    this.setState({userPicture : 'http://www.islandairways.com/loading.jpg'});
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        const {accessToken} = data
        this.getUserPic(accessToken)
      }
    );
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.userInfoView}>
          <View style={styles.pic}>
            <Image source={{uri:this.state.userPicture}} style={styles.image}/>
          </View>

          <View style={styles.info}>
              <Text>{this.state.userName}</Text>
              <Text>{this.state.userGender}</Text>
              <Text>{this.state.userEmail}</Text>
              <Text>{this.state.userBirthday}</Text>
              <Text>{this.state.userID}</Text>
              <Text>{this.state.userLocation}</Text>
          </View>
        </View>
        <View style={styles.progView}>
          <View style={styles.lvlProg}>
            <Text style={styles.lvlText}>
              NIVEL 1
            </Text>
          </View>
        </View>
        <View style={styles.storyView}>
          <View style={styles.gifDiv}>
            <ScrollView
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        centerContent={true}>

                <View style={styles.gifCompView}>
                  <View style={styles.gifComp}>
                    <TouchableHighlight onPress={this._gotoViewImage.bind(this, 'curvy-bench-press')}>
                      <Image source={require('./../img/curvy-bench-press.gif')} style={{width: 170, height: 100}}></Image>
                    </TouchableHighlight>
                  </View>

                  <View style={styles.gifCompTitle}>
                    <Text style={styles.gifComTxt}>
                      curvy-bench-press
                    </Text>
                  </View>
                </View>

                <View style={styles.gifCompView}>
                  <View style={styles.gifComp}>
                    <TouchableHighlight onPress={this._gotoViewImage.bind(this, 'dumbbell-exercises')}>
                    <Image source={require('./../img/dumbbell-exercises.gif')} style={{width: 170, height: 100}}/>
                    </TouchableHighlight>
                  </View>

                  <View style={styles.gifCompTitle}>
                    <Text style={styles.gifComTxt}>
                      dumbbell-exercises
                    </Text>
                  </View>
                </View>

                <View style={styles.gifCompView}>
                  <View style={styles.gifComp}>
                    <TouchableHighlight onPress={this._gotoViewImage.bind(this, 'decline-bench-press')}>
                    <Image source={require('./../img/decline-bench-press.gif')} style={{width: 170, height: 100}}/>
                    </TouchableHighlight>
                  </View>

                  <View style={styles.gifCompTitle}>
                    <Text style={styles.gifComTxt}>
                      decline-bench-press
                    </Text>
                  </View>
                </View>

                <View style={styles.gifCompView}>
                  <View style={styles.gifComp}>
                    <TouchableHighlight onPress={this._gotoViewImage.bind(this, 'curvy-leg-curls')}>
                    <Image source={require('./../img/curvy-leg-curls.gif')} style={{width: 170, height: 100}}/>
                    </TouchableHighlight>
                  </View>

                  <View style={styles.gifCompTitle}>
                    <Text style={styles.gifComTxt}>
                      curvy-leg-curls
                    </Text>
                  </View>
                </View>

                <View style={styles.gifCompView}>
                  <View style={styles.gifComp}>
                    <TouchableHighlight onPress={this._gotoViewImage.bind(this, 'cable-bicep-exercises')}>
                    <Image source={require('./../img/cable-bicep-exercises.gif')} style={{width: 170, height: 100}}/>
                    </TouchableHighlight>
                  </View>

                  <View style={styles.gifCompTitle}>
                    <Text style={styles.gifComTxt}>
                      cable-bicep-exercises
                    </Text>
                  </View>
                </View>




            </ScrollView>
          </View>
        </View>
      </View>
      /*<View style={styles.containerDiv}>
        <View style={styles.profileDiv}>
          <View style={styles.userPicDiv}>
            <Image source={{uri:this.state.userPicture}} style={styles.image}/>
          </View>
          <View style={styles.userInfoDiv}>
            <Text>{this.state.userName}</Text>
            <Text>{this.state.userGender}</Text>
            <Text>{this.state.userBirthday}</Text>
            <Text>{this.state.userID}</Text>
            <Text>{this.state.userLocation}</Text>
          </View>
        </View>
        <View style={styles.achieveDiv}>
          <Slider style={styles.slider}/>
        </View>
        <View style={styles.trainersDiv}>
          <ScrollView horizontal={true}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      centerContent={true}
                      style={styles.scrollview}>
            <Image source={{uri:'https://lh5.googleusercontent.com/-m3s-M80OGS0/AAAAAAAAAAI/AAAAAAAAABc/bMGq1LPngfg/s0-c-k-no-ns/photo.jpg'}} style={styles.trainers}/>
            <Image source={{uri:this.state.userPicture}} style={styles.trainers}/>
            <Image source={{uri:'https://scontent.fasu1-1.fna.fbcdn.net/t31.0-8/12593654_10156773743430179_7113730652422510443_o.jpg'}} style={styles.trainers}/>
            <Image source={{uri:'https://scontent.fasu1-1.fna.fbcdn.net/t31.0-8/11802598_761952060597326_5500452434640159136_o.jpg'}} style={styles.trainers}/>
            <Image source={{uri:this.state.userPicture}} style={styles.trainers}/>
            <Image source={{uri:'https://www.laguiadelvaron.com/wp-content/uploads/2015/07/10963959_767263476683277_17892671_n-730x730.jpg'}} style={styles.trainers}/>
            <Image source={{uri:this.state.userPicture}} style={styles.trainers}/>
            <Image source={{uri:this.state.userPicture}} style={styles.trainers}/>
            <Image source={{uri:'https://lh5.googleusercontent.com/-m3s-M80OGS0/AAAAAAAAAAI/AAAAAAAAABc/bMGq1LPngfg/s0-c-k-no-ns/photo.jpg'}} style={styles.trainers}/>
            <Image source={{uri:this.state.userPicture}} style={styles.trainers}/>
            <Image source={{uri:'https://scontent.fasu1-1.fna.fbcdn.net/t31.0-8/12593654_10156773743430179_7113730652422510443_o.jpg'}} style={styles.trainers}/>
          </ScrollView>
        </View>
        <View style={styles.gifDiv}>
          <ScrollView
                      horizontal={true}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      centerContent={true}>
                <TouchableHighlight onPress={() =>{this.setViewGif('curvy-bench-press')}}>
                <Image source={require('./../img/curvy-bench-press.gif')} style={{width: 100, height: 100}}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={() =>{this.setViewGif('dumbbell-exercises')}}>
                <Image source={require('./../img/dumbbell-exercises.gif')} style={{width: 100, height: 100}}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={() =>{this.setViewGif('decline-bench-press')}}>
                <Image source={require('./../img/decline-bench-press.gif')} style={{width: 100, height: 100}}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={() =>{this.setViewGif('curvy-leg-curls')}}>
                <Image source={require('./../img/curvy-leg-curls.gif')} style={{width: 100, height: 100}}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={() =>{this.setViewGif('cable-bicep-exercises')}}>
                <Image source={require('./../img/cable-bicep-exercises.gif')} style={{width: 100, height: 100}}/>
                </TouchableHighlight>
          </ScrollView>
        </View>
        <Image source={require('./../img/frases-motivadoras-de-dios-para-jovenes-evangelicos.jpg')} style={styles.mot}>
          <View>
          </View>
        </Image>

      </View>*/
    );
  }

}

const styles = StyleSheet.create({
   ///////////////////////
  //Fito
  container:{
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#2ecc71',
  },
  userInfoView:{
    flexDirection: 'row',
    flex: .23,
    backgroundColor: '#ffffff',
  },
  progView:{
    flexDirection: 'row',
    flex: .07,
    backgroundColor: '#6a6c6e',

  },
  storyView:{
    flexDirection: 'column',
    flex: .7,
    backgroundColor:'#D4D8DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pic:{
    flexDirection: 'column',
    flex: .4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    width: 120,
    height: 120,
    borderRadius: 30,

  },
  info:{
    flexDirection: 'column',
    flex: .6,
    justifyContent: 'center'
  },
  lvlProg:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  lvlText:{
    color: '#ffffff',
    fontSize: 30,
  },
  gifCompView:{
    flexDirection: 'row',
    flex: 1,
    width: windowWidth * .9,
    marginTop: 10,
  },
  gifComp:{
    flex: .5
  },
  gifCompTitle:{
    flex: .5,
    backgroundColor: '#363739',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gifComTxt:{
    color: '#F9CF00',
    fontSize: 20,
  }








   //Fito
  //////////////////////


  //noviembre
  /*containerDiv:{
    flexDirection: 'column',
    backgroundColor: '#be1315',
    height: windowHeight * .882,
  },
  profileDiv:{
    flexDirection: 'row',
    backgroundColor: '#253224',
    //height: windowHeight * .2,
    flex: 0.2,
  },
  achieveDiv:{
    flexDirection: 'row',
    backgroundColor: '#bfc5f9',
    //height: windowHeight * .1,
    flex: 0.1,
  },
  trainersDiv:{
    flexDirection: 'row',
    backgroundColor: '#be5764',
    //height: windowHeight * .1,
    flex: 0.1,
  },
  gifDiv:{
    flexDirection: 'row',
    backgroundColor: '#335170',
    flex: 0.2,
  },
  userPicDiv:{
    flexDirection: 'column',
    backgroundColor: '#505a4f',
    flex: 0.5,
  },
  userInfoDiv:{
    flexDirection: 'column',
    backgroundColor: '#192319',
    flex: 0.5,
  },
  image:{
    flex: 1,
  },
  slider:{
    flex: 1,
  },
  scrollview:{
    flex: 1,
  },
  trainers:{
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  mot:{
    flex: .4,
    height: null,
    width: null,
    resizeMode: 'stretch',
  }*/

})
export default UserProfile
