import React, { useState, useEffect } from 'react';
import "@/app/css/Buy.css";

const UserTable = () => {
  const [data, setData] = useState([]); // Estado para los datos de la tabla
  const [searchTerm, setSearchTerm] = useState(''); // Estado para la barra de búsqueda
  const [loading, setLoading] = useState(true);

  /* Simulación de consulta de usuarios
  const fetchUsers = async () => {
    try {
      const users = [
        { id: 1, identificacion: '123456', nombre: 'Juan Pérez', rol: 'Admin', puntoFisico: 'Bogotá', celular: '3001234567' },
        { id: 2, identificacion: '654321', nombre: 'Ana Gómez', rol: 'Usuario', puntoFisico: 'Medellín', celular: '3109876543' },
        { id: 3, identificacion: '789012', nombre: 'Luis Rodríguez', rol: 'Supervisor', puntoFisico: 'Cali', celular: '3201230987' },
      ];
      setTimeout(() => {
        setData(users);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  // Llamar la consulta al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);*/

  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar datos según el término de búsqueda
  const filteredData = data.filter(
    (user) =>
      user.identificacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.rol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.puntoFisico.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.celular.includes(searchTerm)
  );

  const handleUpdate = (id) => {
    alert(`Actualizar usuario con ID: ${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(`¿Estás seguro de eliminar al usuario con ID: ${id}?`);
    if (confirmDelete) {
      setData((prevData) => prevData.filter((user) => user.id !== id));
    }
  };

  return (
    <div>
      <h1>Consulta de Usuarios</h1>
      <input
        type="text"
        placeholder="Buscar usuarios..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '10px', width: '100%', padding: '8px', fontSize: '16px' }}
      />
      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Identificación</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Punto Físico</th>
              <th>Celular</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((user) => (
                <tr key={user.id}>
                  <td>{user.identificacion}</td>
                  <td>{user.nombre}</td>
                  <td>{user.rol}</td>
                  <td>{user.puntoFisico}</td>
                  <td>{user.celular}</td>
                  <td>
                    <button onClick={() => handleUpdate(user.id)}>Actualizar</button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      style={{ marginLeft: '5px', color: 'red' }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={{ textAlign: 'center' }}>
                  No se encontraron usuarios.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
