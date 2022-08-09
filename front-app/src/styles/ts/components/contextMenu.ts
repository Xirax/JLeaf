import React from "react"
import Themes from "../themes/themes";



const verticalMenuStyle: React.CSSProperties = {
    position: 'absolute',
    width: '240px',

    display: 'flex',
    flexDirection: 'column'
}

const menuElementStyle: React.CSSProperties = {
    width: '100%',
    height: '35px',

    lineHeight: '35px',

    borderRadius: Themes.radius(),

    color: Themes.text(),
    backgroundColor: Themes.lightPrimary(),
    opacity: '0.85',

    transition: 'ease-in-out .15s',

    textAlign: 'center',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
}

const contextMenuStyle = {
    verticalMenu: verticalMenuStyle,
    menuElement:  menuElementStyle
}


export default contextMenuStyle;