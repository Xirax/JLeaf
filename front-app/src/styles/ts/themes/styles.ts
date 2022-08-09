import mainStyle from "../components/mainStyle"
import menuStyle from "../components/menuStyle"
import headerStyle from "../components/headerStyle"
import taskStyle from "../components/taskStyle"
import categoriesStyle from "../components/categoriesStyle"
import contextMenuStyle from "../components/contextMenu"
import editableFieldStyle from "../components/editableField"
import statisticsStyle from "../components/statisticsStyle"


export default class Styles{
    public static readonly style = {
         main: mainStyle,
         menu: menuStyle,
         header: headerStyle,
         task: taskStyle,
         category: categoriesStyle,
         contextMenu: contextMenuStyle,
         editableField: editableFieldStyle,
         statistics: statisticsStyle
    }
}