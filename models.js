
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const fs = require('fs');

const schema = new mongoose.Schema({
    //definition of the schema
    creator: { type: String, required: [true, "Please write your name name."] },
    due_date: { type: Date, min: "1990-1-1", max: new Date },
    assign_to: { type: String, required: [true, "Please write name to assign."] },
    content: {type: String, required: [true, "ToDo task is empty."]},
    done: { type: Boolean, default: false }
});


const model = mongoose.model("ToDo", schema);
const ToDo_array = [
td1 = new model({
    creator: 'Avi',
    due_date: "2021-10-01",
    assign_to: "Einat",
    content: "abc"
}),
td2 = new model({
    creator: 'Einat',
    due_date: "2021-2-01",
    assign_to: "Avi",
    content: "xyz",

})];
/*
//function which holds the validation. We call it inside TRY section
let validation = (todo) => {
    const error1 = td1.validateSync();

    let print_error = (error) => {
        if (error) {
            if (error.errors['creator'])
                console.log(error.errors['creator'].message);
            if (error.errors['due_date'])
                console.log(error.errors['due_date'].message);
            if (error.errors['assign_to'])
                console.log(error.errors['assign_to'].message);
            if (error.errors['content'])
                console.log(error.errors['content'].message);
        }};
    //print_error(error1);
}
*/

//open connection to DB
const uri = 'mongodb://localhost/ToDo_DB';

async function push_todo() {
    try {
         //connect to server
        await mongoose.connect(uri);
        console.log("Connection to DB established.");

        //delete DB (by passing an empty ducoment)
        await model.collection.deleteMany({});
        console.log("delete previuos data.")

        //insert all todos to db
        await model.insertMany(ToDo_array);
        console.log("data uploaded.");
    }
    catch(err) {
        console.log("try failed, ", err);
    }  
    finally {
        try {
            // lose the connection to db
            await mongoose.connection.close();
            console.log('connection to client DB closed.');
        }
        catch (err) {
            console.log("Failed to close connection to DB. ", err);
        }
    }
}

/*
async function export_data_to_json() {
    try {
        //open connection to DB
        await mongoose.connect(uri);
        console.log("Connection to DB established.");

        //get all documents from the collection
        const data = await model.find().lean().exec(); 

        //write the data to a json file
        fs.writeFileSync('exported_data.json', JSON.stringify(data));
        console.log('Data exported successfully to exported_data.json');
    }
    catch (error) {
        console.error('Error exporting data!!!', error);
    }
    finally {
        await mongoose.connection.close();
        console.log('connection to client DB closed.')
    }
}
*/

module.exports = {
    push_todo
};