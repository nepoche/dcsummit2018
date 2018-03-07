import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as contract from 'truffle-contract';
import * as LegislationArtifacts from '../../../../build/contracts/Legislation.json';
import { LegislationRequest } from '../legislationRequest';

@Injectable()
export class LegislationService {

    private contract;
    private account;
    public web3;

    constructor() {
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
        this.account = this.web3.eth.accounts[0];
        this.contract = contract(LegislationArtifacts);
        this.contract.setProvider(this.web3.currentProvider);
    }

    public getAccount(): string {
        return this.account;
    }

    // public getFundingFor(cAddress: string) {

    //     let temp;

    //     return this.contract.at(cAddress)
    //       .then( instance => { temp = instance; return temp.totalFundsForInWei.call(); });
    // }

    // public getFundingAgainst(cAddress: string) {
    //     let temp;

    //     return this.contract.at(cAddress)
    //       .then( instance => { temp = instance; return temp.totalFundsAgainstInWei.call(); });
    // }

    // public getVotesFor(cAddress: string) {

    //     let temp;

    //     return this.contract.at(cAddress)
    //       .then( instance => { temp = instance; return temp.numVotesFor.call(); });
    // }

    // public getVotesAgainst(cAddress: string) {

    //     let temp;

    //     return this.contract.at(cAddress)
    //       .then( instance => { temp = instance; return temp.numVotesAgainst.call(); });
    // }

    public createContract(): Promise<LegislationRequest> {

        let legislationRequest: LegislationRequest;
    
        return this.contract
          .new({from: this.account, gas: 4712388})
          .then(instance => {
            legislationRequest.contractAddress = instance.address;
            return legislationRequest;
        });
    }

    public getContract(address: string): Promise<LegislationRequest> {
        let legRequest: LegislationRequest;

        let meta;
        return this.contract.at(address)
          .then(instance => { meta = instance; return (<string>meta.totalFundsForInWei.call()); })
          .then(funds4 => { legRequest.fundsFor = funds4.toNumber(); return meta.totalFundsAgainstInWei.call(); })
          .then(fundsNo => { legRequest.fundsAgainst = fundsNo.toNumber(); return meta.numVotesFor.call(); })
          .then(votes4 => { legRequest.votesFor = votes4.toNumber(); return meta.numVotesAgainst.call(); })
          .then(votesNo => { legRequest.votesAgainst = votesNo.toNumber(); return legRequest; })
    }

    public depositFunds(cAddress: string, weiAmount: string, userDecision: boolean) {

        let temp;

        return this.contract.at(cAddress)
          .then( instance => { temp = instance; return temp.deposit.call(userDecision, {from: this.account, value: weiAmount}); })
          .then( result => { 
              if (result) {
                  return temp.deposit(userDecision, {from: this.account, value: weiAmount});
              } else {
                  throw 'Cannot deposit funds into contract';
              }
          });
    }

}
