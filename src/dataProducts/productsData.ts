export interface Product {
    id: number;
    nome: string;
    preco: number;
    quantity: number;
    image: string;
}

export interface ProductsByCategory {
    [category: string]: Product[];
}

export const productsByCategory: ProductsByCategory = {
    "🍕 Pizzas": [
        { id: 1, nome: "Pizza Calabresa", preco: 10.50, quantity: 1, image: "/pizzas/calabresa.jpeg" },
        { id: 2, nome: "Pizza Frango Catupiry", preco: 15.0, quantity: 1, image: "/pizzas/frangoCatupiry.jpg" },
        { id: 3, nome: "Pizza Moda da Casa", preco: 10.0, quantity: 1, image: "/pizzas/modaDaCasa.jpg" },
        { id: 4, nome: "Pizza Feijoada", preco: 15.0, quantity: 1, image: "/pizzas/feijoada.jpg" },
        { id: 5, nome: "Pizza 4 Queijos", preco: 10.0, quantity: 1, image: "/pizzas/quatroQueijos.jpg" },
        { id: 6, nome: "Pizza Mussarela", preco: 15.0, quantity: 1, image: "/pizzas/mussarela.jpg" },
    ],
    "🍕 Pizzas Doces": [
        { id: 1, nome: "Pizza de Banana", preco: 12.0, quantity: 1, image: "" },
        { id: 2, nome: "Pizza Chocolate ao Leite", preco: 18.0, quantity: 1, image: "" },
        { id: 3, nome: "Pizza Chocobana", preco: 12.0, quantity: 1, image: "" },
        { id: 4, nome: "Pizza Dois Amores", preco: 18.0, quantity: 1, image: "" },
        { id: 5, nome: "Pizza Prestigio", preco: 12.0, quantity: 1, image: "" },
        { id: 6, nome: "Pizza Romeu e Julieta", preco: 18.0, quantity: 1, image: "" },
    ],
    "🍺 Bebidas": [
        { id: 1, nome: "Coca Cola 1l", preco: 12.0, quantity: 1, image: "" },
        { id: 2, nome: "Guaraná Antática 1l", preco: 18.0, quantity: 1, image: "" },
        { id: 3, nome: "Fanta Laranja 1l", preco: 12.0, quantity: 1, image: "" },
        { id: 4, nome: "Kuat 1l", preco: 18.0, quantity: 1, image: "" },
        { id: 5, nome: "Sprite Fresh", preco: 12.0, quantity: 1, image: "" },
        { id: 6, nome: "Fanta Uva 1l", preco: 18.0, quantity: 1, image: "" },
    ],
    "🍨 Sobremesas": [
    ],
};