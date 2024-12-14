import React from 'react';
import img1 from '../images/entrega.png'; 
import img2 from '../images/casa.png';
import img3 from '../images/lavabo.png';
import img4 from '../images/herramientas.png';

const Services = () => {

    return (
        <div id="services" className="bg-gray-100 py-12">
            <section data-aos="zoom-in-down">
                <div className="my-4 py-4">
                    <h2 className="my-2 text-center text-3xl text-blue-900 uppercase font-bold">Servicios</h2>
                    
                    <div className='flex justify-center'>
                        <div className='w-24 border-b-4 border-blue-900'></div>
                    </div>
                    <h2 className="mt-4 mx-12 text-center text-xl lg:text-2xl font-semibold text-blue-900">
                    Conecta con expertos confiables para resolver las necesidades de tu hogar de manera eficiente y segura.
                    </h2>
                </div>

                <div className="px-12" data-aos="fade-down" data-aos-delay="600">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        
                        <div className="bg-white transition-all ease-in-out duration-400 overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
                            <div className="m-2 text-justify text-sm">
                                <img 
                                    alt="Mudanzas" 
                                    className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out w-3/4 mx-auto" 
                                    src={img1} 
                                />
                                <h2 className="font-semibold my-4 text-2xl text-center">Mudanzas</h2>
                                <p className="text-md font-medium">
                                    Organiza y ejecuta tus mudanzas con la ayuda de profesionales que se encargarán de cada detalle para que el proceso sea rápido y sin complicaciones.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white transition-all ease-in-out duration-400 overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
                            <div className="m-2 text-justify text-sm">
                                <img 
                                    alt="Cerrajería" 
                                    className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out w-3/4 mx-auto" 
                                    src={img2} 
                                />
                                <h2 className="font-semibold my-4 text-2xl text-center">Cerrajería</h2>
                                <p className="text-md font-medium">
                                    Servicios de cerrajería de emergencia, instalación de cerraduras y sistemas de seguridad realizados por expertos calificados.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white transition-all ease-in-out duration-400 overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
                            <div className="m-2 text-justify text-sm">
                                <img 
                                    alt="Plomería" 
                                    className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out w-3/4 mx-auto" 
                                    src={img3} 
                                />
                                <h2 className="font-semibold my-4 text-2xl text-center">Plomería</h2>
                                <p className="text-md font-medium">
                                    Reparaciones y mantenimiento de tuberías, grifos y otros problemas de plomería en tu hogar.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white transition-all ease-in-out duration-400 overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
                            <div className="m-2 text-justify text-sm">
                                <img 
                                    alt="Carpintería" 
                                    className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out w-3/4 mx-auto" 
                                    src={img4} 
                                />
                                <h2 className="font-semibold my-4 text-2xl text-center">Carpintería</h2>
                                <p className="text-md font-medium">
                                    Diseño, reparación y mantenimiento de muebles y estructuras de madera con acabados de alta calidad.
                                </p>
                            </div>
                        </div>                    
                    </div>
                </div>
            </section>

            <section>
                <div className="m-auto max-w-6xl p-2 md:p-12 h-5/6">
                    <div className="flex flex-col-reverse lg:flex-row py-8 justify-between lg:text-left" data-aos="zoom-out">
                        <div className="lg:w-1/2 flex flex-col lg:mx-4 justify-center">

                            <div className='text-blue-900 mb-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" className='fill-current'><path d="M2 12h2a7.986 7.986 0 0 1 2.337-5.663 7.91 7.91 0 0 1 2.542-1.71 8.12 8.12 0 0 1 6.13-.041A2.488 2.488 0 0 0 17.5 7C18.886 7 20 5.886 20 4.5S18.886 2 17.5 2c-.689 0-1.312.276-1.763.725-2.431-.973-5.223-.958-7.635.059a9.928 9.928 0 0 0-3.18 2.139 9.92 9.92 0 0 0-2.14 3.179A10.005 10.005 0 0 0 2 12zm17.373 3.122c-.401.952-.977 1.808-1.71 2.541s-1.589 1.309-2.542 1.71a8.12 8.12 0 0 1-6.13.041A2.488 2.488 0 0 0 6.5 17C5.114 17 4 18.114 4 19.5S5.114 22 6.5 22c.689 0 1.312-.276 1.763-.725A9.965 9.965 0 0 0 12 22a9.983 9.983 0 0 0 9.217-6.102A9.992 9.992 0 0 0 22 12h-2a7.993 7.993 0 0 1-.627 3.122z"></path><path d="M12 7.462c-2.502 0-4.538 2.036-4.538 4.538S9.498 16.538 12 16.538s4.538-2.036 4.538-4.538S14.502 7.462 12 7.462zm0 7.076c-1.399 0-2.538-1.139-2.538-2.538S10.601 9.462 12 9.462s2.538 1.139 2.538 2.538-1.139 2.538-2.538 2.538z"></path></svg>
                            </div>

                            <h3 className="text-3xl text-blue-900 font-bold">Nosotros <span className='font-black'>Conectamos</span></h3>
                            <div>
                                <p className='my-3 text-xl text-gray-600 font-semibold'>
                                    Trabajamos para unir hogares con profesionales altamente capacitados, asegurando calidad en cada servicio que realizamos.
                                </p>
                            </div>
                        </div>
                        <div className="lg:w-1/2 flex flex-col lg:mx-4 justify-center mt-[-2rem]" >
                        <div className='text-blue-900 mb-4' >
                                <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 640 512" className='fill-current'><path d="M15 15C24.4 5.7 39.6 5.7 49 15l63 63V40c0-13.3 10.7-24 24-24s24 10.7 24 24v96c0 13.3-10.7 24-24 24H40c-13.3 0-24-10.7-24-24s10.7-24 24-24H78.1L15 49C5.7 39.6 5.7 24.4 15 15zM133.5 243.9C158.6 193.6 222.7 112 320 112s161.4 81.6 186.5 131.9c3.8 7.6 3.8 16.5 0 24.2C481.4 318.4 417.3 400 320 400s-161.4-81.6-186.5-131.9c-3.8-7.6-3.8-16.5 0-24.2zM320 320a64 64 0 1 0 0-128 64 64 0 1 0 0 128zM591 15c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-63 63H600c13.3 0 24 10.7 24 24s-10.7 24-24 24H504c-13.3 0-24-10.7-24-24V40c0-13.3 10.7-24 24-24s24 10.7 24 24V78.1l63-63zM15 497c-9.4-9.4-9.4-24.6 0-33.9l63-63H40c-13.3 0-24-10.7-24-24s10.7-24 24-24h96c13.3 0 24 10.7 24 24v96c0 13.3-10.7 24-24 24s-24-10.7-24-24V433.9L49 497c-9.4 9.4-24.6 9.4-33.9 0zm576 0l-63-63V472c0 13.3-10.7 24-24 24s-24-10.7-24-24V376c0-13.3 10.7-24 24-24h96c13.3 0 24 10.7 24 24s-10.7 24-24 24H561.9l63 63c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0z"></path></svg>
                            </div>
                            <h3 className="text-3xl text-blue-900 font-bold">Nosotros <span className='font-black'>Facilitamos</span></h3>
                            <div>
                                <p className='my-3 text-xl text-gray-600 font-semibold'>
                                    Facilitamos el acceso a servicios del hogar, brindando tranquilidad y soluciones rápidas a cada necesidad.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Services;
