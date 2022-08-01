
export default class Themes{

    private static THEME_INDEX: number = 0;

    private static readonly themes = {
       primary: ['#2c2c2c'],
       primaryOpacity: ['rgb(44, 44, 44, 0.97)'],
       lightPrimary: ['#3a3a3a'],
       lightPrimaryOpacity: ['rgba(58, 58, 58, 0.97)'],
       secondary: ['#232d39'],
       lightSecondary: ['#323b46'],
       accent: ['#9fa8af'],
       text: ['#fafafa'],
       secondaryText: ['#9fa8af'],
       radius: ['4px'],
       lowSpan: ['4px']
    }

    public static setThemeIndex(index: number){
        if(index > 0 && index < this.themes.primary.length)
            this.THEME_INDEX = index;
    }

    public static primary(){ return this.themes.primary[this.THEME_INDEX]; }
    public static primaryOpacity(){ return this.themes.primaryOpacity[this.THEME_INDEX]; }
    public static lightPrimary(){ return this.themes.lightPrimary[this.THEME_INDEX]; }
    public static lightPrimaryOpacity(){ return this.themes.lightPrimaryOpacity[this.THEME_INDEX]; }
    public static secondary(){ return this.themes.secondary[this.THEME_INDEX]; }
    public static lightSecondary(){ return this.themes.lightSecondary[this.THEME_INDEX]; }
    public static accent(){ return this.themes.accent[this.THEME_INDEX]; }
    public static text(){ return this.themes.text[this.THEME_INDEX]; }
    public static secondaryText(){ return this.themes.secondaryText[this.THEME_INDEX]; }
    public static radius(){ return this.themes.radius[this.THEME_INDEX]; }
    public static lowSpan(){ return this.themes.lowSpan[this.THEME_INDEX]; }
}