// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    this.currentID++
    const newUser = {
      id: this.currentID, 
      name: name
    }
    this.users[this.currentID] = newUser;
    this.follows[this.currentID] = new Set();
    return newUser.id
  }

  getUser(userID) {
    return this.users[userID] ? this.users[userID] : null
   }

  follow(userID1, userID2) {
    if(!this.getUser(userID1) || !this.getUser(userID2)) return false
    this.follows[userID1].add(userID2)
    return true
  }

  getFollows(userID) {
    if(!this.getUser(userID)) return null;
    return this.follows[userID];
  }

  getFollowers(userID) {
    const followers = new Set()
    for(let i = 1; i < this.currentID; i++){
      if(this.follows[i].has(userID)) followers.add(i)
    }

    return followers
  }

  _convertToArray(list){
    const result = [];
    list.forEach((val) => result.push(val))
    return result
  }

  getRecommendedFollows(userID, degrees) {

    let follows = this._convertToArray(this.getFollows(userID))
    const queue = [[...follows]]

    


    const recommended = [];
    const visited = new Set()

    while(queue.length > 0){
      let path = queue.shift()

      let currentNode = path[path.length - 1]
      
      if(!visited.has(currentNode)){
        visited.add(currentNode)

        if(path.length > 1 && path.length <= degrees + 1){
          if(currentNode === userID) continue
          recommended.push(currentNode)
        }

        let followers = this._convertToArray(this.getFollows(currentNode))
        for(let i = 0; i < followers.length; i++){
          let pathCopy = [...path];
          pathCopy.push(followers[i])
          queue.push(pathCopy)
        }
        


      } 

    }
  
    return recommended
  
  }
}

module.exports = SocialNetwork;