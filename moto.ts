//não entendo o que deu errado, mas espero que a lógica esteja certa;

class Pessoa{
    private age: number;
    private name: string;

    public constructor(name: string, age: number) {
        this.age = age;
        this.name = name;
    }

    public getAge(): number {
        return this.age;
    }

    public getName(): string {
        return this.name;
    }

    public toString(): string {
        return `${this.name}:${this.age}`;
    }
}

class Motoca {
    private potencia: number;
    private time: number;
    private pessoa: Person | null;

    constructor(potencia: number = 1) {
        this.potencia = potencia;
        this.time = 0;
        this.pessoa = null;
    }

    public moto(person: Person): boolean {
        if (!this.pessoa && person.getAge() <= 10 && this.time > 0) {
            this.pessoa = person;
            return true;
        }
        return false;
    }
    
    public remove(): Person | null {
        if (this.person) {
            const person = this.person;
            this.person = null;
            return person;
        }
        return null;
    }

    public buyTime(time: number): void {
        this.time += time;
    }

    public drive(time: number): string {
        if (this.person && this.time > 0) {
            const maxTime = Math.min(this.time, time);
            const distance = this.potencia * maxTime * 10;
            this.time -= maxTime;
            return `Dirigiu por ${maxTime} minutos e percorreu ${distance} metros.`;
        } else {
            return "Não é possível dirigir.";
        }
    }

    public honk(): string {
        const honkSound = "P" + "e".repeat(this.potencia) + "m";
        return honkSound;
    }

    public getPerson(): Person | null {
        return this.person;
    }

    public getPower(): number {
        return this.potencia;
    }

    public getTime(): number {
        return this.time;
    }

    public toString(): string {
        const personInfo = this.person ? `person:(${this.person.toString()})` : "person:(empty)";
        return `power:${this.potencia}, time:${this.time}, ${personInfo}`;
    }
}



let _cin_ : string[] = [];
try { _cin_ = require("fs").readFileSync(0).toString().split(/\r?\n/); } catch(e){}
let input = () : string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);

function main() {
    let moto = new Motoca();

    while (true) {
        let line = input();
        write("$" + line);
        let args = line.split(" ");

        if      (args[0] === "show")  { write(moto.toString());         }
        else if (args[0] === "init")  { moto = new Motoca(+args[1]);    }
        else if (args[0] === "enter") { moto.inserir(new Pessoa(args[1], +args[2])); }
        else if (args[0] === "leave") { 
            let aux = moto.remover();
            if (aux !== null) {
                write(aux);
            }
        }
        else if (args[0] === "end")   { break;                          }
        else                          { write("fail: comando invalido");}
    }
}

main()
