"use client";

import React, { useEffect, useState } from "react"; // Importando o React e os Hooks de estado e efeito
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi"; // Importando ícones do pacote react-icons
import { BsMinecart } from "react-icons/bs"; // Importando ícones do pacote react-icons
import { Product, productsByCategory } from "@/dataProducts/productsData"; // Importando a interface de Produto definida em um arquivo externo
import Image from "next/image"; // Importando o componente Image do pacote next/image
import Cart from "../../Cart"; // Importando o componente Cart definido em um arquivo externo
import { ToastContainer, toast } from "react-toastify"; // Importando componentes relacionados a notificações
import "react-toastify/dist/ReactToastify.css"; // Importando estilos para as notificações

// Interface que define as propriedades do componente CategoryItems
interface CategoryItemsProps {
    selectedCategory: string; // Propriedade para armazenar a categoria selecionada
}


// Componente CategoryItems: Renderiza os produtos de uma categoria selecionada
export default function CategoryItems({ selectedCategory }: CategoryItemsProps) {
    const [products, setProducts] = useState<Product[]>(productsByCategory[selectedCategory] || []);
    // Estado para controlar o ID do produto selecionado
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    // Estado para armazenar os itens do carrinho
    const [cartItems, setCartItems] = useState<Product[]>([]);
    // Estado para controlar se o modal do carrinho está aberto ou fechado
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [selectedSlices, setSelectedSlices] = useState<number[]>([]);

    // Função para tratar o clique em um produto
    const handleProductClick = (productId: number) => {
        setSelectedProductId(productId);
    };

    const increaseQuantity = (productId: number) => {
        setSelectedProductId(productId);
        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === productId) {
                    return { ...product, quantity: product.quantity + 1 };
                }
                return product;
            });
        });
    };

    const decreaseQuantity = (productId: number) => {
        setSelectedProductId(productId);
        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === productId) {
                    return { ...product, quantity: Math.max(product.quantity - 1, 1) };
                }
                return product;
            });
        });
    };

    // Função para adicionar um produto ao carrinho
    const addToCart = (product: Product, selectedSliceIndex: number | undefined) => {
        setSelectedProductId(product.id);

        // Calcula o preço com base na fatia selecionada, se houver
        const price = selectedSliceIndex !== undefined && product.fatias
            ? product.fatias[selectedSliceIndex].preco
            : product.preco;

        // Cria um novo objeto de produto com o preço calculado
        const productToAdd: Product = {
            ...product,
            preco: price
        };

        setCartItems((prevItems) => [...prevItems, productToAdd]);

        // Exibe uma notificação de sucesso
        toast.success(`${product.nome} foi adicionado ao carrinho!`, {
            position: "top-right",
            autoClose: 800,
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

    const calculateTotalPrice = (product: Product, index: number): number => {
        if (product.fatias && selectedSlices[index] !== undefined) {
            const selectedSlice = product.fatias[selectedSlices[index]];
            return selectedSlice.preco * product.quantity;
        }
        return product.preco * product.quantity;
    };

    const handleSliceChange = (index: number, selectedSliceIndex: number) => {
        setSelectedSlices((prevSelectedSlices) => {
            const newSelectedSlices = [...prevSelectedSlices];
            newSelectedSlices[index] = selectedSliceIndex;
            return newSelectedSlices;
        });
    };

    useEffect(() => {
        // Atualizar o estado 'products' com base na categoria selecionada
        setProducts(productsByCategory[selectedCategory] || []);
    }, [selectedCategory]);

    return (
        <div className="mt-5 flex justify-center">
            <div className="max-w-screen-lg w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.length === 0 ? (
                        <p>Nenhum produto disponível nesta categoria.</p>
                    ) : (
                        products.map((product, index) => {
                            // const totalPrice = product.preco * product.quantity;
                            const totalPrice = calculateTotalPrice(product, index);

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
                                            fill
                                            sizes="(max-width: 36px) (max-width: 52px)"
                                        />
                                    </div>
                                    <div className="text-center mt-2">
                                        <h3 className="font-semibold">{product.nome}</h3>
                                        <p>Preço: R$ {totalPrice.toFixed(2)}</p>
                                    </div>
                                    <div className="flex flex-col items-center space-x-2 mt-2">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span>Quantidade</span>
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
                                            <span>{product.quantity}</span>
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
                                        <div className="flex items-center space-x-2 mb-2">
                                            {product.fatias && (
                                                <select
                                                    value={selectedSlices[index] || ""}
                                                    onChange={(e) => handleSliceChange(index, parseInt(e.target.value, 10))}
                                                    className={`${selectedProductId === product.id
                                                        ? "bg-white text-colorPrimary"
                                                        : "bg-white text-black"
                                                        } px-2 py-1 rounded-md`}
                                                >

                                                    {product.fatias.map((f, fIndex) => (
                                                        <option
                                                            key={fIndex}
                                                            value={fIndex}
                                                            className={`bg-white ${selectedProductId === product.id
                                                                ? "text-colorPrimary"
                                                                : "text-black"
                                                                }`}
                                                        >
                                                            {f.quantidade} Fatias
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        </div>
                                        <button
                                            className={`${selectedProductId === product.id
                                                ? "bg-white text-colorPrimary"
                                                : "bg-colorPrimary text-white"
                                                } px-2 py-1 rounded-md shadow-lg`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(product, selectedSlices[index]);
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