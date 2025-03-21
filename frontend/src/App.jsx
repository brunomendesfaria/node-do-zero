import { useEffect, useState } from 'react';

function App() {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', duration: 0 });
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

    if (form.id) {
      // Editando vídeo existente
      await fetch(`https://node-do-zero-le2o.onrender.com/videos/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          duration: form.duration,
        }),
      });
    } else {
      // Criando um novo vídeo
      await fetch('https://node-do-zero-le2o.onrender.com/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }

    setForm({ title: '', description: '', duration: 0 }); // 🔥 Agora limpa corretamente
    fetchVideos(); // Atualiza a lista
  }

  async function handleEdit(video) {
    setForm(video); // 🔥 Preenche o formulário com os dados do vídeo para edição
  }




  async function handleDelete(id) {
    console.log("Tentando excluir vídeo ID:", id);

    try {
      const response = await fetch(`https://node-do-zero-le2o.onrender.com/videos/${id}`, {
        method: 'DELETE',
      });

      console.log("Resposta do servidor:", response.status);

      if (response.ok) {
        setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
        console.log("Vídeo excluído com sucesso!");
      } else {
        console.error("Erro ao excluir vídeo:", response.statusText);
      }
    } catch (error) {
      console.error("Erro de rede ao excluir vídeo:", error);
    }
  }


  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎥 Gerenciador de Vídeos</h1>

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
        <button type="submit">
          {form.id ? 'Atualizar' : 'Salvar'}
        </button>
        {form.id && (
          <button
            type="button"
            style={{ marginLeft: '10px' }}
            onClick={() => setForm({ id: undefined, title: '', description: '', duration: 0 })}
          >
            Cancelar Edição
          </button>
        )}
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

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#333', color: 'white' }}>
            <th style={{ padding: '10px', border: '1px solid #555' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #555' }}>Título</th>
            <th style={{ padding: '10px', border: '1px solid #555' }}>Descrição</th>
            <th style={{ padding: '10px', border: '1px solid #555' }}>Duração</th>
            <th style={{ padding: '10px', border: '1px solid #555' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id} style={{ backgroundColor: '#222', color: 'white', textAlign: 'center' }}>
              <td style={{ padding: '10px', border: '1px solid #555' }}>{video.id}</td>
              <td style={{ padding: '10px', border: '1px solid #555' }}>{video.title}</td>
              <td style={{ padding: '10px', border: '1px solid #555' }}>{video.description}</td>
              <td style={{ padding: '10px', border: '1px solid #555' }}>{video.duration}s</td>
              <td style={{ padding: '10px', border: '1px solid #555' }}>
                <button onClick={() => handleEdit(video)} style={{ marginRight: '5px' }}>Editar</button>
                <button onClick={() => handleDelete(video.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );
}

export default App;
