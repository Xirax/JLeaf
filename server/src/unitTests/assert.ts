
export default class Assert{

    private static currentTestName: string = "";
    private static currentClassName: string = "";

    static setAssertionClassName(name: string){
        this.currentClassName = name;
    }

    static setAssertionTestName(name: string){
        this.currentTestName = name;
    }

    static equals(actual: any, expected: any){
        if(actual == expected) this.testPassed();
        else this.testFailed();
    }

    static notEquals(actual: any, notExpected: any){
        if(actual != notExpected) this.testPassed();
        else this.testFailed();
    }

    static allNotEquals(actuals: any[], notExpected: any){
        for(let i=0; i<actuals.length; i++){
            if(actuals[i] == notExpected){
                this.testFailed();
                return;
            }
        }

        this.testPassed();
    }

    static allDifferent(testedArray: any[]){
        let passed = true;
        let alreadyTested = 0;
        let allTests = Math.pow(testedArray.length, 2);

        for(let i=0; i<testedArray.length; i++){
            for(let j=i+1; j<testedArray.length; j++){
                if(i != j && testedArray[i] == testedArray[j]){
                    passed = false;
                    break;
                }
                alreadyTested++;
            }
        }

        if(passed) this.testPassed();
        else this.testFailed();
    }

    static forceFail(){
        this.testFailed();
    }

    static multiEquals(actual: any[], expected: any[]){
        let passed = true;

        for(let i=0; i<actual.length; i++){
            if(actual[i] != expected[i]) {
                passed = false;
                break;
            } 
        }

        if(passed) this.testPassed();
        else this.testFailed();
    }

    static throwsError(throwedError: Error, expectedError: string){
        if(throwedError.message.includes(expectedError)) this.testPassed();
        else this.testFailed();
    }   

    private static testFailed(){
        console.log('\n\u001b[1;31m [' + this.currentClassName + '] [FAILED] : ' + this.currentTestName);
    }

    private static testPassed(){
        console.log('\n\u001b[1;32m [' + this.currentClassName + '] [OK] : ' + this.currentTestName);
    }
}