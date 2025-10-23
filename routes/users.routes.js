import { register, login } from "../controllers/users.controllers.js";

function userRouter(userServer) {
    userServer.post("/register", register),
    userServer.post("/login", login)
}

export default userRouter;