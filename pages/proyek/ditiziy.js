import { supabase } from '../../lib/supabaseClient';

export default function ProyekPage({ proyek }) {
  if (!proyek) return <p>Proyek tidak ditemukan</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{proyek.name}</h1>
      <p>{proyek.description}</p>
    </div>
  );
}

// Ambil data dari Supabase di server-side
export async function getServerSideProps({ params }) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('name', params.nama)
    .single();

  return {
    props: {
      proyek: data || null,
    },
  };
  }
