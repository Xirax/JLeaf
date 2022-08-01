import React from "react"
import Themes from "../themes/themes";


const headerBarStyle: React.CSSProperties = {
    width: '98%',
    height: '90px',
    boxSizing: 'border-box',
    paddingLeft: '25px',
    paddingRight: '25px',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderBottom: '3px solid',
    borderBlockColor: Themes.lightPrimary()
}


const headerStyle = {
    headerBar: headerBarStyle
}


export default headerStyle;