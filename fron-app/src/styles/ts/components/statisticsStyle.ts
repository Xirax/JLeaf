import React from "react"
import Themes from "../themes/themes";


const statsAreaStyle: React.CSSProperties = {
    width: '98%',
    marginTop: '24px',

    display: 'flex',
    flexDirection: 'column'
}

const statFieldStyle: React.CSSProperties = {
    width: '45%',
    height: '35px',

    paddingLeft: '24px',

    lineHeight: '35px',

    backgroundColor: Themes.lightPrimary(),
    borderRadius: Themes.radius(),

    marginBottom: '8px',
    color: Themes.text()
}


const statisticsStyle = {
    statsArea: statsAreaStyle,
    statField: statFieldStyle
}


export default statisticsStyle;