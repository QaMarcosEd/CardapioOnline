import React from "react";

// O componente Header representa o cabeçalho da página
export default function Header() {
    return (
        // O cabeçalho está envolto por uma div com classes de espaçamento
        <header className="p-4 md:p-8 flex">
            <div className="container mx-auto text-center">
                {/* Texto que indica o título do cardápio */}
                <p className="text-lg md:text-1xl font-bold">Cardápio</p>
                {/* Título principal que destaca o cardápio */}
                <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-colorPrimary">Conheça o nosso cardápio</h1>
            </div>
        </header>
    );
}
