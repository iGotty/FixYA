import React from 'react';
import img from '../images/conectamos.png';

const Intro = () => {
    return (
        <>
            <div className="m-auto max-w-6xl p-2 md:p-12 h-5/6" id="about">
                <div
                    className="flex flex-col-reverse lg:flex-row py-8 justify-between lg:text-left"
                    data-aos="fade-up"
                >
                    {/* Imagen */}
                    <div className="lg:w-1/2 flex flex-col lg:mx-4 justify-center">
                        <img
                            alt="card img"
                            className="rounded-t float-right w-5/6 mx-auto"
                            src={img}
                        />
                    </div>
                    {/* Texto */}
                    <div
                        className="flex-col my-4 text-center lg:text-left lg:my-0 lg:justify-end w-full lg:w-1/2 px-8"
                        data-aos="zoom-in"
                        data-aos-delay="500"
                    >
                        <h3 className="text-3xl text-blue-900 font-bold">
                            Conectamos hogares con profesionales confiables
                        </h3>
                        <div>
                            <p className="my-3 text-xl text-gray-600 font-semibold">
                                <span className="font-gliker text-gray-350">YAfix</span> es una aplicación
                                dedicada a facilitar el acceso a servicios del hogar. Estamos encargados de
                                conectarte con prestadores de servicios capacitados para cualquier tipo de
                                servicio que requieras.
                            </p>
                        </div>
                        <div>
                            <p className="my-3 text-xl text-gray-600 font-semibold">
                                En <span className="font-gliker text-gray-350">YAfix</span> buscamos
                                revolucionar la vida de las personas. Para ello, los{' '}
                                <strong>prestadores de servicios</strong> tendrán la facilidad y rapidez de
                                conseguir clientes con un solo click. Los <strong>usuarios</strong> podrán
                                solucionar los problemas del día a día que surgen en sus hogares de forma
                                rápida y segura, gracias a profesionales confiables.{' '}
                                <span className="font-gliker text-gray-350">YAfix</span> está a la
                                disposición de todos, allí podrás solicitar una gran variedad de servicios a
                                domicilio que te permitirán ahorrar tiempo y costos de traslado.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Intro;
