/* eslint-env node, mocha */
import assert from 'assert';
import 'isomorphic-fetch'
import ABLabs from '../../dist/index';

describe('ABLabs E2E Test', function() {
    it('should assign user and track event', ()=>{
        const ab = new ABLabs( 'a49ca12dd64415c580a28e8326287335' );
        return ab.assign('test').then(e=>{
            console.log(e);
            return ab.track('event1', 10).then(t=>console.log(t));  
        });
        
    })
});
