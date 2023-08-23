import { Product, productsByCategory } from "@/dataProducts/productsData";
import React, { useState } from "react";
import CategoryItems from "./categoriesItems";

// O componente Categories representa a exibição das categorias e seus itens correspondentes
export default function Categories() {
    // State para rastrear a categoria selecionada
    const [selectedCategory, setSelectedCategory] = useState<string>("🍕 Pizzas");

    // Obtém os nomes das categorias a partir dos produtos
    const categoryNames = Object.keys(productsByCategory);

    // Obtém os produtos da categoria selecionada
    const selectedProducts: Product[] = productsByCategory[selectedCategory] || [];

    return (
        <div className="p-8 md:p-8 flex justify-center">
            <div className="max-w-screen-lg">
                {/* Container flex para posicionar os botões das categorias */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
                    {/* Mapeia as categorias e cria botões com classes condicionais */}
                    {categoryNames.map((category) => (
                        <button
                            key={category}
                            // Aplica classes de estilo condicional com base na categoria selecionada
                            className={`${selectedCategory === category
                                ? "bg-colorPrimary text-white"
                                : "bg-white text-black"
                                } px-4 py-2 rounded-lg shadow-md whitespace-nowrap font-medium`}
                            onClick={() => setSelectedCategory(category)} // Atualiza a categoria selecionada ao clicar
                        >
                            {category}
                        </button>
                    ))}
                </div>
                {/* Renderiza o componente CategoryItems com a categoria selecionada e produtos correspondentes */}
                <CategoryItems selectedCategory={selectedCategory} products={selectedProducts} />
            </div>
        </div>
    );
}
