// const sessionIdToUserMap = new Map();

// function setUser (id, user){
//     sessionIdToUserMap.set(id,user);
// }

// function getUser (id){
//      return sessionIdToUserMap.get(id);
// }


const jwt = require ("jsonwebtoken");
const secrete = "Krishna$123"

function setUser (user){
    
    return jwt.sign({
        id: user._id,
        email: user.email

    },secrete)

}


function getUser (token){
    if(!token) return null
    try {
        return jwt.verify(token,secrete);
        
    } catch (error) {
        return null
    }
}

module.exports= {
    setUser,
    getUser
}