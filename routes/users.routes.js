import { register, login, getAllUsers } from "../controllers/users.controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

function userRouter(userServer) {
    userServer.post("/register", register),
    userServer.post("/login", login),
    userServer.get("/users", verifyToken, getAllUsers)
}

export default userRouter;