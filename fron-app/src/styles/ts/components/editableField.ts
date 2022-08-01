import React from "react"
import Themes from "../themes/themes";


const defaultInputStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    color: Themes.text(),
    fontSize: '18px',
    textAlign: 'center',

    cursor: 'pointer',

    border: 'none',
    padding: '0',
    margin: '0'
}

const editableFieldStyle = {
    defaultInput: defaultInputStyle
}


export default editableFieldStyle;