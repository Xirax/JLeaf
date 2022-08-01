import React from "react";
import Menu from "../components/menu";
import Header from "../components/header";
import AppButton from "../components/appButton";
import ITask from "../externalInterfaces/taskInterface";
import ServerRequests from "../handlers/serverRequests";
import statusesList from '../templates/statusesTemplate';
import ICategory from "../externalInterfaces/task/categoryInterface";
import ContextMenu from "../components/ContextMenu";
import IContextMenuElement from "../externalInterfaces/ContextMenuElementInterface";
import IMenu from "../externalInterfaces/menuInterface";
import Styles from "../styles/ts/themes/styles";
import MenuTemplates from "../templates/menuTemplates";
import Themes from "../styles/ts/themes/themes";


interface StatisticsVState{
    tasks: ITask[],
    statistics: IStatistics,
    cateogries: ICategory[],
    menuXPos: number,
    menuYPos: number,
    categoryMenuOn: boolean,
    personMenuOn: boolean,
    gradients: number[],
    filteredCategory: ICategory | undefined
}

interface IStatistics{
    all: number,
    notStarted: number,
    working: number,
    stuck: number,
    ready: number,
}

export default class StatisticsView extends React.Component<{}, StatisticsVState>{

    constructor(props: {}){
        super(props);

        this.state = { 
            tasks: [], 
            statistics: { all: 0, notStarted: 0, working: 0, stuck: 0, ready: 0 },
            cateogries: [],
            menuXPos: 0,
            menuYPos: 0,
            categoryMenuOn: false,
            personMenuOn: false,
            gradients: [0, 0, 0, 0],
            filteredCategory: undefined
        }

        this.sortByAll = this.sortByAll.bind(this);
        this.loadData = this.loadData.bind(this);
        this.showCategoryContextMenu = this.showCategoryContextMenu.bind(this);
        this.closeCategoryContextMenu = this.closeCategoryContextMenu.bind(this);
        this.animateGradients = this.animateGradients.bind(this);
        this.resetGradients = this.resetGradients.bind(this);
        this.loadData();
    }

    async loadData(){
        let taskRes = await ServerRequests.askForTasks();
        let catRes = await ServerRequests.askForCategories();
        this.setState({ 
            tasks: taskRes.tasks as ITask[],
            cateogries: catRes.categories as ICategory[]
        })
    }

    showCategoryContextMenu(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        this.setState({ categoryMenuOn: true, menuXPos: ev.screenX - 10, menuYPos: ev.screenY - 95});
    }

    closeCategoryContextMenu(){
        this.setState({ categoryMenuOn: false });
    }

    sortByAll(){
        let statistics = this.calculateStatistics(this.state.tasks);
        this.setState({ statistics: statistics, filteredCategory: undefined });
        this.resetGradients();
        this.animateGradients();
    }

    sortByCategory(catID: string){
        let tasks = this.state.tasks.filter(t => { return t.categoryID == catID });
        let statistics = this.calculateStatistics(tasks);
        let filteredCategory = this.state.cateogries.filter(c => { return c.catID == catID})[0];
        this.setState({ statistics: statistics, filteredCategory: filteredCategory });
        this.resetGradients();
        this.animateGradients();
    }

    calculateStatistics(filteredTasks: ITask[]){
        let statistics: IStatistics = {
            all: filteredTasks.length,
            notStarted: filteredTasks.filter(t => { return t.statusIndex == 0 }).length,
            working: filteredTasks.filter(t => { return t.statusIndex == 1 }).length,
            stuck: filteredTasks.filter(t => { return t.statusIndex == 2 }).length,
            ready: filteredTasks.filter(t => { return t.statusIndex == 3 }).length
        }

        return statistics;
    }

    animateGradients(){
        setTimeout(() => {
            let gradients = this.state.gradients;
            let stats = [this.state.statistics.notStarted, this.state.statistics.working, this.state.statistics.stuck, this.state.statistics.ready];
            let actualize = false;

            for(let i=0; i<4; i++){
                let percentage = stats[i] / (this.state.statistics.all > 0 ? this.state.statistics.all : 1) * 100
                if(gradients[i] < percentage){
                    gradients[i] += 0.5;
                    actualize = true;
                }
                   
            }

            this.setState({ gradients: gradients });
            if(actualize) this.animateGradients();    

        }, 6)
    }

    resetGradients(){
        this.setState({ gradients: [0, 0, 0, 0]});
    }

    showStats(stat: number){
        let percentage = Math.round(stat / (this.state.statistics.all > 0 ? this.state.statistics.all : 1) * 1000) / 10;
        return stat + ' of ' + this.state.statistics.all + ' ( ' + percentage + '% )';
    }

    render(){ 

        let menu: IMenu[] = MenuTemplates.STATISTICS_MENU;

        let categoryMenuElements: IContextMenuElement[] = this.state.cateogries.map(c => { return {
            text: c.name,
            background: c.color,
            action: () => { this.sortByCategory(c.catID) }
        }});

        let categoryContextMeu = this.state.categoryMenuOn ? 
            <ContextMenu  elements={categoryMenuElements} closeCallback={this.closeCategoryContextMenu} positionX={this.state.menuXPos} positionY={this.state.menuYPos} /> 
            : 
            <div></div>

        let gradients = this.state.gradients.map((g, index) => {
            return 'linear-gradient(90deg, ' + statusesList[index].color + ' ' + g + '%, transparent ' + g + '%)';
        });

        let filteredCat: ICategory = this.state.filteredCategory ? this.state.filteredCategory : {catID: '-', color: Themes.lightPrimary(), name: '-'};

        return(
            <div style={Styles.style.main.app}>
                <Menu elements={menu} />
                <div style={Styles.style.main.content}>
                    <Header />
                    <div style={Styles.style.category.categoriesList}>
                        <button style={Styles.style.main.appButton} onClick={() => {this.sortByAll()}}> By All </button>
                        <button style={Styles.style.main.appButton} onClick={(ev) => {this.showCategoryContextMenu(ev)}}> By Category </button>
                        {categoryContextMeu}
                        <button style={Styles.style.main.appButton} onClick={() => {this.sortByAll()}}> By Person </button>
                        <div style={{...Styles.style.main.appButton, backgroundColor: filteredCat.color, marginLeft: '48px'}}> {filteredCat.name} </div>
                    </div>

                    <div style={Styles.style.statistics.statsArea}>
                        <div style={{...Styles.style.statistics.statField, backgroundImage: gradients[0] }}> 
                            NOT STARTED: {this.showStats(this.state.statistics.notStarted)} 
                        </div>

                        <div style={{...Styles.style.statistics.statField, backgroundImage: gradients[1] }}> 
                            WORKING ON IT: {this.showStats(this.state.statistics.working)} 
                        </div>

                        <div style={{...Styles.style.statistics.statField, backgroundImage: gradients[2] }}> 
                            STUCK: {this.showStats(this.state.statistics.stuck)}  
                        </div>

                        <div style={{...Styles.style.statistics.statField, backgroundImage: gradients[3] }}> 
                            READY: {this.showStats(this.state.statistics.ready)}
                        </div>    
                    </div>
                </div>
            </div>
        )
    }
}