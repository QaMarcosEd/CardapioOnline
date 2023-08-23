"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/dataProducts/productsData";
import Image from "next/image";

import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
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

    const handleProductClick = (productId: number) => {
        // Verifica se o produto clicado é o mesmo que já está selecionado
        if (productId === selectedProductId) {
            return; // Retorna sem fazer nada se for o mesmo produto
        }

        setSelectedProductId(productId);

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
        <div className="mt-5 flex justify-center">
            <div className="max-w-screen-lg w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.length === 0 ? (
                        <p>Nenhum produto disponível nesta categoria.</p>
                    ) : (
                        products.map((product) => {
                            const quantity = productQuantity[product.id] || 1;
                            const totalPrice = product.preco * quantity;

                            return (
                                <div
                                    key={product.id}
                                    className={`p-4 border rounded-md shadow-md flex flex-col items-center cursor-pointer ${selectedProductId === product.id ? "bg-colorPrimary text-white" : "bg-white"
                                        }`}
                                    onClick={() => handleProductClick(product.id)}
                                >
                                    <div className="h-36 w-52 relative rounded-md overflow-hidden">
                                        <Image
                                            src={product.image}
                                            alt="Imagem do produto"
                                            layout="fill"
                                            objectFit="cover"
                                            objectPosition="center"
                                        />
                                    </div>
                                    <div className="text-center mt-2">
                                        <h3 className="font-semibold">{product.nome}</h3>
                                        <p>Preço: R$ {totalPrice.toFixed(2)}</p>
                                    </div>
                                    <div className="flex flex-col items-center space-x-2 mt-2">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <button
                                                className={`${selectedProductId === product.id ? "text-white" : "text-black"
                                                    }`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    decreaseQuantity(product.id);
                                                }}
                                            >
                                                <FiMinusCircle />
                                            </button>
                                            <span>{quantity}</span>
                                            <button
                                                className={`${selectedProductId === product.id ? "text-white" : "text-black"
                                                    }`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    increaseQuantity(product.id);
                                                }}
                                            >
                                                <FiPlusCircle />
                                            </button>
                                        </div>
                                        <button
                                            className={`${selectedProductId === product.id
                                                ? "bg-white text-colorPrimary"
                                                : "bg-colorPrimary text-white"
                                                } px-2 py-1 rounded-md shadow-lg`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Adicione a lógica para adicionar ao carrinho aqui
                                            }}
                                        >
                                            Adicionar ao Carrinho
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

