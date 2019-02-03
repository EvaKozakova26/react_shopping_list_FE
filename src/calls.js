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
        "Accept": "application/json"
      },
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
    let commandUri = this.getUri("items");
    console.log(dtoIn);
    return await Calls.call("get", commandUri, dtoIn);
  },

  async deleteShoppingItem(dtoIn) {
    let commandUri = this.getUri("delete");
    return await Calls.call("delete", commandUri, dtoIn);
  },

  async createShoppingItem(dtoIn) {
    let commandUri = this.getUri("new");
    console.log("createShoppingItem + " + dtoIn)
    return await Calls.call("post", commandUri, dtoIn);
  },

  async updateShoppingItem(dtoIn) {
    let commandUri = this.getUri("check");
    return await Calls.call("put", commandUri, dtoIn);
  }
};

export default Calls;
