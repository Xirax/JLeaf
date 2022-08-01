export default class UniqueIDGenerator{

    private static ordinal: number = 1;

    static generate(letterConstant: string, precission: number){
        let idSeed = new Date(Date.now());
        let ID = letterConstant + this.ordinal + ';' + idSeed.getDate() + ';' + idSeed.getDay() + ';' + idSeed.getMonth() + ';' + idSeed.getFullYear() + ';';
        ID += idSeed.getHours() + ';' + idSeed.getMinutes() + ';' + idSeed.getSeconds() + ';' + Math.round(Math.random() * precission);

        this.ordinal++;
        
        setTimeout(() => {
            this.ordinal = 1;
        }, 2000);

        return ID;
    }
}