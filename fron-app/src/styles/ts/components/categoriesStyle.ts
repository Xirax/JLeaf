import React from "react"
import Themes from "../themes/themes";


const categoriesListStyle: React.CSSProperties = {
    width: '98%',
    marginTop: '24px',

    display: 'flex',
    flexDirection: 'row',
}

const categoryLabelStyle: React.CSSProperties = {
    height: '30px',

    paddingLeft: '16px',
    paddingRight: '16px',

    borderRadius: Themes.radius(),

    marginLeft: '2px',
    marginRight: '2px',

    boxSizing: 'border-box',

    lineHeight: '30px'
}

const categoriesStyle = {
    categoriesList: categoriesListStyle,
    categoryLabel: categoryLabelStyle
}


export default categoriesStyle;