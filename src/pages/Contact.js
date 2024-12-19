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
        departamento: '',   
        ciudadDeResidencia: '', 
        experiencia: {},
        documentoTipo: '',
        documentoFrontal: null,
        documentoTrasera: null,
        documentoUnico: null,
        fotoPersonal: null,
        certificadoExperticia: null,
        certificadoTipo: '' 
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

    const [modalCertificadoTipo, setModalCertificadoTipo] = useState(false); 

    const fileInputRefPersonal = useRef(null);
    const fileInputRefCertificado = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoryClick = (category) => {
        if (category.name === 'Agregar Otros') {
            setCustomCategoryData({ name: '', years: '' });
            setModalCustomCategory(true);
        } else {
            if (formData.experiencia[category.name]) {
                const updatedExperience = { ...formData.experiencia };
                delete updatedExperience[category.name];
                setFormData({ ...formData, experiencia: updatedExperience });
            } else {
                setSelectedCategory(category);
                setModalExperience(true);
            }
        }
    };

    const handleCustomCategoryClick = (category) => {
        if (formData.experiencia[category.name]) {
            const updatedExperience = { ...formData.experiencia };
            delete updatedExperience[category.name];
            setFormData({ ...formData, experiencia: updatedExperience });
        } else {
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
    };

    const handleFileChange = (e, side = 'single') => {
        const file = e.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
            if (side === 'front') {
                setFormData({ ...formData, documentoFrontal: file });
            } else if (side === 'back') {
                setFormData({ ...formData, documentoTrasera: file });
            } else if (side === 'personal') {
                setFormData({ ...formData, fotoPersonal: file });
            } else if (side === 'certificado') {
                setFormData({ ...formData, certificadoExperticia: file });
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
        } else if (side === 'personal') {
            setFormData({ ...formData, fotoPersonal: null });
        } else if (side === 'certificado') {
            setFormData({ ...formData, certificadoExperticia: null });
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
        setCustomCategories([...customCategories, { id: Date.now(), name: trimmedName }]);
        setFormData({
            ...formData,
            experiencia: { ...formData.experiencia, [trimmedName]: years },
        });
        setModalCustomCategory(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isIndependent) {
            if (formData.documentoTipo === '') {
                alert('Por favor, selecciona el tipo de documento y súbelo.');
                return;
            }

            if ((formData.documentoTipo === 'Cédula de Ciudadanía' || formData.documentoTipo === 'Cédula de Extranjería') &&
                (!formData.documentoFrontal || !formData.documentoTrasera)) {
                alert('Por favor, sube la imagen frontal y la trasera de la cédula.');
                return;
            }

            if ((formData.documentoTipo === 'Pasaporte' || formData.documentoTipo === 'Permiso temporal') && !formData.documentoUnico) {
                alert(`Por favor, sube el ${formData.documentoTipo}.`);
                return;
            }

            if (!formData.fotoPersonal) {
                alert('Por favor, sube la imagen personal.');
                return;
            }

        } else {
            if (formData.nit.trim() === '') {
                alert('Por favor, ingresa el NIT.');
                return;
            }
            if (formData.documentoTipo !== 'RUT' || !formData.documentoUnico) {
                alert('Por favor, selecciona y sube el RUT.');
                return;
            }
        }

        e.target.submit();
    };

    const handleCertificadoClick = () => {
        setModalCertificadoTipo(true);
    };

    const handleCertificadoTipoSelect = (tipo) => {
        setFormData({ ...formData, certificadoTipo: tipo });
        setModalCertificadoTipo(false);
        if (fileInputRefCertificado.current) fileInputRefCertificado.current.click();
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
                        <input type="hidden" name="_template" value="table"></input>
                        <input type="hidden" name="_next" value="https://yafix.netlify.app/thanks"></input>
                        {/* Tipo de Documento se envía oculto */}
                        <input type="hidden" name="documentoTipo" value={formData.documentoTipo} />
                        {/* Tipo de Certificado se envía oculto */}
                        {formData.certificadoExperticia && formData.certificadoTipo && (
                            <input type="hidden" name="certificadoTipo" value={formData.certificadoTipo} />
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {isIndependent ? (
                                <>
                                    <input name="nombres" className="p-4 bg-white border rounded-lg" type="text" placeholder="Nombres" value={formData.nombres} onChange={handleInputChange} required />
                                    <input name="apellidos" className="p-4 bg-white border rounded-lg" type="text" placeholder="Apellidos" value={formData.apellidos} onChange={handleInputChange} required />
                                    <select name="genero" className="p-4 bg-white border rounded-lg" value={formData.genero} onChange={handleInputChange} required>
                                        <option value="">Selecciona el género</option>
                                        <option value="masculino">Masculino</option>
                                        <option value="femenino">Femenino</option>
                                        <option value="prefiero_no_decirlo">Prefiero no decirlo</option>
                                        <option value="otro">Otro</option>
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

                            {/* Nuevo: Departamento y Ciudad */}
                            <input name="departamento" className="p-4 bg-white border rounded-lg" type="text" placeholder="Departamento" value={formData.departamento} onChange={handleInputChange} required />
                            <input name="ciudadDeResidencia" className="p-4 bg-white border rounded-lg" type="text" placeholder="Ciudad de Residencia" value={formData.ciudadDeResidencia} onChange={handleInputChange} required />
                        </div>

                        {/* Categorías */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
                                                const updatedExperience = { ...formData.experiencia };
                                                delete updatedExperience[category.name];
                                                setFormData({ ...formData, experiencia: updatedExperience });
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
                                className="flex flex-col justify-center items-center p-4 rounded-lg cursor-pointer h-40 bg-gray-200"
                                onClick={() => setModalCustomCategory(true)}
                            >
                                <FontAwesomeIcon icon={faPlus} className="text-4xl mb-2" />
                                <p className="font-bold text-center">Agregar Otros</p>
                            </div>
                        </div>

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
                            {!isIndependent ? (
                                <div>
                                    <button
                                        type="button"
                                        className="bg-blue-900 text-white px-3 py-3 rounded-lg flex items-center cursor-pointer w-1/4"
                                        onClick={() => setModalDocument(true)}
                                    >
                                        Adjuntar RUT
                                    </button>
                                    {formData.documentoTipo === 'RUT' && (
                                        <div className="mt-4 flex items-center">
                                            <input
                                                type="file"
                                                name="documentoUnico"
                                                id="documentoUnico"
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleFileChange(e, 'single')}
                                                accept="application/pdf,image/*"
                                            />
                                            <label
                                                htmlFor="documentoUnico"
                                                className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg cursor-pointer border border-gray-300 hover:bg-gray-300 transition"
                                            >
                                                Seleccionar RUT
                                            </label>
                                            {formData.documentoUnico ? (
                                                <div className="ml-4 flex items-center">
                                                    <i className="fas fa-paperclip text-blue-900 mr-2"></i>
                                                    <p className="text-gray-700 mr-4">{formData.documentoUnico.name}</p>
                                                    <button
                                                        type="button"
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() => removeFile('single')}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 ml-4">Ningún archivo seleccionado</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <button
                                        type="button"
                                        className="bg-blue-900 text-white px-3 py-3 rounded-lg flex items-center cursor-pointer w-1/4"
                                        onClick={() => setModalDocument(true)}
                                    >
                                        Adjuntar documento de identidad
                                    </button>

                                    {formData.documentoTipo && (formData.documentoTipo === 'Cédula de Ciudadanía' || formData.documentoTipo === 'Cédula de Extranjería') && (
                                        <div className="mt-4">
                                            {/* Frontal */}
                                            <div className="flex items-center mb-2">
                                                <input
                                                    type="file"
                                                    name="documentoFrontal"
                                                    id="documentoFrontal"
                                                    style={{ display: 'none' }}
                                                    onChange={(e) => handleFileChange(e, 'front')}
                                                    accept="application/pdf,image/*"
                                                />
                                                <label
                                                    htmlFor="documentoFrontal"
                                                    className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg cursor-pointer border border-gray-300 hover:bg-gray-300 transition"
                                                >
                                                    Seleccionar Frontal
                                                </label>
                                                {formData.documentoFrontal ? (
                                                    <div className="ml-4 flex items-center">
                                                        <i className="fas fa-paperclip text-blue-900 mr-2"></i>
                                                        <p className="text-gray-700 mr-4">{formData.documentoFrontal.name}</p>
                                                        <button
                                                            type="button"
                                                            className="text-red-500 hover:text-red-700"
                                                            onClick={() => removeFile('front')}
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-500 ml-4">Frontal no seleccionado</p>
                                                )}
                                            </div>
                                            {/* Trasera */}
                                            <div className="flex items-center">
                                                <input
                                                    type="file"
                                                    name="documentoTrasera"
                                                    id="documentoTrasera"
                                                    style={{ display: 'none' }}
                                                    onChange={(e) => handleFileChange(e, 'back')}
                                                    accept="application/pdf,image/*"
                                                />
                                                <label
                                                    htmlFor="documentoTrasera"
                                                    className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg cursor-pointer border border-gray-300 hover:bg-gray-300 transition"
                                                >
                                                    Seleccionar Trasera
                                                </label>
                                                {formData.documentoTrasera ? (
                                                    <div className="ml-4 flex items-center">
                                                        <i className="fas fa-paperclip text-blue-900 mr-2"></i>
                                                        <p className="text-gray-700 mr-4">{formData.documentoTrasera.name}</p>
                                                        <button
                                                            type="button"
                                                            className="text-red-500 hover:text-red-700"
                                                            onClick={() => removeFile('back')}
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-500 ml-4">Trasera no seleccionada</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {formData.documentoTipo && (formData.documentoTipo === 'Pasaporte' || formData.documentoTipo === 'Permiso temporal') && (
                                        <div className="mt-4 flex items-center">
                                            <input
                                                type="file"
                                                name="documentoUnico"
                                                id="documentoUnicoPasaporte"
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleFileChange(e, 'single')}
                                                accept="application/pdf,image/*"
                                            />
                                            <label
                                                htmlFor="documentoUnicoPasaporte"
                                                className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg cursor-pointer border border-gray-300 hover:bg-gray-300 transition"
                                            >
                                                Seleccionar {formData.documentoTipo}
                                            </label>
                                            {formData.documentoUnico ? (
                                                <div className="ml-4 flex items-center">
                                                    <i className="fas fa-paperclip text-blue-900 mr-2"></i>
                                                    <p className="text-gray-700 mr-4">{formData.documentoUnico.name}</p>
                                                    <button
                                                        type="button"
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() => removeFile('single')}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 ml-4">Ningún archivo seleccionado</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Adjuntar Imagen Personal solo para Independientes */}
                        {isIndependent && (
                            <div className="mb-6">
                                <button
                                    type="button"
                                    className="bg-blue-900 text-white px-3 py-3 rounded-lg flex items-center cursor-pointer w-1/4"
                                    onClick={() => {
                                        if(fileInputRefPersonal.current) fileInputRefPersonal.current.click();
                                    }}
                                >
                                    Adjuntar Imagen Personal
                                </button>
                                <input
                                    type="file"
                                    name="fotoPersonal"
                                    ref={fileInputRefPersonal}
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleFileChange(e, 'personal')}
                                    accept="application/pdf,image/*"
                                />
                                <div className="flex items-center ml-4 mt-2">
                                    {formData.fotoPersonal ? (
                                        <>
                                            <i className="fas fa-paperclip text-blue-900 mr-2"></i>
                                            <p className="text-gray-700 mr-4">{formData.fotoPersonal.name}</p>
                                            <button
                                                type="button"
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => removeFile('personal')}
                                            >
                                                ✕
                                            </button>
                                        </>
                                    ) : (
                                        <p className="text-gray-500">Ningún archivo seleccionado</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Adjuntar Certificado de Experticia solo para Independientes (OPCIONAL) */}
                        {isIndependent && (
                            <div className="mb-6">
                                <button
                                    type="button"
                                    className="bg-blue-900 text-white px-3 py-3 rounded-lg flex items-center cursor-pointer w-1/4"
                                    onClick={handleCertificadoClick}
                                >
                                    Adjuntar Certificado de experticia (Opcional)
                                </button>
                                <input
                                    type="file"
                                    name="certificadoExperticia"
                                    ref={fileInputRefCertificado}
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleFileChange(e, 'certificado')}
                                    accept="application/pdf,image/*"
                                />
                                <div className="flex items-center ml-4 mt-2">
                                    {formData.certificadoExperticia ? (
                                        <>
                                            <i className="fas fa-paperclip text-blue-900 mr-2"></i>
                                            <p className="text-gray-700 mr-4">{formData.certificadoExperticia.name}</p>
                                            <button
                                                type="button"
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => removeFile('certificado')}
                                            >
                                                ✕
                                            </button>
                                        </>
                                    ) : (
                                        <p className="text-gray-500">Ningún archivo seleccionado</p>
                                    )}
                                </div>
                            </div>
                        )}

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
                            {isIndependent ? 'Selecciona el tipo de documento personal' : 'Selecciona el documento para la empresa'}
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
                                    {/* Nuevo: Permiso temporal */}
                                    <button
                                        type="button"
                                        className="p-3 bg-blue-900 text-white rounded-lg"
                                        onClick={() => handleDocumentTypeSelect('Permiso temporal')}
                                    >
                                        Permiso temporal
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

            {/* Modal para Tipo de Certificado de Experticia */}
            {modalCertificadoTipo && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Selecciona el tipo de certificado:</h2>
                        <div className="flex flex-col space-y-4">
                            <button
                                type="button"
                                className="p-3 bg-blue-900 text-white rounded-lg"
                                onClick={() => handleCertificadoTipoSelect('técnico')}
                            >
                                Técnico
                            </button>
                            <button
                                type="button"
                                className="p-3 bg-blue-900 text-white rounded-lg"
                                onClick={() => handleCertificadoTipoSelect('tecnólogo')}
                            >
                                Tecnólogo
                            </button>
                            <button
                                type="button"
                                className="p-3 bg-blue-900 text-white rounded-lg"
                                onClick={() => handleCertificadoTipoSelect('otro')}
                            >
                                Otro
                            </button>
                        </div>
                        <button
                            type="button"
                            className="mt-6 text-gray-500 hover:text-gray-700"
                            onClick={() => setModalCertificadoTipo(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default Contact;
