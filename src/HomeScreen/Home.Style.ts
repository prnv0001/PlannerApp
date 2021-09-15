import {StyleSheet} from 'react-native';
// import {fontFamily, fontSize} from '../const';
// import ApplicationStyle from '../Themes/Application.Style';
// import colors from '../Themes/Colors';

export default StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      backgroundColor: '#E8EAED'
    },
    taskInputContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    tasksWrapper: {
      paddingTop: 80,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold'
    },
    items: {
      marginTop: 30,
    },
    writeTaskWrapper: {
      position: 'absolute',
      bottom: 0,
      paddingBottom: 10,
      paddingTop: 10,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#E8EAED'
    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: '#FFF',
      borderRadius: 60,
      borderColor: '#C0C0C0',
      borderWidth: 1,
      width: 250,
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,
    },
    addText: {},
  });