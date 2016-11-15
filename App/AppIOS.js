import React, {Component} from 'react';
import {View, Navigator, Text} from 'react-native';
import ViewImage from './ViewImage';
import TabBar from './TabBar';

class App extends Component{

  renderScene (route, navigator) {

      if (route.name === 'ViewImage') {
        return <ViewImage navigator={navigator} {...route.passProps}/>
      }
      if (route.name === 'TabBar') {
        return <TabBar navigator={navigator} {...route.passProps}/>
      }
    }

    configureScene (route) {
      return Navigator.SceneConfigs.VerticalDownSwipeJump
    }

    render () {
      return (
        <Navigator
          configureScene={this.configureScene.bind(this)}
          style={{ flex: 1, backgroundColor: 'white' }}
          initialRoute={{ name: 'TabBar' }}
          renderScene={this.renderScene.bind(this)} />
      );
    }
}

export default App
