
const mongoose = require('mongoose');
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
    content: "abc",

})];

//function which holds the validation. We call it inside TRY section
let validation = () => {
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

//Open connection to DB
const uri = 'mongodb://localhost/ToDo_DB';
async function run() {
    try {
        await mongoose.connect(uri); //connect to server
        console.log("Connection to DB established.");

        //delete DB (by passing an empty ducoment)
        await model.collection.deleteMany({});
        console.log("delete previuos data.")

        //validation data befor upload to DB
        validation();
        console.log("validation ends.");
        //save is used to updload only 1 item to DB
        await model.insertMany(ToDo_array);
        console.log("data uploaded.")
    }
    catch(err) {
        console.log("try failed.");
        console.log(err);
    }
    finally {
        await mongoose.connection.close(); //close the connection
        console.log("Closed");
    }    
}
//export run() so it will be used in server.js
module.exports = { run };