import React from "react"
import Themes from "../themes/themes";


const menuBarStyle: React.CSSProperties = {
    height: '100%',
    width: '88px',

    boxSizing: 'border-box',
    paddingTop: '20px',
    paddingBottom: '20px',

    backgroundColor: Themes.secondary(),
       
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
}

const menuButtonStyle: React.CSSProperties = {
    width: '64px',
    height: '64px',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: Themes.lowSpan(),

    backgroundColor: Themes.lightSecondary(),

    borderRadius: Themes.radius(),

    writingMode: 'vertical-lr',
    textOrientation: 'mixed'
}

const menuIconStyle: React.CSSProperties = {
    height: '52px',
    width: '52px',

    objectFit: 'scale-down'
}

const menuStyle = {
    menuBar: menuBarStyle,
    menuButton: menuButtonStyle,
    menuIcon: menuIconStyle
}


export default menuStyle;