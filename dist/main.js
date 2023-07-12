"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_handlebars_1 = require("express-handlebars");
const client_1 = require("@prisma/client");
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.engine('handlebars', (0, express_handlebars_1.engine)());
app.set("view engine", 'handlebars');
app.set('views', __dirname + '/views');
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.post('/todo', async (req, res) => {
    const { title } = req.body;
    await prisma.todo.create({
        data: {
            title,
        }
    });
    res.redirect('/');
});
app.get('/', async (req, res) => {
    const todos = await prisma.todo.findMany();
    res.render('home', {
        title: 'Hello Server!!!',
        todos,
    });
});
app.delete('/todo/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.todo.delete({
        where: {
            id: +id
        }
    });
    res.redirect('/');
});
app.listen(3000, () => console.log("Server is running"));
