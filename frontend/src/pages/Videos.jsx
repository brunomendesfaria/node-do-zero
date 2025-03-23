import { useEffect, useState } from 'react';

function Videos() {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', duration: 0, genero: '' });
  const [search, setSearch] = useState('');

  async function fetchVideos(searchTerm = '') {
    const response = await fetch(`https://node-do-zero-le2o.onrender.com/videos?search=${searchTerm}`);
    const data = await response.json();
    setVideos(data);
  }

  useEffect(() => {
    fetchVideos();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      title: form.title,
      description: form.description,
      duration: form.duration,
      genero: form.genero
    };

    if (form.id) {
      // Atualizar
      await fetch(`https://node-do-zero-le2o.onrender.com/videos/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      // Criar novo
      await fetch('https://node-do-zero-le2o.onrender.com/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    setForm({ title: '', description: '', duration: 0, genero: '' });
    fetchVideos();
  }

  function handleEdit(video) {
    setForm(video);
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`https://node-do-zero-le2o.onrender.com/videos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setVideos((prev) => prev.filter((video) => video.id !== id));
      }
    } catch (err) {
      console.error("Erro ao deletar:", err);
    }
  }

  return (
    <div>
      <h2>🎥 Gerenciador de Vídeos</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Título"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Descrição"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Duração"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
        />
        <input
          placeholder="Gênero"
          value={form.genero}
          onChange={(e) => setForm({ ...form, genero: e.target.value })}
        />

        <div className="form-buttons">
          <button type="submit">{form.id ? 'Atualizar' : 'Salvar'}</button>
          {form.id && (
            <button
              type="button"
              onClick={() => setForm({ title: '', description: '', duration: 0, genero: '' })}
            >
              Cancelar Edição
            </button>
          )}
        </div>
      </form>

      <hr />

      <input
        placeholder="Buscar vídeos..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          fetchVideos(e.target.value);
        }}
      />

      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Duração</th>
            <th>Gênero</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td>{video.title}</td>
              <td>{video.description}</td>
              <td>{video.duration}</td>
              <td>{video.genero}</td>
              <td>
                <button onClick={() => handleEdit(video)} style={{ marginRight: '5px' }}>
                  Editar
                </button>
                <button onClick={() => handleDelete(video.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Videos;
