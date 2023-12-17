//nao consegui terminar por nao estar entendendo o erro
//quase completo sem ajuda
//socorro


///teste 117. deu certo. 3 horas pra terminar.
//achei facil(mentira).
class Pet {
    private energyMax: number;
    private hungryMax: number;
    private cleanMax: number;

    private energy: number;
    private hungry: number;
    private clean: number;

    private diamonds: number;
    private age: number;
    private alive: boolean;

    public constructor(energy: number, hungry: number, clean: number) {
        this.energyMax = energy;
        this.hungryMax = hungry;
        this.cleanMax = clean;

        this.energy = energy;
        this.hungry = hungry;
        this.clean = clean;

        this.diamonds = 0;
        this.age = 0;
        this.alive = true;
    }
    
    private testAlive(): boolean {
        if(!this.alive){
            console.log("fail: pet esta morto");
            return false;
        }
        return this.alive;
    }
    
    public setEnergy(value: number) {
        if(value <= 0){
            this.energy = 0
            console.log("fail: pet morreu de fraqueza");
            this.alive = false;
        } else if(value > this.energyMax){
            this.energy = this.energyMax;
        } else{
            this.energy = value;
        }
    }

    public setHungry(value: number) {
        if(value <= 0){
            this.hungry = 0;
            console.log("fail: pet morreu de fome");
            this.alive = false;
        } else if(value > this.hungryMax){
            this.hungry = this.hungryMax
        } else{
            this.hungry = value;
        }
    }

    public setClean(value: number) {
        if(value <= 0){
            this.clean = 0;
            this.alive = false;
            console.log("fail: pet morreu de sujeira");
        } else if(value > this.cleanMax){
            this.clean = this.cleanMax;
        } else {
            this.clean = value
        }
    }

    public toString(): string {
        return `E:${this.energy}/${this.energyMax}`
            + `, S:${this.hungry}/${this.hungryMax}`
            + `, L:${this.clean}/${this.cleanMax}`
            + `, D:${this.diamonds}, I:${this.age}`;
    }

    public play() {
        if (!this.testAlive()){
            return;
        }
        this.setEnergy(this.energy - 2);
        this.setHungry(this.hungry - 1);
        this.setClean(this.clean - 3);
        this.age += 1;
        this.diamonds += 1;
        return;
    }

    public shower() {
        if (!this.testAlive())
            return;
        this.setEnergy(this.energy - 3);
        this.setHungry(this.hungry - 1);
        this.setClean(this.cleanMax);
        this.age += 2;
    }

    public eat() {
        if (!this.testAlive())
            return;
        this.setEnergy(this.energy - 1);
        this.setHungry(this.hungry + 4);
        this.setClean(this.clean - 2);
        this.age += 1;
        
        if(this.hungry <= 0){
            this.alive = false;
            console.log("fail: pet morreu de fome");
            return
        }
    }

    public sleep() {
        if(!this.testAlive())
        return;
        
        if(this.energyMax - this.energy < 5){
            console.log("fail: nao esta com sono");
            return;
        }
        this.age += this.energyMax - this.energy;
        this.setEnergy(this.energyMax);
        this.setHungry(this.hungry - 1);
    }

    public getClean() {
        return this.clean;
    }

    public getHungry() {
        return this.hungry;
    }

    public getEnergy() {
        return this.energy;
    }

    public getDiamonds() {
        return this.diamonds;
    }

    public getAge() {
        return this.age;
    }

    public getAlive() {
        return this.alive;
    }
}


let _cin_ : string[] = [];
try { _cin_ = require("fs").readFileSync(0).toString().split(/\r?\n/); } catch(e){}
let input = () : string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);

function main() {
    let pet = new Pet(0, 0, 0);

    while (true) {
        let line = input();
        write("$" + line);
        let args = line.split(" ");

        if      (args[0] === "end")   { break;                                                            }
        else if (args[0] === "init")  { pet = new Pet(+args[1], +args[2], +args[3]); }
        else if (args[0] === "show")  { write(pet.toString());                                            }
        else if (args[0] === "play")  { pet.play();                                                       }
        else if (args[0] === "eat")   { pet.eat();                                                        }
        else if (args[0] === "sleep") { pet.sleep();                                                      }
        else if (args[0] === "shower"){ pet.shower();                                                     }
        else                          { write("fail: comando invalido");                                  }
    }
}

main();
