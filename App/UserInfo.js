import React, {Component} from  'react';
import {View, Image} from 'react-native';

class UserInfo extends Component{
  constructor(props){
    super(props)
  }
  propTypes:{
    source : React.propTypes.string;
  }
  render(){
    return(
      <View>
        <Image source={{uri:this.props.source}}  style={{width:200, height:200}}/>
      </View>
    );
  }
}

export default UserInfo;
