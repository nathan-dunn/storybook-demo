import { Task } from "../Task";
import { FlatList, Text, View } from "react-native";
import { LoadingRow } from "./LoadingRow";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./TaskList.styles";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { updateTaskState } from "../../store";

export const TaskList = () => {
  // use createSelector to memoize the result of the selector
  const taskSelector = createSelector(
    (state) => state.taskbox.tasks,
    (tasks) =>
      tasks.filter((t) => t.state === "TASK_INBOX" || t.state === "TASK_PINNED")
  );

  // We're retrieving our state from the store
  const tasks = useSelector(taskSelector);

  const { status } = useSelector(taskSelector);

  const dispatch = useDispatch();

  const pinTask = (value) => {
    // We're dispatching the Pinned event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_PINNED" }));
  };

  const archiveTask = (value) => {
    // We're dispatching the Archive event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_ARCHIVED" }));
  };

  if (status === "loading") {
    return (
      <View style={[styles.listItems, { justifyContent: "center" }]}>
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
      </View>
    );
  }

  if (tasks.length === 0) {
    return (
      <View style={styles.listItems}>
        <View style={styles.wrapperMessage}>
          <MaterialIcons name="check" size={64} color={"#2cc5d2"} />
          <Text style={styles.titleMessage}>You have no tasks</Text>
          <Text style={styles.subtitleMessage}>Sit back and relax</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.listItems}>
      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id}
        renderItem={({ item }) => (
          <Task
            key={item.id}
            task={item}
            onPinTask={(task) => pinTask(task)}
            onArchiveTask={(task) => archiveTask(task)}
          />
        )}
      />
    </View>
  );
};
