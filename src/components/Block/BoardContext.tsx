import React from "react";
import { GameControll } from "../../types";

const BoardContext = React.createContext<GameControll | null>(null);

export default BoardContext;