import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './RootContainer.Style';
import {EmitterSubscription, Keyboard, Platform, View} from 'react-native';
import {clearNetworkFail} from '../actions';
import Toast from 'react-native-simple-toast';
import HomeScreen from "../HomeScreen/Home.Screen";



interface Props {}

interface State {
  isKeyboardShow: boolean;
  keyboardHeight: number;
  isShowNetworkErr: boolean;
}

class RootContainerScreen extends Component<Props, State> {
  keyboardDidShowListener!: EmitterSubscription;
  keyboardDidHideListener!: EmitterSubscription;

  constructor(props: Props) {
    super(props);
    this.state = {
      isKeyboardShow: false,
      keyboardHeight: 0,
      isShowNetworkErr: false,
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  static getDerivedStateFromProps(nextProps: any) {
    if (nextProps.sendNetworkFail.err) {
      switch (nextProps.sendNetworkFail.err) {
        case 'NETWORK_ERROR':
          Toast.show('No network connection, please try again');
          break;
        case 'TIMEOUT_ERROR':
          Toast.show('Timeout, please try again');
          break;
        case 'CONNECTION_ERROR':
          Toast.show('DNS server not found, please try again');
          break;
        default:
          Toast.show(nextProps.sendNetworkFail.err);
          break;
      }
      nextProps.onCallApi(clearNetworkFail());
    }
    return null;
  }

  keyboardDidShow = (e: any) => {
    this.setState({
      isKeyboardShow: true,
      keyboardHeight: e.endCoordinates.height,
    });
  };

  keyboardDidHide = () => {
    this.setState({isKeyboardShow: false});
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <HomeScreen />
        {this.state.isKeyboardShow && Platform.OS === 'ios' ? (
          <View style={{height: this.state.keyboardHeight}} />
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    sendNetworkFail: state.sendNetworkFail,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onCallApi: (object: object) => dispatch(object),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainerScreen);
