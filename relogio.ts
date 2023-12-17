// eu tava perdido durante a organização,
//cerca de 2 horas fazendo
//tive ajuda de colega de classe

class Time {
    private hour: number;
    private minute: number;
    private second: number;

    constructor(hour: number, minute: number, second: number) {
        this.hour = 0;
        this.setHour(hour);
        
        this.minute = 0;
        this.setMinute(minute)
        this.second = 0;
        this.setSecond(second)
    }

    setHour(hour: number): void {
        if(hour < 0 || hour > 23){
            console.log("fail: hora invalida")
            return;
        }
        this.hour = hour;
        
    }

    setMinute(minute: number): void {
        if(minute < 0 || minute > 59){
            console.log("fail: minuto invalido")
            return;
        }
        this.minute = minute;
    }

    setSecond(second: number): void {
        if(second < 0 || second > 59){
            console.log("fail: segundo invalido")
            return;
        }
        this.second = second;
    }

    getHour(): number {
         return this.hour;
         
    }

    getMinute(): number {
        return this.minute;
         
    }

    getSecond(): number {
        return this.second;
         
    }
    
    nextSecond(nextSecond: number): void{
        this.second += 1
        if(this.second == 60){
            this.second = 0; 
            this.minute++
        if(this.minute == 60){
            this.minute = 0;
            this.hour += 1;
        }
        if(this.hour == 24){
            this.hour = 0
        }
        }
        return
    }
    toString() {
        let p2 = (n: number) => ("" + n).padStart(2, "0");
        return p2(this.hour) + ":" + p2(this.minute) + ":" + p2(this.second);
    }
}

let _cin_ : string[] = [];
try { _cin_ = require("fs").readFileSync(0).toString().split(/\r?\n/); } catch(e){}
let input = () : string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);

function main() {
    let time = new Time(0, 0, 0);

    while (true) {
        let line = input();
        write("$" + line);
        let args = line.split(" ");

        if (args[0] === "show") { 
            write(time.toString());
        }
        else if (args[0] === "init") {
            time = new Time(+args[1], +args[2], +args[3]);
        }
        else if (args[0] === "set") { 
            time.setHour(+args[1]);
            time.setMinute(+args[2]);
            time.setSecond(+args[3]);
        }
        else if(args[0] === "next"){
            time.nextSecond();
        }
        
        else if (args[0] === "end")   {
            break;
        }
        else {
            write("fail: comando invalido");
        }
    }
}

main()
