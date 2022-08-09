import React from "react";

interface AppProps{
    testProp: string;
}


export default class App extends React.Component<AppProps>{

    render(){
        return (
            <div>
                MAIN APP: {this.props.testProp}
            </div>
        )
    }
}