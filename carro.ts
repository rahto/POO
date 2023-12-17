class Car {
    pass: number; // Passageiros
    passMax: number; // limite de Passageiros
    gas: number; // tanque
    gasMax: number; // limite do tanque
    km: number; // quantidade de quilometragem

//serve para passar os valores acima
    constructor(pass: number, passMax: number, gas: number, gasMax: number, km: number) {
        this.pass = 0;
        this.passMax = 2;
        this.gas = 0;
        this.gasMax = 100;
        this.km = 0;
    }
    
//este codigo limita o numero de passageiros
    enter(): void {
        if (this.pass < this.passMax) {
            this.pass++;
            return this.pass;
        } 
        if(this.pass == this.passMax){
            console.log("fail: limite de pessoas atingido");
            return
        }
    }

//função: carro andar, porem não há ninguém no carro
    leave(): void {
        if (this.pass > 0) {
            this.pass--;
            return this.pass;
        }
        if(this.pass == 0){
            console.log("fail: nao ha ninguem no carro")
            return
        }
    }

//função carro dirigir e andar    
    drive(value: number):void{
        if(this.pass == 0){
            console.log("fail: nao ha ninguem no carro")
            return
        }
        if(this.gas >= value){
            this.km += value;
            this.gas -= value;
            
        }else if(this.gas > 0){
            console.log(`fail: tanque vazio apos andar ${this.gas} km`);
            this.km += this.gas
            this.gas = 0;
            return
        } else{
            console.log("fail: tanque vazio")
        }
        return
    }

//função para a quantidade de gasolina no carro
    fuel(gas: number): void | string {
        if(this.gas + gas <= this.gasMax){
            this.gas += gas
            return
        } else {
            let gasExtra = this.gas + gas - this.gasMax;
            this.gas += this.gasMax
            return;
        }
        return
    }

    toString(): string {
        return `pass: ${this.pass}, gas: ${this.gas}, km: ${this.km}`;
    }
}

let cin : string[] = [];
try { cin = require("fs").readFileSync(0).toString().split(/\r?\n/); } catch(e){}
let input = () : string => cin.length === 0 ? "" : cin.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);

function main() {
    let car = new Car();

    while (true) {
        let line = input();
        write("$" + line);
        let args = line.split(" ");

        if      (args[0] === "show")  { write(car.toString());          }
        else if (args[0] === "enter") { car.enter();                    }
        else if (args[0] === "drive") { car.drive(+args[1]);                    }
        else if (args[0] === "leave") { car.leave();                    }
        else if (args[0] === "fuel")  { car.fuel(+args[1]);             }
        else if (args[0] === "end")   { break;                          }
        else                          { write("fail: comando invalido");}
    }
}

main()
