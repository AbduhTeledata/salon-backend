import express  from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import BranchRoute from "./routes/BranchRoute.js";
import CompanyRoute from "./routes/CompanyRoute.js";
import DiscountRoute from "./routes/DiscountRoute.js";
import EmployeeRoute from "./routes/EmployeeRoute.js";
import MemberRoute from "./routes/MemberRoute.js";
import OrderRoute from "./routes/OrderRoute.js";
import OrderDetailRoute from "./routes/OrderDetailRoute.js";
import CartRoute from "./routes/CartRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import ProductSalonRoute from "./routes/ProductSalonRoute.js";
import KeranjangRoute from "./routes/KeranjangRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

//    (async() => {
//            await db.sync({force: true});
//        }) ();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:8081' //dari hosting react js/frontend ke hosting express js/backend  
}));

app.use(express.json());
app.use(AuthRoute);
app.use(BranchRoute);
app.use(CompanyRoute);
app.use(DiscountRoute);
app.use(EmployeeRoute);
app.use(MemberRoute);
app.use(UserRoute);
app.use(ProductRoute);
app.use(OrderRoute);
app.use(OrderDetailRoute);
app.use(CartRoute);
app.use(CategoryRoute);
app.use(ProductSalonRoute);
app.use(KeranjangRoute);

// store.sync(); // untuk sync table session ke database

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running');
});