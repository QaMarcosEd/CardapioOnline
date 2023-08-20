"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/dataProducts/productsData";

// Interface que define as propriedades do componente CategoryItems
interface CategoryItemsProps {
    selectedCategory: string; // Categoria selecionada
    products: Product[]; // Lista de produtos a serem renderizados
}

// Componente CategoryItems: Renderiza os produtos de uma categoria selecionada
export default function CategoryItems({ selectedCategory, products }: CategoryItemsProps) {
    // Estado para controlar o ID do produto selecionado
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    // Estado para controlar a quantidade de cada produto
    const [productQuantity, setProductQuantity] = useState<{ [productId: number]: number }>({});

    // Função para lidar com o clique em um produto
    const handleProductClick = (productId: number) => {
        // Altera o ID do produto selecionado com base no clique
        // Se já estiver selecionado, deseleciona; caso contrário, seleciona
        setSelectedProductId(productId === selectedProductId ? null : productId);

        // Reseta a quantidade do produto anterior para 1
        setProductQuantity((prevQuantity) => ({
            ...prevQuantity,
            [selectedProductId || 0]: 1,
        }));
    };

    // Função para aumentar a quantidade de um produto
    const increaseQuantity = (productId: number) => {
        // Seleciona automaticamente o produto
        setSelectedProductId(productId);

        // Incrementa a quantidade do produto, se existir; caso contrário, começa em 1
        setProductQuantity((prevQuantity) => ({
            ...prevQuantity,
            [productId]: (prevQuantity[productId] || 0) + 1,
        }));
    };

    // Função para diminuir a quantidade de um produto
    const decreaseQuantity = (productId: number) => {
        // Seleciona automaticamente o produto
        setSelectedProductId(productId);

        // Decrementa a quantidade do produto, com o mínimo de 0
        setProductQuantity((prevQuantity) => ({
            ...prevQuantity,
            [productId]: Math.max((prevQuantity[productId] || 0) - 1, 0),
        }));
    };

    // Efeito que reajusta a quantidade ao selecionar um novo produto
    useEffect(() => {
        if (selectedProductId !== null) {
            // Define a quantidade do produto para 1, caso não exista no estado
            setProductQuantity((prevQuantity) => ({
                ...prevQuantity,
                [selectedProductId]: prevQuantity[selectedProductId] || 1,
            }));
        }
    }, [selectedProductId]);

    return (
        <div className="mt-5">
            {/* Condição para renderizar produtos ou mensagem de ausência */}
            {products.length === 0 ? (
                <p>Nenhum produto disponível nesta categoria.</p>
            ) : (
                // Mapeia os produtos e renderiza cada um
                products.map((product) => {
                    // Obtém a quantidade do produto ou assume 1 como padrão
                    const quantity = productQuantity[product.id] || 1;

                    // Calcula o preço total do produto multiplicado pela quantidade
                    const totalPrice = product.preco * quantity;

                    return (
                        <div
                            key={product.id}
                            // Aplica classes de estilo condicional com base no produto selecionado
                            className={`p-4 border rounded-md shadow-md mb-4 w-full flex items-center justify-between cursor-pointer ${selectedProductId === product.id ? "bg-colorPrimary text-white" : "bg-white"
                                }`}
                            // Lidar com o clique no produto
                            onClick={() => handleProductClick(product.id)}
                        >
                            <div>
                                <h3 className="font-semibold">{product.nome}</h3>
                                <p>Preço: R$ {totalPrice.toFixed(2)}</p>
                                <p>Quantidade: {quantity}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                {/* Botões de adicionar/remover do carrinho */}
                                <button
                                    className="text-black"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        decreaseQuantity(product.id);
                                    }}
                                >
                                    -
                                </button>
                                <span>{quantity}</span>
                                <button
                                    className="text-black"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        increaseQuantity(product.id);
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

