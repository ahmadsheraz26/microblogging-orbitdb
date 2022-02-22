

const UsersModel = (db) => {
    const Register = async (id,name = "Default") => {
        if(db.get(id)) return
        const cid = await db.set(id,name)
        console.log("User Added: ", id, "CID: ",cid)
    }
    const AllUsers = async () => {
        await db.load()
        const Users = db.all
        console.log("All Users", Users)
        return Users
    }
    return {
        register: Register,
        allUsers: AllUsers
    }
}

window.Users = UsersModel