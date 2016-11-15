import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Button
} from 'react-native';
import realm from './../Realm/User';
const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
  AccessToken,
  LoginManager
} = FBSDK;
var userId = '';
var userName = '';
var userGender;
var userEmail;
var userBirthday;
var userPicture = '';
class FBLogin extends Component{
  constructor(props){
    super(props);
  }
  propTypes:{
    showModal : React.propTypes.func,
    onPressFBbtn: React.propTypes.func,
    //setProfile : React.propTypes.func
  }

  _onLoginFinished(dispatch){
    //LoginManager.logInWithReadPermissions(['email', 'public_profile']).then(
    LoginManager.logInWithReadPermissions(['email', 'public_profile']).then(

          function(result) {
                console.log(result)
            if (result.isCancelled) {
              //Alert.alert(null, 'Inicio de sesión cancelado');
            } else {
               ///////////////////////
              //USER IN
              realm.write(()=>{
                realm.create('User',{
                  id: 1,
                  done: true
                }, true);
              });
             //USER IN
            ///////////////////////

             ////////////////////////
            //Accesss Token
                AccessToken.getCurrentAccessToken().then((data) => {
                            if(data.accessToken){
                                const {accessToken} = data
                                //initUser(accessToken)
                                fetch('https://graph.facebook.com/v2.7/me?fields=id,name,gender,email,birthday,picture.type(large)&access_token=' + accessToken)
                                .then((response) => response.json())
                                .then((json) => {
                                  realm.write(()=>{
                                    realm.create('FBUser',{
                                      id: 1,
                                      iduser: JSON.stringify(json.id),
                                      name: JSON.stringify(json.name),
                                      gender: JSON.stringify(json.gender),
                                      picture: JSON.stringify(json.picture.data.url),
                                      email: JSON.stringify(json.email),
                                      birthday: JSON.stringify(json.birthday)
                                    }, true);
                                  });
                                })
                                .catch(() => {
                                  console.log('ERROR GETTING DATA FROM FACEBOOK');
                                  //reject('ERROR GETTING DATA FROM FACEBOOK')
                                })
                            }

                });
                  this.props.onPressFBbtn(false);
            }
          },
          function(error) {
            Alert.alert("Error");
          }
        );
  }


  render(){
    return(
      <View style={{flex: 1}}>
          <TouchableHighlight onPress={() => this._onLoginFinished(this.props.dispatch)}>
            <View style={styles.btnLoginView}>
              <Text style={styles.btnLoginText}>
                INGRESAR CON FACEBOOK
              </Text>
            </View>
          </TouchableHighlight>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  /*Button: {
      marginTop:300,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },*/
    btnLoginView:{
      backgroundColor: '#F9CF00',
      alignItems: 'center',
      justifyContent: 'center',
      width: 200,
      flex: 1,
      /*marginLeft: -10,*/
      height: 50,
    },
    btnLoginText:{
      backgroundColor: '#F9CF00',
      fontSize: 15,
    },


  });

export default FBLogin;
