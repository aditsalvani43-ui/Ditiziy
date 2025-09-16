import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [nama, setNama] = useState('');
  const [desc, setDesc] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama || !desc) return;

    const { data, error } = await supabase
      .from('projects')
      .insert([{ name: nama, description: desc }]);

    if (error) {
      setMessage('Terjadi kesalahan atau nama sudah ada.');
    } else {
      setMessage(`Proyek berhasil dibuat! Lihat di: /proyek/${nama}`);
      setNama('');
      setDesc('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Buat Proyek Baru</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nama Proyek"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Deskripsi Proyek"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <br />
        <button type="submit">Buat Proyek</button>
      </form>
      <p>{message}</p>
    </div>
  );
    }
