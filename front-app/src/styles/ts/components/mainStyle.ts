import React from "react"
import Themes from "../themes/themes";

const appStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',

    backgroundColor: Themes.primary()
}

const contentStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
}

const fullScreenInfoStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    fontSize: '42px',
    fontWeight: 'bold',

    color: Themes.text()
}

const smallIconStyle: React.CSSProperties = {
    width: '22px',
    height: '22px',
    objectFit: 'scale-down'
}

const appButtonStyle: React.CSSProperties = {
    width: '140px',
    height: '35px',

    marginRight: '2px',
    marginLeft: '2px',

    backgroundColor: Themes.lightPrimary(),
    textAlign: 'center',
    lineHeight: '35px',
    fontSize: '20px',
    color: Themes.text(),

    border: 'none',
    borderRadius: Themes.radius()
}

const mainStyle = {
    app: appStyle,
    fullScreenInfo: fullScreenInfoStyle,
    smallIcon: smallIconStyle,
    content: contentStyle,
    appButton: appButtonStyle
}


export default mainStyle;