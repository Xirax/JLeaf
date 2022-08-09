import IMenu from "../externalInterfaces/menuInterface";

import newDocIcon from '../imgs/icons/addDoc.png';
import openDocIcon from '../imgs/icons/docIcon.png';
import statsIcon from '../imgs/icons/docIcon.png';
import okMarkIcon from '../imgs/icons/okMark.png';

import AppNavigator from "../handlers/navigator";

export default class MenuTemplates{
    
    private static projectMenu: IMenu[] = [
        {icon: newDocIcon, action: () => { AppNavigator.goto('newProject') }},
        {icon: openDocIcon, action: () => { AppNavigator.goto('openProject') }},
        {icon: statsIcon, action: () => { AppNavigator.goto('statistics') }},
        {icon: okMarkIcon, action: () => {}},
        {icon: okMarkIcon, action: () => {}}
    ]

    public static NO_PROJECT_MENU: IMenu[] = [
        {icon: newDocIcon, action: () => { AppNavigator.goto('newProject') }},
        {icon: openDocIcon, action: () => { AppNavigator.goto('openProject') }},
    ]

    public static STATISTICS_MENU: IMenu[] = [
        {icon: newDocIcon, action: () => { AppNavigator.goto('') }}
    ]


    static createProjectMenu(taskCreateAction: Function, categoryCreateAction: Function){
        this.projectMenu[3].action = taskCreateAction;
        this.projectMenu[4].action = categoryCreateAction;
        return this.projectMenu;
    }
}