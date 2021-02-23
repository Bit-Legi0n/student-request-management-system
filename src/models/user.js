import bcrypt from "bcrypt";
class User{

    constructor(id, name, type, passwordHash){
        this.id = id;
        this.name = name;
        this.type = type;
        this.passwordHash = passwordHash;
    }

    
    validPassword(passwordToTest){
        return bcrypt.compareSync(password, this.password);
    }
    
}

export default User;
