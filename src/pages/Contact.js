import React, { useState, useRef } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { useDocTitle } from '../components/CustomHook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTruck, faKey, faFaucet, faHammer, faBolt, faLeaf, faBroom, faHome,
    faUtensils, faConciergeBell, faDog, faWalking, faPaw, faScissors,
    faHandSparkles, faSpa, faCut, faTv, faPaintRoller, faBrush, faBox,
    faCar, faCarAlt, faPlus, faStar, faTimes
} from '@fortawesome/free-solid-svg-icons';

const predefinedCategories = [
    { id: 1, name: 'Mudanzas y Acarreos', icon: faTruck },
    { id: 2, name: 'Cerrajería', icon: faKey },
    { id: 3, name: 'Plomería', icon: faFaucet },
    { id: 4, name: 'Carpintería', icon: faHammer },
    { id: 5, name: 'Electricista', icon: faBolt },
    { id: 6, name: 'Jardinero', icon: faLeaf },
    { id: 7, name: 'Limpieza', icon: faBroom },
    { id: 8, name: 'Empleadas domésticas', icon: faHome },
    { id: 9, name: 'Cocineros', icon: faUtensils },
    { id: 10, name: 'Meseros', icon: faConciergeBell },
    { id: 11, name: 'Entrenadores de perros', icon: faDog },
    { id: 12, name: 'Paseadores de perros', icon: faWalking },
    { id: 13, name: 'Cuidadores de perros', icon: faPaw },
    { id: 14, name: 'Peluquería canina', icon: faScissors },
    { id: 15, name: 'Uñas', icon: faHandSparkles },
    { id: 16, name: 'Masajes', icon: faSpa },
    { id: 17, name: 'Peluquería', icon: faCut },
    { id: 18, name: 'Instalación de TV', icon: faTv },
    { id: 19, name: 'Pintura', icon: faPaintRoller },
    { id: 20, name: 'Maquillaje', icon: faBrush },
    { id: 21, name: 'Hogar Inteligente', icon: faHome },
    { id: 22, name: 'Carga y Transporte', icon: faBox },
    { id: 23, name: 'Conductor', icon: faCar },
    { id: 24, name: 'Alquiler de carros', icon: faCarAlt },
    // 'Otros' se manejará por separado
];

const Contact = () => {
    useDocTitle('YAfix | Registro');
    const [isIndependent, setIsIndependent] = useState(true);
    const [formData, setFormData] = useState({
        razonSocial: '',
        nit: '',
        nombres: '',
        apellidos: '',
        genero: '',
        cedula: '',
        celular: '',
        correo: '',
        experiencia: {},
        documentoTipo: '',
        documentoFrontal: null,
        documentoTrasera: null,
        documentoUnico: null,
        fotoPersonal: null
    });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalExperience, setModalExperience] = useState(false);
    const [modalDocument, setModalDocument] = useState(false);
    const [modalCustomCategory, setModalCustomCategory] = useState(false);
    const [customCategoryData, setCustomCategoryData] = useState({
        name: '',
        years: ''
    });
    const [customCategories, setCustomCategories] = useState([]);

    // Refs para los inputs de archivo
    const fileInputRefFront = useRef(null);
    const fileInputRefBack = useRef(null);
    const fileInputRefSingle = useRef(null);
    const fileInputRefPersonal = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoryClick = (category) => {
        if (category.name === 'Agregar Otros') {
            // Abrir el modal para agregar una categoría personalizada
            setCustomCategoryData({ name: '', years: '' });
            setModalCustomCategory(true);
        } else {
            if (formData.experiencia[category.name]) {
                // Deseleccionar la categoría
                const updatedExperience = { ...formData.experiencia };
                delete updatedExperience[category.name];
                setFormData({ ...formData, experiencia: updatedExperience });
            } else {
                // Seleccionar la categoría
                setSelectedCategory(category);
                setModalExperience(true);
            }
        }
    };

    const handleCustomCategoryClick = (category) => {
        if (formData.experiencia[category.name]) {
            // Deseleccionar la categoría personalizada
            const updatedExperience = { ...formData.experiencia };
            delete updatedExperience[category.name];
            setFormData({ ...formData, experiencia: updatedExperience });
        } else {
            // Seleccionar la categoría personalizada
            setSelectedCategory(category);
            setModalExperience(true);
        }
    };

    const handleExperienceSubmit = (years) => {
        if (selectedCategory) {
            setFormData({
                ...formData,
                experiencia: { ...formData.experiencia, [selectedCategory.name]: years },
            });
            setModalExperience(false);
        }
    };

    const handleDocumentTypeSelect = (type) => {
        setModalDocument(false);
        setFormData({ ...formData, documentoTipo: type });

        // Después de seleccionar el tipo de documento, dependiendo del tipo, abrir el input correspondiente
        if (type === 'Cédula de Ciudadanía' || type === 'Cédula de Extranjería') {
            // Abrimos el input frontal
            setTimeout(() => {
                if (fileInputRefFront.current) {
                    fileInputRefFront.current.click();
                }
            }, 100);
        } else {
            // Abrimos el input único
            setTimeout(() => {
                if (fileInputRefSingle.current) {
                    fileInputRefSingle.current.click();
                }
            }, 100);
        }
    };

    const handleFileChange = (e, side = 'single') => {
        const file = e.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
            if (side === 'front') {
                setFormData({ ...formData, documentoFrontal: file });
                // Después de seleccionar el frontal, abrir el trasero si aplica
                if (formData.documentoTipo === 'Cédula de Ciudadanía' || formData.documentoTipo === 'Cédula de Extranjería') {
                    setTimeout(() => {
                        if (fileInputRefBack.current) {
                            fileInputRefBack.current.click();
                        }
                    }, 100);
                }
            } else if (side === 'back') {
                setFormData({ ...formData, documentoTrasera: file });
            } else {
                setFormData({ ...formData, documentoUnico: file });
            }
        } else {
            alert('Por favor, sube un archivo en formato PDF o imagen.');
        }
    };

    const removeFile = (side = 'single') => {
        if (side === 'front') {
            setFormData({ ...formData, documentoFrontal: null });
        } else if (side === 'back') {
            setFormData({ ...formData, documentoTrasera: null });
        } else {
            setFormData({ ...formData, documentoUnico: null });
        }
    };

    const handleCustomCategoryChange = (e) => {
        const { name, value } = e.target;
        setCustomCategoryData({ ...customCategoryData, [name]: value });
    };

    const handleCustomCategorySubmit = () => {
        const { name, years } = customCategoryData;
        const trimmedName = name.trim();
        if (trimmedName === '' || years.trim() === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }
        if (formData.experiencia[trimmedName]) {
            alert('Esta categoría ya ha sido agregada.');
            return;
        }
        // Añadir la nueva categoría personalizada
        setCustomCategories([...customCategories, { id: Date.now(), name: trimmedName }]);
        setFormData({
            ...formData,
            experiencia: { ...formData.experiencia, [trimmedName]: years },
        });
        setModalCustomCategory(false);
    };

    const handlePersonalImageChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
            setFormData({ ...formData, fotoPersonal: file });
        } else {
            alert('Por favor, sube un archivo en formato PDF o imagen.');
        }
    };

    const removePersonalImage = () => {
        setFormData({ ...formData, fotoPersonal: null });
    };

    const handleSubmit = (e) => {
        // Validar que se haya subido el documento y la foto personal antes de enviar
        // Si es cédula o cédula de extranjería, se requieren 2 archivos (frontal y trasera)
        // De lo contrario, se requiere 1 archivo
        e.preventDefault();
        if (formData.documentoTipo === '') {
            alert('Por favor, selecciona el tipo de documento y súbelo.');
            return;
        }

        if ((formData.documentoTipo === 'Cédula de Ciudadanía' || formData.documentoTipo === 'Cédula de Extranjería') &&
            (!formData.documentoFrontal || !formData.documentoTrasera)) {
            alert('Por favor, sube la imagen frontal y la trasera de la cédula.');
            return;
        }

        if ((formData.documentoTipo === 'Pasaporte' || formData.documentoTipo === 'RUT') &&
            !formData.documentoUnico) {
            alert('Por favor, sube el documento requerido.');
            return;
        }

        if (!formData.fotoPersonal) {
            alert('Por favor, sube la imagen personal.');
            return;
        }

        e.target.submit();
    };

    return (
        <>
            <NavBar />
            <div className="bg-gray-100 py-12 lg:py-24">
                <div className="container mx-auto px-6 lg:px-12">
                    <h1 className="text-4xl font-bold text-blue-900 text-center mb-6">Registro como Proveedor</h1>
                    
                    {/* Selector de Rol */}
                    <div className="flex justify-center items-center mb-10">
                        <div
                            className={`p-4 rounded-l-lg cursor-pointer ${isIndependent ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-600'}`}
                            onClick={() => setIsIndependent(true)}
                        >
                            <i className="fas fa-user text-4xl mb-2"></i>
                            <p className="font-bold text-lg">Independiente</p>
                        </div>
                        <div
                            className={`p-4 rounded-r-lg cursor-pointer ${!isIndependent ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-600'}`}
                            onClick={() => setIsIndependent(false)}
                        >
                            <i className="fas fa-building text-4xl mb-2"></i>
                            <p className="font-bold text-lg">Empresa</p>
                        </div>
                    </div>

                    {/* Campos del Formulario */}
                    <form 
                        action="https://formsubmit.co/42b466ff499136110887cb7d9e7da5ff" 
                        method="POST" 
                        encType="multipart/form-data"
                        onSubmit={handleSubmit}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {isIndependent ? (
                                <>
                                    <input type="hidden" name="_template" value="table"></input>
                                    <input type="hidden" name="_next" value="https://yafix.netlify.app/thanks"></input>
                                    <input name="nombres" className="p-4 bg-white border rounded-lg" type="text" placeholder="Nombres" value={formData.nombres} onChange={handleInputChange} required />
                                    <input name="apellidos" className="p-4 bg-white border rounded-lg" type="text" placeholder="Apellidos" value={formData.apellidos} onChange={handleInputChange} required />
                                    <select name="genero" className="p-4 bg-white border rounded-lg" value={formData.genero} onChange={handleInputChange} required>
                                        <option value="">Selecciona el género</option>
                                        <option value="masculino">Masculino</option>
                                        <option value="femenino">Femenino</option>
                                        <option value="femenino">Prefiero no decirlo</option>
                                        <option value="femenino">Otro</option>
                                    </select>
                                    <input name="cedula" className="p-4 bg-white border rounded-lg" type="text" placeholder="Cédula" value={formData.cedula} onChange={handleInputChange} required />
                                </>
                            ) : (
                                <>
                                    <input name="razonSocial" className="p-4 bg-white border rounded-lg" type="text" placeholder="Razón Social" value={formData.razonSocial} onChange={handleInputChange} required />
                                    <input name="nit" className="p-4 bg-white border rounded-lg" type="text" placeholder="NIT" value={formData.nit} onChange={handleInputChange} required />
                                </>
                            )}
                            <input name="celular" className="p-4 bg-white border rounded-lg" type="text" placeholder="Celular" value={formData.celular} onChange={handleInputChange} required />
                            <input name="correo" className="p-4 bg-white border rounded-lg" type="email" placeholder="Correo electrónico" value={formData.correo} onChange={handleInputChange} required />

                        </div>

                        {/* Categorías */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {/* Categorías Predefinidas */}
                            {predefinedCategories.map((category) => (
                                <div
                                    key={category.id}
                                    className={`flex flex-col justify-center items-center p-4 rounded-lg cursor-pointer h-40 relative ${
                                        formData.experiencia[category.name] ? 'bg-blue-900 text-white' : 'bg-gray-200'
                                    }`}
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    <FontAwesomeIcon icon={category.icon} className="text-4xl mb-2" />
                                    <p className="font-bold text-center">{category.name}</p>
                                    {formData.experiencia[category.name] && (
                                        <p className="text-sm">
                                            {`Años: ${formData.experiencia[category.name]}`}
                                        </p>
                                    )}
                                </div>
                            ))}

                            {/* Categorías Personalizadas */}
                            {customCategories.map((category) => (
                                <div
                                    key={category.id}
                                    className={`flex flex-col justify-center items-center p-4 rounded-lg cursor-pointer h-40 relative ${
                                        formData.experiencia[category.name] ? 'bg-blue-900 text-white' : 'bg-gray-200'
                                    }`}
                                    onClick={() => handleCustomCategoryClick(category)}
                                >
                                    <FontAwesomeIcon icon={faStar} className="text-4xl mb-2" />
                                    <p className="font-bold text-center">{category.name}</p>
                                    {formData.experiencia[category.name] && (
                                        <p className="text-sm">
                                            {`Años: ${formData.experiencia[category.name]}`}
                                        </p>
                                    )}
                                    {formData.experiencia[category.name] && (
                                        <button
                                            type="button"
                                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Deseleccionar la categoría
                                                const updatedExperience = { ...formData.experiencia };
                                                delete updatedExperience[category.name];
                                                setFormData({ ...formData, experiencia: updatedExperience });
                                                // Remover de las categorías personalizadas
                                                setCustomCategories(customCategories.filter(cat => cat.id !== category.id));
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    )}
                                </div>
                            ))}

                            {/* 'Agregar Otros' Categoría */}
                            <div
                                className={`flex flex-col justify-center items-center p-4 rounded-lg cursor-pointer h-40 bg-gray-200`}
                                onClick={() => setModalCustomCategory(true)}
                            >
                                <FontAwesomeIcon icon={faPlus} className="text-4xl mb-2" />
                                <p className="font-bold text-center">Agregar Otros</p>
                            </div>
                        </div>

                        {/* Campos ocultos para categorías seleccionadas */}
                        {Object.entries(formData.experiencia).map(([categoryName, years]) => (
                            <input
                                key={categoryName}
                                type="hidden"
                                name={`categoria_${categoryName}`}
                                value={`Categoría: ${categoryName}, Años: ${years}`}
                            />
                        ))}

                        {/* Subida de Documento */}
                        <div className="mb-6">
                            <label
                                className="bg-blue-900 text-white px-3 py-3 rounded-lg flex items-center cursor-pointer w-1/4"
                                onClick={() => setModalDocument(true)}
                            >
                                Adjuntar Documento de Identidad
                                <i className="fas fa-paperclip ml-2"></i>
                            </label>
                            {/* Mostrar archivos subidos dependiendo del tipo de documento */}
                            <div className="mt-4">
                                {formData.documentoTipo && (formData.documentoTipo === 'Cédula de Ciudadanía' || formData.documentoTipo === 'Cédula de Extranjería') && (
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex items-center">
                                            <input
                                                type="file"
                                                name="documentoFrontal"
                                                ref={fileInputRefFront}
                                                onChange={(e) => handleFileChange(e, 'front')}
                                                style={{ display: 'none' }}
                                                accept="application/pdf,image/*"
                                            />
                                            {formData.documentoFrontal && (
                                                <>
                                                    <i className="fas fa-paperclip text-blue-900 mr-2"></i>
                                                    <p className="text-gray-700 mr-4">{formData.documentoFrontal.name}</p>
                                                    <button
                                                        type="button"
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() => removeFile('front')}
                                                    >
                                                        ✕
                                                    </button>
                                                </>
                                            )}
                                            {!formData.documentoFrontal && <p className="text-gray-500">Frontal no seleccionado</p>}
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="file"
                                                name="documentoTrasera"
                                                ref={fileInputRefBack}
                                                onChange={(e) => handleFileChange(e, 'back')}
                                                style={{ display: 'none' }}
                                                accept="application/pdf,image/*"
                                            />
                                            {formData.documentoTrasera && (
                                                <>
                                                    <i className="fas fa-paperclip text-blue-900 mr-2"></i>
                                                    <p className="text-gray-700 mr-4">{formData.documentoTrasera.name}</p>
                                                    <button
                                                        type="button"
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() => removeFile('back')}
                                                    >
                                                        ✕
                                                    </button>
                                                </>
                                            )}
                                            {!formData.documentoTrasera && <p className="text-gray-500">Trasera no seleccionada</p>}
                                        </div>
                                    </div>
                                )}
                                {formData.documentoTipo && (formData.documentoTipo === 'Pasaporte' || formData.documentoTipo === 'RUT') && (
                                    <div className="flex items-center mt-2">
                                        <input
                                            type="file"
                                            name="documentoUnico"
                                            ref={fileInputRefSingle}
                                            onChange={(e) => handleFileChange(e, 'single')}
                                            style={{ display: 'none' }}
                                            accept="application/pdf,image/*"
                                        />
                                        {formData.documentoUnico && (
                                            <>
                                                <i className="fas fa-paperclip text-blue-900 mr-2"></i>
                                                <p className="text-gray-700 mr-4">{formData.documentoUnico.name}</p>
                                                <button
                                                    type="button"
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => removeFile('single')}
                                                >
                                                    ✕
                                                </button>
                                            </>
                                        )}
                                        {!formData.documentoUnico && <p className="text-gray-500">Ningún archivo seleccionado</p>}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Nuevo botón para subir imagen personal */}
                        <div className="mb-6">
                            <label
                                className="bg-blue-900 text-white px-3 py-3 rounded-lg flex items-center cursor-pointer w-1/4"
                                onClick={() => fileInputRefPersonal.current && fileInputRefPersonal.current.click()}
                            >
                                Adjuntar Imagen Personal
                                <i className="fas fa-paperclip ml-2"></i>
                            </label>
                            <div className="flex items-center ml-4 mt-2">
                                <input
                                    type="file"
                                    name="fotoPersonal"
                                    ref={fileInputRefPersonal}
                                    onChange={handlePersonalImageChange}
                                    style={{ display: 'none' }}
                                    accept="application/pdf,image/*"
                                />
                                {formData.fotoPersonal && (
                                    <>
                                        <i className="fas fa-paperclip text-blue-900 mr-2"></i>
                                        <p className="text-gray-700 mr-4">{formData.fotoPersonal.name}</p>
                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-700"
                                            onClick={removePersonalImage}
                                        >
                                            ✕
                                        </button>
                                    </>
                                )}
                                {!formData.fotoPersonal && <p className="text-gray-500">Ningún archivo seleccionado</p>}
                            </div>
                        </div>

                        {/* Botón de Envío */}
                        {/* Botón de Envío */}
                        <div className="flex flex-col items-center mt-10">
                            <button type="submit" className="bg-blue-900 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-blue-800">
                                Enviar Registro
                            </button>
                            <p className="text-center text-sm text-gray-500 mt-4">
                                Al enviar el registro aceptas la política de tratamiento de datos conforme a la Ley 1581 de 2012.
                            </p>
                        </div>
                        
    
                    </form>
                </div>
            </div>

            {/* Modal para Años de Experiencia */}
            {modalExperience && (
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
                    onClick={() => setModalExperience(false)}
                >
                    <div
                        className="bg-white p-6 rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold mb-4">Años de experiencia en {selectedCategory.name}</h2>
                        <input
                            type="number"
                            className="p-4 border rounded-lg w-full"
                            placeholder="Cantidad de años"
                            onBlur={(e) => handleExperienceSubmit(e.target.value)}
                            min="0"
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                onClick={() => setModalExperience(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para Tipo de Documento */}
            {modalDocument && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">
                            Selecciona el tipo de documento {isIndependent ? 'personal' : 'para empresa'}
                        </h2>
                        <div className="flex flex-col space-y-4">
                            {isIndependent ? (
                                <>
                                    <button
                                        type="button"
                                        className="p-3 bg-blue-900 text-white rounded-lg"
                                        onClick={() => handleDocumentTypeSelect('Cédula de Ciudadanía')}
                                    >
                                        Cédula de Ciudadanía
                                    </button>
                                    <button
                                        type="button"
                                        className="p-3 bg-blue-900 text-white rounded-lg"
                                        onClick={() => handleDocumentTypeSelect('Cédula de Extranjería')}
                                    >
                                        Cédula de Extranjería
                                    </button>
                                    <button
                                        type="button"
                                        className="p-3 bg-blue-900 text-white rounded-lg"
                                        onClick={() => handleDocumentTypeSelect('Pasaporte')}
                                    >
                                        Pasaporte
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        className="p-3 bg-blue-900 text-white rounded-lg"
                                        onClick={() => handleDocumentTypeSelect('RUT')}
                                    >
                                        RUT
                                    </button>
                                </>
                            )}
                        </div>
                        <button
                            type="button"
                            className="mt-6 text-gray-500 hover:text-gray-700"
                            onClick={() => setModalDocument(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal para Agregar Categorías Personalizadas */}
            {modalCustomCategory && (
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
                    onClick={() => setModalCustomCategory(false)}
                >
                    <div
                        className="bg-white p-6 rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold mb-4">Agregar Nueva Categoría</h2>
                        <input
                            type="text"
                            name="name"
                            className="p-4 border rounded-lg w-full mb-4"
                            placeholder="Nombre de la categoría"
                            value={customCategoryData.name}
                            onChange={handleCustomCategoryChange}
                        />
                        <input
                            type="number"
                            name="years"
                            className="p-4 border rounded-lg w-full mb-4"
                            placeholder="Años de experiencia"
                            value={customCategoryData.years}
                            onChange={handleCustomCategoryChange}
                            min="0"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                onClick={handleCustomCategorySubmit}
                            >
                                Agregar
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                onClick={() => setModalCustomCategory(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default Contact;
