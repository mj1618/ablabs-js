/* eslint-env node, mocha */
import assert from 'assert';
import ABLabs from '../../dist/index';

describe('ABLabs E2E Test', function() {
    let ab;
    it('should create ab', ()=>{
        ab = new ABLabs( 'a49ca12dd64415c580a28e8326287335' );
    });

    it('should assign user', ()=>{
        return ab.assign('test').then(e=>{
            console.log(e);
        });
    });

    it('should track event', ()=>{
        return ab.track('event1', 10).then(t=>console.log(t));
    });
});
