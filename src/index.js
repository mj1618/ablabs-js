import request from 'superagent-bluebird-promise';

const url = 'https://ablabs.io';

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
        return request
            .post( url + '/api/v1/assign')
            .send({ 
                experiment: experimentName, 
                user, 
                token
            }) // sends a JSON post body
            .set('Content-Type', 'application/json')
            .then(response=>{
                return response.body;
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
        return request
            .post(url + '/api/v1/track')
            .send({ 
                event,
                experiments,
                user,
                amount,
                token
            }) // sends a JSON post body
            .set('Content-Type', 'application/json')
            .then(response=>{
                return response.body;
            }).catch(ex=>{
                console.log('ABLabs assign request failed', ex)
            });
    }
};