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

  getRecommendedFollows(userID, degrees) {
    // Your code here
  }
}

module.exports = SocialNetwork;