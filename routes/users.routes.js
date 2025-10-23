import { register, login, getAllUsers } from "../controllers/users.controllers.js";

function userRouter(userServer) {
    userServer.post("/register", register),
    userServer.post("/login", login),
    userServer.get("/users", getAllUsers)
}

export default userRouter;