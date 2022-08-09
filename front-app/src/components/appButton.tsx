import React from "react";


interface ButtonProps{
    text: string,
    action: Function,
    args?: any[]
}

export default class AppButton extends React.Component<ButtonProps>{

    constructor(props: ButtonProps){
        super(props);

        this.clickAction = this.clickAction.bind(this);
    }

    clickAction(){
        if(this.props.args != undefined)
            this.props.action(...this.props.args);
        else
            this.props.action();
    }

    render(){
        return(
            <button className="app-button" onClick={this.clickAction}>
                {this.props.text}
            </button>
        )
    }
}