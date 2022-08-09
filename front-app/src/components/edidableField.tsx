import React from "react";

import Styles from "../styles/ts/themes/styles";



interface EditableFieldProps{
    defaultValue: string,
    onValueChange?: Function,
    onEditionEnd?: Function,
    syncWithDefaultValue: boolean,
    styleClass?: string
}


interface EditableFieldState{
    value: string,
    editMode: boolean
}

export default class EditableField extends React.Component<EditableFieldProps, EditableFieldState>{

    constructor(props: EditableFieldProps){
        super(props);

        this.state = {
            value: this.props.defaultValue,
            editMode: false
        }

        this.enableEdit = this.enableEdit.bind(this);
        this.stopEdit = this.stopEdit.bind(this);

        document.addEventListener('keypress', (ev) => {
            if(ev.key == 'Enter')
                this.stopEdit();
        })
    }

    componentDidUpdate(){
        if(!this.state.editMode && this.state.value != this.props.defaultValue && this.props.syncWithDefaultValue)
            this.setState({ value: this.props.defaultValue })     
    }

    updateValue(ev: React.ChangeEvent<HTMLInputElement>){
        this.setState({ value: ev.target.value });
        if(this.props.onValueChange)
            this.props.onValueChange(ev.target.value);
    }

    enableEdit(ev: React.MouseEvent<HTMLDivElement, MouseEvent>){
        this.setState({ editMode: true });

        setTimeout(() => {
            let target = ev.target as HTMLInputElement;
            target.focus();
            target.select();
        }, 50);
    }

    stopEdit(){
        this.setState({ editMode: false });
        if(this.props.onEditionEnd)
            this.props.onEditionEnd(this.state.value);
    }


    render(){

        return (
            <div onDoubleClick={(ev) => this.enableEdit(ev)}>
                <input style={Styles.style.editableField.defaultInput} type="text" value={this.state.value} onChange={ (ev) => this.updateValue(ev) } disabled={!this.state.editMode} onBlur={this.stopEdit} />
            </div>
        )
    }
}