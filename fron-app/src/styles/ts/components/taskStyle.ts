import React from "react"
import Themes from "../themes/themes";


const taskBarStyle: React.CSSProperties = {
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',

    marginBottom: '3px'
}

const taskFrameStyle: React.CSSProperties = {
    width: '16.5%',
    height: '32px',

    boxSizing: 'border-box',
    border: '2px solid',
    borderColor: Themes.lightPrimary(),
    paddingLeft: '12px',
    paddingRight: '12px',

    color: 'white',

    backgroundColor: Themes.lightPrimary(),

    borderRadius: Themes.radius(),
    marginRight: '3px',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
}

const deleteButtonStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',

    backgroundColor: Themes.lightPrimary(),
    borderRadius: Themes.radius(),

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const taskListStyle: React.CSSProperties = {
    width: '98%',
    marginTop: '24px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll'
}

const descriptionPanelStyle: React.CSSProperties = {
    width: '65%',
    height: '350px',

    marginBottom: '3px',

    backgroundColor: Themes.lightPrimary(),
    borderRadius: Themes.radius(),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    zIndex: '200',
    overflow: 'hidden'
}


const taskStyle = {
    taskBar: taskBarStyle,
    taskFrame: taskFrameStyle,
    deleteButton: deleteButtonStyle,
    taskList: taskListStyle,
    descriptionPanel: descriptionPanelStyle
}


export default taskStyle;