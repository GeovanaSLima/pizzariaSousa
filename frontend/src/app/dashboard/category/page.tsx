'use client';

import { Button } from '@/components/button';
import styles from '@/app/page.module.scss';
import { api } from '@/services/api';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import { getCookieClient } from '@/lib/cookieClient';

export default function Category() {
  const router = useRouter();

  async function handleRegisterCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name');

    if (!name) {
      toast.error('Preencha o nome da categoria.');
      return;
    }

    try {
      const token = await getCookieClient();

      await api.post(
        '/category',
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Categoria cadastrada com sucesso!');
      form.reset();
    } catch (err) {
      toast.error('Erro ao cadastrar categoria.');
    }
  }

  return (
    <main className={styles.categoryContainer}>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            backgroundColor: '#f1f1f1',
            color: '#131313',
            borderColor: 'rgba(255, 255, 255, 0.5)',
          },
        }}
        richColors={true}
      />
      <h1>Nova Categoria</h1>

      <form className={styles.categoryForm} onSubmit={handleRegisterCategory}>
        <input
          type="text"
          name="name"
          placeholder="Nome da categoria, ex: Pizzas"
          required
          className={styles.input}
        />

        <Button message="Cadastrar Categoria" />
      </form>
    </main>
  );
}
