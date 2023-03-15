
export function userReducer(state = null, action) {

    switch (action.type) {
      case "LOGIN":
        return action.payload; //ต้องการค่าอะไรให้ส่งค่านั้นไป
      case "LOGOUT":
        return "2222222";
      default:
        return state
        
    }
}
