"use client";

import React, { useEffect, useState } from "react"; // Importando o React e os Hooks de estado e efeito
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi"; // Importando ícones do pacote react-icons
import { BsMinecart } from "react-icons/bs"; // Importando ícones do pacote react-icons
import { Product } from "@/dataProducts/productsData"; // Importando a interface de Produto definida em um arquivo externo
import Image from "next/image"; // Importando o componente Image do pacote next/image
import Cart from "../../Cart"; // Importando o componente Cart definido em um arquivo externo
import { ToastContainer, toast } from "react-toastify"; // Importando componentes relacionados a notificações
import "react-toastify/dist/ReactToastify.css"; // Importando estilos para as notificações

// Interface que define as propriedades do componente CategoryItems
interface CategoryItemsProps {
    selectedCategory: string; // Propriedade para armazenar a categoria selecionada
    products: Product[]; // Propriedade para armazenar a lista de produtos a serem renderizados
}


// Componente CategoryItems: Renderiza os produtos de uma categoria selecionada
export default function CategoryItems({ selectedCategory, products }: CategoryItemsProps) {
    // Estado para controlar o ID do produto selecionado
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    // Estado para controlar a quantidade de cada produto
    const [productQuantity, setProductQuantity] = useState<{ [productId: number]: number }>({});
    // Estado para armazenar os itens do carrinho
    const [cartItems, setCartItems] = useState<Product[]>([]);
    // Estado para controlar se o modal do carrinho está aberto ou fechado
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Função para tratar o clique em um produto
    const handleProductClick = (productId: number) => {
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
        setSelectedProductId(productId);

        // Incrementa a quantidade do produto, se existir; caso contrário, começa em 1
        setProductQuantity((prevQuantity) => ({
            ...prevQuantity,
            [productId]: (prevQuantity[productId] || 0) + 1,
        }));
    };

    // Função para diminuir a quantidade de um produto
    const decreaseQuantity = (productId: number) => {
        setSelectedProductId(productId);

        // Decrementa a quantidade do produto, com o mínimo de 0
        setProductQuantity((prevQuantity) => ({
            ...prevQuantity,
            [productId]: Math.max((prevQuantity[productId] || 0) - 1, 0),
        }));
    };

    // Função para adicionar um produto ao carrinho
    const addToCart = (product: Product) => {
        setCartItems((prevItems) => [...prevItems, product]);

        // Exibe uma notificação de sucesso
        toast.success(`${product.nome} foi adicionado ao carrinho!`, {
            position: "top-right",
            autoClose: 3000, // Tempo em milissegundos (3 segundos neste caso)
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    // Função para abrir ou fechar o carrinho
    const toggleCart = () => {
        setIsCartOpen((prev) => !prev);
    };

    // Função para remover um item do carrinho
    const removeCartItem = (index: number) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
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
                                                addToCart(product);
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
            <button className="fixed bottom-5 right-5 bg-colorPrimary text-white p-4 rounded-full shadow-lg" onClick={toggleCart}>
                <BsMinecart size={23} />
            </button>
            {isCartOpen && (
                // Renderiza o componente Cart somente se isCartOpen for verdadeiro
                <Cart
                    cartItems={cartItems} // Passa a lista de itens do carrinho para o componente Cart
                    onClose={() => setIsCartOpen(false)} // Passa uma função para fechar o carrinho
                    removeItem={removeCartItem} // Passa a função para remover um item do carrinho
                />
            )}
            <ToastContainer />
        </div>
    );
}

