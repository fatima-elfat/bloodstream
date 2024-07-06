export const ResponseWithErrorsArray = class ResponseWithErrorsArray {
    constructor() {
      this.statusCode = 500;
      this.message = [];
    }
  
    status(code) {
      this.statusCode = code;
      return this;
    }
  
    json(data) {
      this.message = data.message; 
    }
  };
  
  export const generateObjectId = number => `7899996${number}f785111`;