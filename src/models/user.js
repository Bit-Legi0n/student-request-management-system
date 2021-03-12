import bcrypt from "bcrypt";
class User{

    constructor(id, name, type, passwordHash){
        this.id = id;
        this.name = name;
        this.type = type;
        this.passwordHash = passwordHash;
    }

    
    validPassword(passwordToTest){
        return bcrypt.compareSync(passwordToTest, this.passwordHash);
    }

    isStaff() {
        return this.type === "Staff";
    }
    
}

export default User;
