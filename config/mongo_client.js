const {MongoClient} = require('mongodb');
const env = require("./environment.js");

async function main(){
    const uri = env.db_uri;

    const client = new MongoClient(uri);

    try {
        await client.connect();
        
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    } 
}
main().catch(console.error);
