import React from "react";
import { HashLink } from "react-router-hash-link";

const DemoProduct = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen bg-gray-100 px-6">
                {/* Sección de título */}
                <div className="mb-8">
                    <h1 className="text-5xl font-gliker text-center">
                        <span className="text-yellow-500">¡Muchas gracias</span>{" "}
                        <span className="text-blue-900">por tu registro!</span>
                    </h1>
                </div>
                {/* Sección de descripción */}
                <div className="text-center">
                    <p className="text-xl text-gray-700">
                        Próximamente podrás empezar a usar{" "}
                        <HashLink
                            smooth
                            to="/#hero"
                            className="font-gliker text-blue-900 hover:text-yellow-500 transition-colors duration-400"
                        >
                            YAfix
                        </HashLink>{" "}
                        para la prestación de tus servicios.
                    </p>
                </div>
            </div>
        </>
    );
};

export default DemoProduct;
