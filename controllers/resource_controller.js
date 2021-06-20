const {MongoClient} = require('mongodb');
const env = require("../config/environment.js")

var all_categories = new Set();
let result;
async function main(){
    const uri = env.db_uri;

    const client = new MongoClient(uri);

    try {
        await client.connect();
        
        const cursor = await client.db("resources_db").collection("resources").find().sort({"createdTime": -1});
        result = await cursor.toArray();
        // console.log(result);
        // result.forEach(ans, i) =>{

        //     console.log(ans[i]);
        // }
        for(i in result)
        {
            var catArray = result[i].fields.Category;
            for(j in catArray)
            {
                all_categories.add(catArray[j])
            }           
            all_categories.add(result[i].fields.Tags);
            // console.log(result[i]);
        }
        // all_categories.sort((a,b)=>{return a.localeCompare(b)});
        // all_categories.forEach((values)=>{console.log(values);}) //********/
        // catArray.forEach(category, i => {
        //     console.log(category[i]);
        // });
        // console.log(catArray);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    } 
}
main().catch(console.error);



module.exports.resources = function(req, res){
    
    return res.render('resources',{
        title: "Resources | The Blockchain School" ,
        response: result,
        all_categories: all_categories
    })
}