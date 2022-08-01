import React from "react";

import '../styles/descriptionPanel.css';

import closeIcon from '../imgs/icons/close.png';
import EditableField from "./edidableField";
import Styles from "../styles/ts/themes/styles";

interface TDPProps{
    title: string,
    description: string,
    onTitleChange: Function,
    hide: boolean
}

interface TDPState{
    title: string,
    description: string,
    height: number
}


export default class TaskDescriptionPanel extends React.Component<TDPProps, TDPState>{

    constructor(props: TDPProps){
        super(props);

        this.state = {
            title: this.props.title,
            description: this.props.description,
            height: 0
        }

        this.revealPanel = this.revealPanel.bind(this);
        this.hidePanel();
        this.revealPanel();
    }

    componentDidUpdate(){
        if(this.props.hide)
            this.hidePanel();
    }

    revealPanel(){
        if(this.state.height < 480){
            setTimeout(() => {
                this.setState({ height: this.state.height + 14})
                this.revealPanel();
            }, 2);
        }
    }

    hidePanel(){
        if(this.state.height > 0){
             setTimeout(() => {
                 this.setState({ height: this.state.height - 14})
                 this.hidePanel();
             }, 2);
         }
    }

    updateDescription(ev: React.ChangeEvent<HTMLTextAreaElement>){
        this.setState({ description: ev.target.value });
    }

    render(){

        return (
            <div style={{...Styles.style.task.descriptionPanel, height: this.state.height + 'px'}}>
                <EditableField defaultValue={this.state.title} onValueChange={this.props.onTitleChange} syncWithDefaultValue={false} />
                <textarea className="description-area" value={this.state.description} onChange={ (ev) => this.updateDescription(ev) } />
            </div>
        )
    }
}