let Calls = {
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  async call(method, url, dtoIn, headers) {
    let body;
    if(dtoIn){
      body = JSON.stringify(dtoIn);
    }

    let response = await fetch(url, {
      method: method,
      body: body,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Accept": "application/json",
      },
        credentials: 'include'
    });
    let resp = await response.json();
    return resp;
  },

  getUri: function(useCase) {
    return (
        "http://localhost:8080/" + useCase
    );
  },

  async getShoppingList(dtoIn) {
    let commandUri = this.getUri("getItems");
    console.log(dtoIn);
    return await Calls.call("post", commandUri, dtoIn);
  },

    async getAllLsits(dtoIn) {
        let commandUri = this.getUri("getLists");
        console.log(dtoIn);
        return await Calls.call("get", commandUri, dtoIn);
    },

  async deleteShoppingItem(dtoIn) {
        let commandUri = this.getUri("delete");
        return await Calls.call("delete", commandUri, dtoIn);
    },

    async deleteShoppingList(dtoIn) {
        let commandUri = this.getUri("deleteList");
        return await Calls.call("delete", commandUri, dtoIn);
    },

    async saveShoppingList(itemList) {
        let commandUri = this.getUri("saveList");
        return await Calls.call("post", commandUri, itemList);
    },

  async createShoppingItem(dtoIn) {
    let commandUri = this.getUri("new");
    console.log("createShoppingItem + " + dtoIn)
    return await Calls.call("post", commandUri, dtoIn);
  },

  async updateShoppingItem(dtoIn) {
    let commandUri = this.getUri("check");
    return await Calls.call("put", commandUri, dtoIn);
  },


    async updateShoppingList(dtoIn) {
        let commandUri = this.getUri("updateList");
        return await Calls.call("post", commandUri, dtoIn);
    },

  async loginUser(dtoIn, request) {
      let commandUri = this.getUri("loginn");
      return await Calls.call("post", commandUri, dtoIn, request);

  },

    async registerUser(dtoIn) {
        let commandUri = this.getUri("register");
        return await Calls.call("post", commandUri, dtoIn);

    },
    async logoutUser() {
        let commandUri = this.getUri("logoutt");
        return await Calls.call("post", commandUri);

    }
};

export default Calls;
