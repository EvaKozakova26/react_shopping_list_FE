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
    let commandUri = this.getUri("api/getItems");
    console.log(dtoIn);
    return await Calls.call("post", commandUri, dtoIn);
  },

    async getAllLsits(dtoIn) {
        let commandUri = this.getUri("api/getLists");
        console.log(dtoIn);
        return await Calls.call("get", commandUri, dtoIn);
    },

  async deleteShoppingItem(dtoIn) {
        let commandUri = this.getUri("api/deleteItem");
        return await Calls.call("delete", commandUri, dtoIn);
    },

    async deleteShoppingList(dtoIn) {
        let commandUri = this.getUri("api/deleteList");
        return await Calls.call("delete", commandUri, dtoIn);
    },

    async saveShoppingList(itemList) {
        let commandUri = this.getUri("api/saveList");
        return await Calls.call("post", commandUri, itemList);
    },

  async createShoppingItem(dtoIn) {
    let commandUri = this.getUri("api/newItem");
    console.log("createShoppingItem + " + dtoIn)
    return await Calls.call("post", commandUri, dtoIn);
  },

  async updateShoppingItem(dtoIn) {
    let commandUri = this.getUri("api/checkItem");
    return await Calls.call("put", commandUri, dtoIn);
  },


    async updateShoppingList(dtoIn) {
        let commandUri = this.getUri("api/updateList");
        return await Calls.call("post", commandUri, dtoIn);
    },

  async loginUser(dtoIn, request) {
      let commandUri = this.getUri("api/loginUser");
      return await Calls.call("post", commandUri, dtoIn, request);

  },

    async registerUser(dtoIn) {
        let commandUri = this.getUri("api/register");
        return await Calls.call("post", commandUri, dtoIn);

    },
    async logoutUser() {
        let commandUri = this.getUri("api/logoutUser");
        return await Calls.call("get", commandUri);

    }
};

export default Calls;
