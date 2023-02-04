import { State, Action } from "./types";
import me from "../me.jpg";

export const initialState: State = {
  lines: ["welcome!", `type "help" and press enter to get going`],
};

const Link = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a target="_blank" rel="noreferrer" href={href}>
    {children}
  </a>
);

const commands = ["help", "about", "resume", "music", "clear"];

export const reducer = (state: State, action: Action): State => {
  switch (action.type.trim()) {
    case "":
      return { lines: [...state.lines, ""] };
    case "clear":
      return { ...initialState };
    case "help":
      return {
        lines: [
          ...state.lines,
          `commands: ${commands.map((x) => `"${x}"`).join(", ")}`,
        ],
      };
    case "resume":
      return {
        lines: [
          ...state.lines,
          <>
            here ya go:{" "}
            <Link href={`${process.env.PUBLIC_URL}/resume.pdf`}>click me</Link>
          </>,
        ],
      };
    case "music":
      return {
        lines: [
          ...state.lines,
          "",
          "🥁 🎸 🎤",
          "check out some of these albums i made with my friends!",
          "",
          <>
            <Link href="https://open.spotify.com/album/3a4xhGTfQG8RRROg6JWmnS">
              Satellite State
            </Link>{" "}
            - Andy Lehman
          </>,
          <>
            <Link href="http://open.spotify.com/album/1xmeDQgLQXatnvOt8cbYOf">
              Badlands
            </Link>{" "}
            - Andy Lehman
          </>,
          <>
            <Link href="http://open.spotify.com/album/6I0pEDMs1LfEuXLrUC6po1">
              Go North
            </Link>{" "}
            - John Fahr
          </>,
          "",
        ],
      };
    case "about":
      return {
        lines: [
          ...state.lines,
          "",
          <img src={me} alt="me" width="300" />,
          "",
          `👋 my name is john pinkerton. i'm a problem solver.`,
          "",
          <>
            📬 email:{" "}
            <Link href="mailto:john.pinkerton@me.com">
              john.pinkerton@me.com
            </Link>
          </>,
          <>
            🖥 github:{" "}
            <Link href="https://github.com/johnthepink">@johnthepink</Link>
          </>,
          <>
            🐦 twitter:{" "}
            <Link href="https://twitter.com/johnthepink">@johnthepink</Link>
          </>,
          <>
            📷 instagram:{" "}
            <Link href="https://instagram.com/johnthepink">@johnthepink</Link>
          </>,
          "",
          "🎉 🎉 🎉",
          "",
        ],
      };
    default:
      return {
        lines: [
          ...state.lines,
          <span style={{ color: "red" }}>
            unrecognized command: {action.type}
          </span>,
        ],
      };
  }
};
