// Importações necessárias
import React from "react";
import { Product } from "@/dataProducts/productsData";
import { FiX } from "react-icons/fi";

// Interface que define as propriedades do componente Cart
interface CartProps {
    cartItems: Product[]; // Lista de itens no carrinho
    onClose: () => void; // Função para manipular o fechamento do modal
    removeItem: (index: number) => void; // Função para remover um item do carrinho
}

// Componente Cart: Exibe os itens no carrinho
const Cart: React.FC<CartProps> = ({ cartItems, onClose, removeItem }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Carrinho</h2>
                    {/* Botão para fechar o carrinho, chamando a função onClose */}
                    <button className="text-gray-500" onClick={onClose}>
                        <FiX size={20} />
                    </button>
                </div>
                {cartItems.map((item, index) => (
                    <div key={item.id} className="flex items-center justify-between border-b py-2">
                        <div>
                            <h3 className="font-semibold">{item.nome}</h3>
                            <p>Preço: R$ {item.preco.toFixed(2)}</p>
                        </div>
                        <div>
                            {/* Botão para remover o item do carrinho, chamando a função removeItem com o índice do item */}
                            <button
                                className="text-red-500"
                                onClick={() => removeItem(index)}
                            >
                                Remover
                            </button>
                        </div>
                    </div>
                ))}
                {/* Aqui você pode adicionar botões para finalizar a compra ou continuar comprando */}
            </div>
        </div>
    );
};

export default Cart;