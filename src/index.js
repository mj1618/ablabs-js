import 'whatwg-fetch';

const url = 'http://localhost:3000';//https://ablabs.io';

const getLocal = key => {
    if (typeof(Storage) !== "undefined") {
        return localStorage[key];
    } else {
        return null;
    }
}

const setLocal = (key, value) => {
    if (typeof(Storage) !== "undefined") {
        localStorage[key] = value;
    }
}

const randomUserId = () => Math.floor(Math.pow(10,16) * Math.random());

export default class ABLabs {
    constructor(token, user=null){
        this.token = token;
        const preferredUserIds = [
            user,
            getLocal('user'),
            randomUserId()
        ];
        this.user = String(preferredUserIds.filter(u=>u!=null)[0]);
        setLocal('user', this.user);
        this.experiments = [];
    }
    assign( experimentName ) {
        const user = this.user;
        const token = this.token;
        return fetch( url + '/api/v1/assign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                experiment: experimentName, 
                user, 
                token
            })
        }).then(response=>{
            return response.json();
        }).then(json=>{
            if(json.result==='success'){
                this.experiments.push({
                    name: experimentName,
                    user,
                    token
                });
            }
            return json;
        }).catch(ex=>{
            console.log('ABLabs assign request failed', ex);
        });
    }

    track( event, amount=1 ) {
        const experiments = this.experiments.map(e=>e.name);
        const user = this.user;
        const token = this.token;

        if(!experiments){
            console.log('ABLabs: no experiments assigned to user');
            return false;
        }
        return fetch( url + '/api/v1/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                event,
                experiments,
                user,
                amount,
                token
            })
        }).then(response=>{
            return response.json();
        }).then(json=>{
            return json;
        }).catch(ex=>{
            console.log('ABLabs assign request failed', ex)
        });
    }
};