/*
1. COMPLETO - PASSOU POR TODOS OS TESTES
2. FIZ SÓ(TIRANDO DUVIDA COM OUTROS ALUNOS)
3. TIVE QUE REVER TUDO QUE JA FOI ENSINADO
4. 150 MIN
*/

class Account {
  balance: number;
  accId: number;
  clientId: string;
  typeId: string;

  public constructor(accId: number, clientId: string, typeId: string) {
    this.balance = 0;
    this.accId = accId;
    this.clientId = clientId;
    this.typeId = typeId;
  }

  public deposit(value: number) {
    this.balance += value;
  }

  public withdraw(value: number) {
    if (this.balance - value < 0) {
      console.log("fail: saldo insuficiente");
      return
    }
    this.balance -= value;
  }

  public transfer(other: Account, value: number) {
    this.balance -= value;
    other.balance += value;
  }

  public getBalance(): number {
    return this.balance;
  }

  public getId(): number {
    return this.accId;
  }

  public getClientId(): string {
    return this.clientId;
  }

  public getTypeId(): string {
    return this.typeId;
  }

  public toString() {

  }
}

class CheckingAccount extends Account {
  monthlyFee: number;
  public constructor(accId: number, clientId: string) {
    super(accId, clientId, "CC");
    this.monthlyFee = 20;
  }

  public updateMonthly() {
    this.balance = this.balance - this.monthlyFee;
  }
}

class SavingsAccount extends Account {
  monthlyInterest: number;

  public constructor(accId: number, clientId: string) {
    super(accId, clientId, "CP");
    this.monthlyInterest = 1;
  }

  public updateMonthly() {
    this.balance = this.balance * (1 + (this.monthlyInterest / 100));
  }
}

class Client {
  private clientId: string;
  private accounts: Array<Account>;

  public constructor(clientId: string) {
    this.clientId = clientId;
    this.accounts = [];
  }

  public addAccount(acc: Account) {
    this.accounts.push(acc);
  }

  public getAccounts(): Array<Account> {
    return this.accounts;
  }

  public getClientId(): string {
    return this.clientId;
  }

  public toString(): string {
    let saida = `${this.clientId} [${this.accounts[0].getId()}, ${this.accounts[1].getId()}]`;
    return saida;
  }
}

class Agency {
  private accounts: Map<number, Account>;
  private clients: Map<string, Client>;
  public nextAccountId: number;

  public constructor() {
    this.accounts = new Map;
    this.clients = new Map;
    this.nextAccountId = 0;
  }

  public getAccount(accountId: number): Account | void {
    let acc = this.accounts.get(accountId);
    if (acc !== undefined) {
      return acc
    } else {
      console.log("fail: conta nao encontrada");
      return;
    }
  }

  public addClient(clientId: string) {
    let client = new Client(clientId);
    let ccAcc = new CheckingAccount(this.nextAccountId, clientId);
    let cpAcc = new SavingsAccount(this.nextAccountId + 1, clientId);

    client.addAccount(ccAcc);
    this.accounts.set(this.nextAccountId, ccAcc);

    client.addAccount(cpAcc);
    this.accounts.set(this.nextAccountId + 1, cpAcc);

    this.clients.set(clientId, client);

    this.nextAccountId += 2;
  }

  public deposit(accId: number, value: number) {
    let acc = this.accounts.get(accId);
    if (acc !== undefined) {
      acc.deposit(value);
    } else {
      console.log("fail: conta nao econtrada");
    }

  }

  public withdraw(accId: number, value: number) {
    let acc = this.accounts.get(accId);
    if (acc !== undefined) {
      acc.withdraw(value);
    } else {
      console.log("fail: conta nao encontrada");
    }
  }

  public transfer(fromAccId: number, toAccId: number, value: number) {
    let accFrom = this.accounts.get(fromAccId);
    let accTo = this.accounts.get(toAccId);
    if (accFrom !== undefined && accTo !== undefined) {
      accFrom.transfer(accTo, value);
    } else {
      console.log("fail: conta nao encontrada");
    }
  }

  public updateMonthly() {
    for (let a of this.accounts.entries()) {
      if (a[1].getTypeId() == "CC") {
        a[1].updateMonthly();
      } else if (a[1].getTypeId() == "CP") {
        a[1].updateMonthly();
      }
    }
  }

  public toString(): string {
    let saida = `- Clients\n`;
    for (let c of this.clients.values()) {
      saida += c.toString() + "\n";
    }
    saida += `- Accounts\n`
    for (let a of this.accounts.entries()) {
      saida += `${a[0]}:${a[1].getClientId()}:${a[1].getBalance().toFixed(2)}:${a[1].getTypeId()}\n`
    }
    return saida.trim();
  }
}

function main() {
  let chain = new Map();
  let par: string[] = [];
  let agency: Agency = new Agency();

  chain.set("addCli", () => { agency.addClient(par[1]) });
  chain.set("deposito", () => { agency.deposit(+par[1], +par[2]) });
  chain.set("saque", () => { agency.withdraw(+par[1], +par[2]) });
  chain.set("transf", () => { agency.transfer(+par[1], +par[2], +par[3]) });
  chain.set("update", () => { agency.updateMonthly() });
  chain.set("show", () => { puts(agency.toString()) });

  execute(chain, par);
}

import { readFileSync } from "fs";
let __lines = readFileSync(0).toString().split("\n");
let input = () => {
  let a = __lines.shift();
  return a === undefined ? "" : a;
};
let write = (text: any) => process.stdout.write("" + text);
let puts = (text: any) => console.log(text);

function execute(chain: Map<string, Function>, ui: string[]) {
  while (true) {
    let line = input();
    puts("$" + line);
    ui.splice(0); //apagar tudo
    line.split(" ").forEach((x: string) => ui.push(x));

    let cmd = ui[0];
    if (cmd == "end") {
      return;
    } else if (chain.has(cmd)) {
      chain.get(cmd)!();
    } else {
      puts("fail: command not found");
    }
  }
}

main()
