import Rive from "rive-react-native";
import { Button, StyleSheet, Text, View } from "react-native";
import { useRef } from "react";

const STATES = [
  { title: "Beginner", value: 0 },
  { title: "Intermediate", value: 1 },
  { title: "Expert", value: 2 },
];
const STATE_MACHINE_NAME = "skill-controller";
const RESOURCE_NAME = "skills_listener";

function StateButton({ state, riveRef }) {
  const onPress = () => {
    riveRef.current?.setInputState(STATE_MACHINE_NAME, "level", state.value);
  };
  return <Button title={state.title} onPress={onPress} />;
}

function RiveDemo() {
  const riveRef = useRef(null);

  return (
    <>
      <Rive
        ref={riveRef}
        autoplay={true}
        resourceName={RESOURCE_NAME}
        stateMachineName={STATE_MACHINE_NAME}
        style={{ width: 400, height: 400 }}
      />
      <View style={styles.buttons}>
        {STATES.map((state) => (
          <StateButton key={state.title} state={state} riveRef={riveRef} />
        ))}
      </View>
    </>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <RiveDemo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    flexDirection: "row",
  },
});
