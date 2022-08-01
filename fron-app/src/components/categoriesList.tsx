import React, { ReactElement } from "react";
import CategoryLabel from "./categoryLabel";

import Styles from "../styles/ts/themes/styles";

import ICategory from "../externalInterfaces/task/categoryInterface";


interface CategoriesListPorps{
    categories: ICategory[],
    onCategoryEdit: Function,
    onCategoryDelete: Function,
    onCategorySelect: Function
}

export default class CategoriesList extends React.Component<CategoriesListPorps>{

    constructor(props: CategoriesListPorps){
        super(props);
    }

    render(){
        return(
            <div style={Styles.style.category.categoriesList}> 
                {this.props.categories.map((cat) => {
                    return <CategoryLabel text={cat.name ? cat.name : "category" } color={cat.color ? cat.color : "#dc143c"} 
                                key={cat.catID} ID={cat.catID} 
                                onEdit={this.props.onCategoryEdit} onDelete={this.props.onCategoryDelete} onSelect={this.props.onCategorySelect} />
                })}     
            </div>
        )
    }
}