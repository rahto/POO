//demorei mais que o esperado para concluir
// tive ajuda
class Sala {
    private fileira: (Client | null)[];
    private procurar(nome:string): number {
      for (let i = 0; i < this.fileira.length; i++) 
        if (this.fileira[i] != null && this.fileira[i].id == nome) 
          return i
      return -1
    }
    public constructor(capacidade: number) {
      this.fileira = []
      for(let i = 0; i < capacidade; i++) {
        this.fileira.push(null);
      }
    }
    private verificarIndice(indice: number): boolean {
      if (indice < 0 || indice > this.fileira.length) {
        console.log("fail: cadeira nao existe");
        return false
      }
      return true
    }
    public reservar(id: string, fone: string, cadeira: number): boolean {
      let cliente = new Cliente(id, fone);
      if (!this.verificarIndice(cadeira)) {
        return false
      }
      if (this.fileira[cadeira] != null) {
        console.log("fail: cadeira ja esta ocupada");
        return false
      }
      if (this.procurar(cliente.getId()) != -1) {
        console.log("fail: cliente ja esta no cinema");
        return false
      }
      this.fileira.splice(cadeira, 1, cliente);
      return true
    }
    public cancelar(id: string): boolean {
      if (this.procurar(id) == -1) {
        console.log("fail: cliente nao esta no cinema")
        return false
      }
      this.fileira.splice(id, 1, "-");
      return true
    }
    public toString(): string {
      let str = "["
      for (let i = 0; i < this.fileira.length; i++) {
        let cliente = this.fileira[i];
        str += cliente !== null ? cliente.toString() : "-"
        if (i != this.fileira.length - 1){
          str += " "
        }
      }
      str += "]"
      return str
    }
  }
  
  class Cliente {
    private fone: string;
    private id: string;
  
    public constructor(id: string, fone: string) {
      this.id = id;
      this.fone = fone;
    }
    getFone(): string {
      return this.fone
    }
    getId(): string {
      return this.id
    }
    setFone(fone: string): string {
      this.fone = fone;
    }
    setId(id: string): string {
      this.id = id;
    }
    toString(): string {
      return this.id + ":" + this.fone
    }
  }

let _cin_ : string[] = [];
try { _cin_ = require("fs").readFileSync(0).toString().split(/\r?\n/); } catch(e){}
let input = () : string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);

function main() {
    let sala = new Sala(0);

    while (true) {
        let line = input();
        let args = line.split(" ");
        write("$" + line);

        if      (args[0] == "end")      { break; }
        else if (args[0] == "init")     { sala = new Sala(+args[1]); }
        else if (args[0] == "show")     { write(sala.toString()); }
        else if (args[0] == "reservar") { sala.reservar(args[1], args[2], +args[3]); }
        else if (args[0] == "cancelar") { sala.cancelar(args[1]); }
        else                            { console.log("fail: comando invalido"); }
    }
}

main();
