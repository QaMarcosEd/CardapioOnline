export interface Product {
    id: number;
    nome: string;
    preco: number;
    quantity: number;
    image: string;
    fatias?: {
        quantidade: number;
        preco: number;
    }[];
}

export interface ProductsByCategory {
    [category: string]: Product[];
}

export const productsByCategory: ProductsByCategory = {
    "🍕 Pizzas": [
        {
            id: 1, nome: "Pizza Calabresa", preco: 35, quantity: 1, image: "/pizzas/calabresa.jpeg",
            fatias: [
                {
                    quantidade: 6,
                    preco: 35
                },
                {
                    quantidade: 8,
                    preco: 40
                },
                {
                    quantidade: 12,
                    preco: 55
                },
                {
                    quantidade: 16,
                    preco: 60
                },]
        },
        {
            id: 2, nome: "Pizza Frango Catupiry", preco: 35, quantity: 1, image: "/pizzas/frangoCatupiry.jpg",
            fatias: [
                {
                    quantidade: 6,
                    preco: 35
                },
                {
                    quantidade: 8,
                    preco: 40
                },
                {
                    quantidade: 12,
                    preco: 55
                },
                {
                    quantidade: 16,
                    preco: 60
                },]
        },
        {
            id: 3, nome: "Pizza Moda da Casa", preco: 35, quantity: 1, image: "/pizzas/modaDaCasa.jpg",
            fatias: [
                {
                    quantidade: 6,
                    preco: 35
                },
                {
                    quantidade: 8,
                    preco: 40
                },
                {
                    quantidade: 12,
                    preco: 55
                },
                {
                    quantidade: 16,
                    preco: 60
                },]
        },
        {
            id: 4, nome: "Pizza Feijoada", preco: 35, quantity: 1, image: "/pizzas/feijoada.jpg",
            fatias: [
                {
                    quantidade: 6,
                    preco: 35
                },
                {
                    quantidade: 8,
                    preco: 40
                },
                {
                    quantidade: 12,
                    preco: 55
                },
                {
                    quantidade: 16,
                    preco: 60
                },]
        },
        {
            id: 5, nome: "Pizza 4 Queijos", preco: 35, quantity: 1, image: "/pizzas/quatroQueijos.jpg",
            fatias: [
                {
                    quantidade: 6,
                    preco: 35
                },
                {
                    quantidade: 8,
                    preco: 40
                },
                {
                    quantidade: 12,
                    preco: 55
                },
                {
                    quantidade: 16,
                    preco: 60
                },]
        },
        {
            id: 6, nome: "Pizza Mussarela", preco: 35, quantity: 1, image: "/pizzas/mussarela.jpg",
            fatias: [
                {
                    quantidade: 6,
                    preco: 35
                },
                {
                    quantidade: 8,
                    preco: 40
                },
                {
                    quantidade: 12,
                    preco: 55
                },
                {
                    quantidade: 16,
                    preco: 60
                },]
        },
    ],
    "🍕 Pizzas Doces": [
        {
            id: 1, nome: "Pizza de Banana", preco: 12.0, quantity: 1, image: "/pizzasDoces/banana.jpg", fatias: [
                {
                    quantidade: 6,
                    preco: 35
                },
                {
                    quantidade: 8,
                    preco: 40
                },
                {
                    quantidade: 12,
                    preco: 55
                },
                {
                    quantidade: 16,
                    preco: 60
                },]
        },
        {
            id: 2, nome: "Pizza Chocolate ao Leite", preco: 18.0, quantity: 1, image: "/pizzasDoces/chocolateAoLeite.jpg", fatias: [
                {
                    quantidade: 6,
                    preco: 35
                },
                {
                    quantidade: 8,
                    preco: 40
                },
                {
                    quantidade: 12,
                    preco: 55
                },
                {
                    quantidade: 16,
                    preco: 60
                },]
        },
        {
            id: 3, nome: "Pizza Chocobana", preco: 12.0, quantity: 1, image: "/pizzasDoces/choconana.jpg", fatias: [
                {
                    quantidade: 6,
                    preco: 35
                },
                {
                    quantidade: 8,
                    preco: 40
                },
                {
                    quantidade: 12,
                    preco: 55
                },
                {
                    quantidade: 16,
                    preco: 60
                },]
        },
        {
            id: 4, nome: "Pizza Dois Amores", preco: 18.0, quantity: 1, image: "/pizzasDoces/doisAmores.jpg", fatias: [
                {
                    quantidade: 6,
                    preco: 35
                },
                {
                    quantidade: 8,
                    preco: 40
                },
                {
                    quantidade: 12,
                    preco: 55
                },
                {
                    quantidade: 16,
                    preco: 60
                },]
        },
        {
            id: 5, nome: "Pizza Prestigio", preco: 12.0, quantity: 1, image: "/pizzasDoces/prestigio.png", fatias: [
                {
                    quantidade: 6,
                    preco: 35
                },
                {
                    quantidade: 8,
                    preco: 40
                },
                {
                    quantidade: 12,
                    preco: 55
                },
                {
                    quantidade: 16,
                    preco: 60
                },]
        },
        {
            id: 6, nome: "Pizza Romeu e Julieta", preco: 18.0, quantity: 1, image: "/pizzasDoces/romeuEJulieta.jpg", fatias: [
                {
                    quantidade: 6,
                    preco: 35
                },
                {
                    quantidade: 8,
                    preco: 40
                },
                {
                    quantidade: 12,
                    preco: 55
                },
                {
                    quantidade: 16,
                    preco: 60
                },]
        },
    ],
    "🍺 Bebidas": [
        { id: 1, nome: "Coca Cola 1l", preco: 3.89, quantity: 1, image: "" },
        { id: 2, nome: "Guaraná Antática 1l", preco: 18.0, quantity: 1, image: "" },
        { id: 3, nome: "Fanta Laranja 1l", preco: 12.0, quantity: 1, image: "" },
        { id: 4, nome: "Kuat 1l", preco: 18.0, quantity: 1, image: "" },
        { id: 5, nome: "Sprite Fresh", preco: 12.0, quantity: 1, image: "" },
        { id: 6, nome: "Fanta Uva 1l", preco: 18.0, quantity: 1, image: "" },
    ],
    "🍨 Sobremesas": [
    ],
};