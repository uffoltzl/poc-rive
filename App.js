import Rive from "rive-react-native";
import { Button, StyleSheet, Text, View } from "react-native";
import { useRef } from "react";

const STATES = ["VAL", "YUGE", "SCV", "GMD"];
const ARTBOARD_NAME = "";
const STATE_MACHINE_NAME = "";

function StateButton({ state, riveRef }) {
  const onPress = () => {
    STATES.forEach((currentState) => {
      if (currentState === state) {
        riveRef.current?.setInputState(STATE_MACHINE_NAME, currentState, true);
      } else {
        riveRef.current?.setInputState(STATE_MACHINE_NAME, currentState, false);
      }
    });
  };
  return <Button title={state} onPress={onPress} />;
}

function RiveDemo() {
  const riveRef = useRef(null);

  return (
    <>
      <Rive
        ref={riveRef}
        resourceName="scan-pass"
        // artboardName={ARTBOARD_NAME}
        // stateMachineName={STATE_MACHINE_NAME}
        style={{ width: 400, height: 400 }}
      />
      <View style={styles.buttons}>
        {STATES.map((state) => (
          <StateButton key={state} state={state} riveRef={riveRef} />
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
