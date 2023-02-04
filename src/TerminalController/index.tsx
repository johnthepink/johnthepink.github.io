import { useReducer } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { reducer, initialState } from "./utils";

const TerminalController = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Terminal
      name="johnpinkerton.me"
      colorMode={ColorMode.Dark}
      height="100%"
      onInput={(terminalInput) => dispatch({ type: terminalInput })}
    >
      {state.lines.map((x) => (
        <TerminalOutput>{x}</TerminalOutput>
      ))}
    </Terminal>
  );
};

export default TerminalController;
