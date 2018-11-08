import * as React from "react";
import { Dashboard } from "./components/Dashboard";
import { SoundManager } from "./components/SoundManager/SoundManager";
import { GAMountGame } from './analytics';

export class App extends React.Component<{}> {
    componentDidMount() {
      GAMountGame()
    }
    render() {
        return (
            <>
                <SoundManager />
                <Dashboard />
            </>
        );
    }
}
