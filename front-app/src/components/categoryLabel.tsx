import React from "react";
import IContextMenuElement from "../externalInterfaces/ContextMenuElementInterface";

import ContextMenu from "./ContextMenu";

import editIcon from '../imgs/icons/edit.png';
import colorIcon from '../imgs/icons/colorWheel.png';
import binIcon from '../imgs/icons/bin.png';
import ICategory from "../externalInterfaces/task/categoryInterface";

import Styles from "../styles/ts/themes/styles";
import '../styles/categories.css';

interface CategoryProps{
    ID: string,
    text: string;
    color: string;
    onEdit: Function,
    onSelect: Function,
    onDelete: Function
}

interface CategoryState{
    contextOn: boolean,
    colorsOn: boolean,
    editMode: boolean,
    mouseX: number,
    mouseY: number,
    color: string,
    text: string
}

export default class CategoryLabel extends React.Component<CategoryProps, CategoryState>{

    constructor(props: CategoryProps){
        super(props);

        this.state = {
            contextOn: false,
            colorsOn: false,
            editMode: false,
            mouseX: 0,
            mouseY: 0,
            color: this.props.color,
            text: this.props.text,
        }

        this.openCategoryMenu = this.openCategoryMenu.bind(this);
        this.closeCategoryMenu = this.closeCategoryMenu.bind(this);
        this.enableLabelEdit = this.enableLabelEdit.bind(this);
        this.editLabelText = this.editLabelText.bind(this);
        this.disbaleLabelEdit = this.disbaleLabelEdit.bind(this);
        this.deleteLabel = this.deleteLabel.bind(this);
        this.openColorMenu = this.openColorMenu.bind(this);
        this.closeColorMenu = this.closeColorMenu.bind(this);
        this.selectCategoryAsFilter = this.selectCategoryAsFilter.bind(this);
    }


    componentDidMount(){
        document.getElementById(this.props.ID)?.addEventListener('keypress', (ev) => {
            if(ev.key == 'Enter') this.disbaleLabelEdit();
        })

        document.getElementById(this.props.ID)?.addEventListener('focusout', (ev) => {
            this.disbaleLabelEdit();
        })
    }

    enableLabelEdit(){
        this.setState({ editMode: true });
        this.closeCategoryMenu();
        setTimeout(() => {
            let input = document.getElementById(this.props.ID + 'i') as HTMLInputElement;
            input.focus();
            input.select();
        }, 40)
    }

    disbaleLabelEdit(){
        this.setState({ editMode: false })
        let category: ICategory = { ID: this.props.ID, name: this.state.text }
        this.props.onEdit(category);
    }

    openCategoryMenu(ev: React.MouseEvent<HTMLSpanElement, MouseEvent>){
        ev.preventDefault();
        this.setState({ contextOn: !this.state.contextOn, mouseX: ev.screenX - 10, mouseY: ev.screenY - 95 })
    }

    closeCategoryMenu(){
        this.setState({ contextOn: false })
    }


    editLabelText(ev: React.ChangeEvent<HTMLInputElement>){
        this.setState({ text: ev.target.value })
    }


    deleteLabel(){
        this.closeCategoryMenu();
        this.props.onDelete(this.props.ID);
    }

    openColorMenu(){
        this.setState({ colorsOn: true })
    }

    closeColorMenu(){
        this.setState({ colorsOn: false })
    }

    changeLabelColor(color: string){
        this.setState({ color: color })
        this.closeColorMenu();
        let category: ICategory = { ID: this.props.ID, color: color }
        this.props.onEdit(category);
    }

    selectCategoryAsFilter(){
        this.props.onSelect(this.props.ID);
    }

    render(){
        let menuElements: IContextMenuElement[] = [
            {
                text: "Edit",
                icon: editIcon,
                action: this.enableLabelEdit
            },
            {
                text: "Change Color",
                icon: colorIcon,
                action: this.openColorMenu
            },
            {
                text: "Delete",
                icon: binIcon,
                action: this.deleteLabel
            }
        ]

        const colorList = ['#ff8c1a', '#e62e00', '#990000', '#b3003b', '#990099', '#8c1aff', '#6666ff', '#0073e6', '#4da6ff', '#00ffff', '#33ffbb', '#00cc44', '#ffff66', '#a3a375'];

        let colorElements: IContextMenuElement[] = colorList.map(c => {
            return {
                background: c,
                action: () => { this.changeLabelColor(c) }
            }
        })

        let contextMenu = this.state.contextOn ? 
            <ContextMenu elements={menuElements} positionX={this.state.mouseX} positionY={this.state.mouseY} closeCallback={this.closeCategoryMenu} /> 
            : 
            <div></div>;
        
        let colorMenu = this.state.colorsOn ? 
            <ContextMenu elements={colorElements} positionX={this.state.mouseX} positionY={this.state.mouseY} closeCallback={this.closeColorMenu} /> 
            :
            <div></div>;

        return(
            <div>
                <div id={this.props.ID} className="category" style={{...Styles.style.category.categoryLabel, backgroundColor: this.state.color}} onContextMenu={ (ev) => this.openCategoryMenu(ev)} onClick={this.selectCategoryAsFilter}> 
                    <input id={this.props.ID + 'i'} style={{...Styles.style.editableField.defaultInput, width: (this.state.text.length) + "ch"}} type="text" 
                        value={this.state.text} disabled={!this.state.editMode} onChange={(ev) => this.editLabelText(ev) } />
                </div>
                {contextMenu}
                {colorMenu}
            </div>
        )
    }
}