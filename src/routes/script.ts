export default class Script {
    content: string = "hello world"
    
    constructor() {
        console.log("Hello from TS const", this.content);
    }
}