//caixas sao array <pessoa|null>
//caixa: (pessoa|null) []
//aaaa 1 hora e pouquinho montando;


class Pessoa{
    private nome: string;
    public constructor(nome: string){
        this.nome = nome;
    }
    public toString(): string{
        return this.nome;
    }
    public getNome(): string {
        return this.nome;
    }
    public setNome(value: string){
        this.nome = value;
    }
}

class Mercantil{
    private caixas: array< Pessoa | null>
    private espera: array< Pessoa>
    
    constructor(qntCaixas: number){
        this.caixas = [];
        this.espera = [];
        
        for(let i = 0; i < qntCaixas; i++){
            this.caixas.push(null);
        }
    }
    private verificarIndice(indice: number): boolean{
         if(indice < 0 || indice >= this.caixas.length){
            console.log("fail: caixa inexistente")
            return false;
        }
    }
    
    public chamar(indice: number): boolean{
       if(this.verificarIndice(indice) == false)
       return false;
       
        if(this.espera.length === 0){
            console.log("fail: sem clientes");
            return false;
        }
        if(this.caixas[indice] !== null){
            console.log("fail: caixa ocupado");
            return false;
        }
        this.caixas[indice] = this.espera.shift()!;
        return true;
    }
    public chegar(pessoa: Pessoa){
        this.espera.push(pessoa);
    }
    
    public finalizar(indice: number): boolean{
       if(this.verificarIndice(indice) == false)
       return false;
       
        if(this.caixas[indice] === null){
            console.log("fail: caixa vazio");
            return false;
        }
        this.caixas[indice] = null;
        return true;
    }
    public toString(): string {
        const caixasString = this.caixas.map(x => (x ? x.toString() : "-----")).join(", ");
        const esperaString = this.espera.join(", ");
        return `Caixas: [${caixasString}]\nEspera: [${esperaString}]`;
}
}





let _cin_ : string[] = [];
try { _cin_ = require("fs").readFileSync(0).toString().split(/\r?\n/); } catch(e){}
let input = () : string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);

function main() {
    let merc = new Mercantil(0);

    while (true) {
        let line = input();
        let args = line.split(" ");
        write("$" + line);

        if       (args[0] == "end")    { break;                            }
        else  if (args[0] == "init")   { merc = new Mercantil(+args[1]);   }
        else  if (args[0] == "show")   { write(merc.toString());           }
        else  if (args[0] == "arrive") { merc.chegar(new Pessoa(args[1])); }
        else  if (args[0] == "call")   { merc.chamar(+args[1]);            }
        else  if (args[0] == "finish") { merc.finalizar(+args[1]);         }
        else                           { write("fail: comando invalido");  }
    }
}
main() 
