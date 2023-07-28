import  sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose()

const createConnection = () => {
    const db = new sqlite.Database("./user.db",(error) => {
        if(error){
            return console.log(error.message)
        }
    })
    console.log("Connection Established")
    return db
}