
export default class AppNavigator{

    static goto(path: string){
        window.location.href = '/' + path;
    }
}