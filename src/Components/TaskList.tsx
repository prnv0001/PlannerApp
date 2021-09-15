import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';

type Props = {
  taskName?: string;
  timeDuration?: string;
  removeTask: (event: GestureResponderEvent, taskId: string) => void;
  taskId: string;
}

const TaskList = ({ taskName, timeDuration, removeTask, taskId }: Props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <View>
        <View style={{flexDirection: 'row'}}>
        <Text style={[styles.itemText, {fontWeight: 'bold'}]}>Task:</Text>
        <Text style={[styles.itemText, {marginLeft: 2}]}>{taskName}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
        <Text style={[styles.itemText, {fontWeight: 'bold'}]}>Duration:</Text>
        <Text style={[styles.itemText, {marginLeft: 2}]}>{timeDuration + ' hr'}</Text>
        </View>
        </View>
      </View>
      <TouchableOpacity onPress={(event) => removeTask(event, taskId)}>      
        <View style={styles.circular}></View>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  circular: {
    width: 20,
    height: 3,
    borderColor: '#FF0000',
    borderWidth: 1,
  },
});

export default TaskList;