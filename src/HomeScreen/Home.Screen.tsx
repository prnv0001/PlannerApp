import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Platform } from 'react-native';
import TaskList from '../Components/TaskList';
import Toast from 'react-native-simple-toast';
import styles from './Home.Style';
import {connect} from 'react-redux';
import {addTaskRequest, getTaskRequest, updateTaskRequest, deleteTaskRequest} from './Home.Action';
import { Task } from "./Home.Model";
import {isEmpty} from 'lodash';
import { event } from 'react-native-reanimated';
// import {Action} from '../reducers';

type Props = {
    getTaskApi: typeof getTaskRequest;
    addTaskApi: typeof addTaskRequest;
    updateTaskApi: typeof updateTaskRequest;
    deleteTaskApi: typeof deleteTaskRequest;
    getTasks: Task[];
    taskSuccess: string;
}

function HomeScreen(props:Props) {  
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');
  const [taskId, setTaskId] = useState('');
  const [isEditable, setEditable] = useState(false);
//   const [taskItems, setTaskItems] = useState<Task[]>([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if(task && time) {
    props.addTaskApi({name: task, duration: time});
    setTask('');
    setTime('');
  } else {
      Toast.show('Please add all fields');
    }
  }

  const completeTask = (event, taskId) => {
    event.stopPropagation();
    setEditable(false);
    setTask('');
    setTime('');
    setTaskId('');
    props.deleteTaskApi(taskId);

  }

  const editTask = (item) => {
      setEditable(true);
      setTask(item.name);
      setTime(item.duration);
      setTaskId(item._id);
  }

  const updateTask = () => {
    if(task && time) {
        let data = {
            id: taskId,
            name: task,
            duration: time
        } ;
        props.updateTaskApi(data);
    } else {
        Toast.show('Please add all fields');
    }
  }


  useEffect(()=> {
    props.getTaskApi();
  }, [])

  useEffect(()=> {
    props.getTaskApi();
  }, [props.taskSuccess])


  console.log('Platform OS::::', props.getTasks);
  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 160 }}
        style={{flex: 1}}
        // keyboardShouldPersistTaps='handled'
      >

      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {
            !isEmpty(props.getTasks) && props.getTasks.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => editTask({...item, id: index})}>
                  <TaskList taskName={item.name} timeDuration={item.duration} removeTask={completeTask} taskId={item._id}/> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>       
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <View style={styles.taskInputContainer}>
        <TextInput style={[styles.input, { marginBottom: 5 }]} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
        <TextInput style={styles.input} keyboardType='numeric' maxLength={2} placeholder={'Time Duration in hours'} value={time} onChangeText={text => setTime(text)} />
        </View>
        {!isEditable ? 
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity> : 
        <TouchableOpacity onPress={() => updateTask()}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>✔</Text>
        </View>
      </TouchableOpacity>}
      </KeyboardAvoidingView>
      
    </View>
  );
}

const mapStateToProps = (state: any) => {
    console.log('Print state----->', state);
    return {
      getTasks: state.getHomeScreen.tasks,
      taskSuccess: state.getHomeScreen.msg
    };
  };
  
const mapDispatchToProps = (dispatch: any) => {
    return {
      addTaskApi: object => dispatch(addTaskRequest(object)),
      updateTaskApi: (object) => dispatch(updateTaskRequest(object)),
      deleteTaskApi: (taskId: string) => dispatch(deleteTaskRequest(taskId)),
      getTaskApi: () => dispatch(getTaskRequest())
    };
  };
  
export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HomeScreen);
