import UniqueIDGenerator from "../modules/uniqueIDGenerator";
import Assert from "./assert";

export default function shouldGenerateNUniqueIDS(n: number){

    Assert.setAssertionClassName("UNNIQUE ID GENERATOR");

    let ids: string[] = [];

    for(let i=0; i<n; i++)
        ids.push(UniqueIDGenerator.generate('T', 2000));
    
    Assert.setAssertionTestName("Should Generate " + n + " Unique IDS");
    Assert.allDifferent(ids);
}