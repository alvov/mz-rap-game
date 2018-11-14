import * as React from "react";
import {Dashboard} from "./components/Dashboard";
import {SoundManager} from "./components/SoundManager/SoundManager";

export class App extends React.Component<{}> {
  componentDidMount() {
    console.log(`
{\\__/}
( • .•)
/ >🎤<

https://www.youtube.com/watch?v=kSQll4-Vk5I
    `);
  }

  render() {
    return (
      <>
        <SoundManager/>
        <Dashboard/>
      </>
    );
  }
}
