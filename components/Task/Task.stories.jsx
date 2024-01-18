// import { Task } from "./Task";

import { MaterialIcons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./Task.styles";

const Task = ({ task: { id, title, state }, onArchiveTask, onPinTask }) => {
  return (
    <View style={styles.listItem}>
      <TouchableOpacity onPress={() => onArchiveTask(id)}>
        {state !== "TASK_ARCHIVED" ? (
          <MaterialIcons
            name="check-box-outline-blank"
            size={24}
            color="#26c6da"
          />
        ) : (
          <MaterialIcons name="check-box" size={24} color="#26c6da" />
        )}
      </TouchableOpacity>
      <TextInput
        placeholder="Input Title"
        value={title}
        editable={false}
        style={
          state === "TASK_ARCHIVED"
            ? styles.listItemInputTaskArchived
            : styles.listItemInputTask
        }
      />
      <TouchableOpacity onPress={() => onPinTask(id)}>
        <MaterialIcons
          name="star"
          size={24}
          color={state !== "TASK_PINNED" ? "#eee" : "#26c6da"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default {
  title: "Task",
  component: Task,
  argTypes: {
    onPinTask: { action: "onPinTask" },
    onArchiveTask: { action: "onArchiveTask" },
  },
};

export const Default = {
  args: {
    task: {
      id: "1",
      title: "Test Task",
      state: "TASK_INBOX",
    },
  },
};

export const Pinned = {
  args: { task: { ...Default.args.task, state: "TASK_PINNED" } },
};

export const Archived = {
  args: { task: { ...Default.args.task, state: "TASK_ARCHIVED" } },
};
