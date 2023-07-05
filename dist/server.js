"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
let posts = [
    {
        id: 1,
        nome: 'Post 1',
        descricao: 'Descrição do Post 1',
        categoria: 'Categoria 1',
    },
    {
        id: 2,
        nome: 'Post 2',
        descricao: 'Descrição do Post 2',
        categoria: 'Categoria 2',
    },
];
// GET /posts
app.get('/posts', (req, res) => {
    res.json(posts);
});
// GET /posts/:id
app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find((p) => p.id === postId);
    if (!post) {
        res.status(404).json({ error: 'Post não encontrado' });
    }
    else {
        res.json(post);
    }
});
// POST /posts
app.post('/posts', (req, res) => {
    const { nome, descricao, categoria } = req.body;
    const newPost = {
        id: posts.length + 1,
        nome,
        descricao,
        categoria,
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});
// PUT /posts/:id
app.put('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { nome, descricao, categoria } = req.body;
    const postIndex = posts.findIndex((p) => p.id === postId);
    if (postIndex === -1) {
        res.status(404).json({ error: 'Post não encontrado' });
    }
    else {
        const updatedPost = {
            id: postId,
            nome,
            descricao,
            categoria,
        };
        posts[postIndex] = updatedPost;
        res.json(updatedPost);
    }
});
// DELETE /posts/:id
app.delete('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex((p) => p.id === postId);
    if (postIndex === -1) {
        res.status(404).json({ error: 'Post não encontrado' });
    }
    else {
        const deletedPost = posts.splice(postIndex, 1)[0];
        res.json(deletedPost);
    }
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
