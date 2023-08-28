import React from "react";
import { Product } from "@/dataProducts/productsData";
import { FiX } from "react-icons/fi";
import Image from "next/image";
const carrinhoVazio = "/carrinhoVazio.png";

// Interface que define as propriedades do componente Cart
interface CartProps {
    cartItems: Product[];
    onClose: () => void;
    removeItem: (index: number) => void;
}

// Função para gerar o texto do pedido
function generateOrderText(cartItems: Product[]): string {
    let orderText = "Pedido via WhatsApp:\n\n";

    for (const item of cartItems) {
        const totalPrice = item.preco * (item.quantity || 1);

        orderText += `Produto: ${item.nome}\n`;
        orderText += `Quantidade: ${item.quantity}\n`;
        orderText += `Preço: R$ ${totalPrice.toFixed(2)}\n\n`;
    }

    return orderText;
}

// Componente Cart: Exibe os itens no carrinho
const Cart: React.FC<CartProps> = ({ cartItems, onClose, removeItem }) => {
    const sendOrderViaWhatsApp = () => {
        const orderText = generateOrderText(cartItems);

        const phoneNumber = "77999012242";
        const encodedMessage = encodeURIComponent(orderText);
        const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

        window.open(whatsappURL, "_blank");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Carrinho</h2>
                    <button className="text-red-500 ml-20" onClick={onClose}>
                        <FiX size={20} />
                    </button>
                </div>
                {cartItems.length === 0 ? (
                    <div className="flex justify-center p-5">
                        <Image alt="imagem" src={carrinhoVazio} width={400} height={50} />
                    </div>

                ) : (
                    cartItems.map((item, index) => {
                        const totalPrice = item.preco * (item.quantity || 1); // Corrigindo o cálculo do preço

                        return (
                            <div key={item.id} className="sm:flex items-center justify-between border-b py-4">
                                <div className="flex items-center">
                                    <div className="mr-4 w-auto h-auto">
                                        <Image
                                            src={item.image}
                                            alt="Imagem do Produto"
                                            width={80}
                                            height={80}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{item.nome}</h3>
                                        <p>Quantidade: {item.quantity}</p>
                                        <p>Preço: R$ {totalPrice.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="bg-red-500 text-white w-full mt-5 lg:ml-0 rounded-lg p-2"
                                        onClick={() => removeItem(index)}
                                    >
                                        Remover
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
                {cartItems.length > 0 && (
                    <button
                        className="bg-colorPrimary text-white px-4 py-2 rounded-md shadow-lg w-full"
                        onClick={sendOrderViaWhatsApp}
                    >
                        Enviar Pedido via WhatsApp
                    </button>
                )}

            </div>
        </div>
    );
};

export default Cart;

