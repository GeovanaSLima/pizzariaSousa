import { Button } from '@/components/button';
import styles from '../../page.module.scss';
import { api } from '@/services/api';
import { getCookieServer } from '@/lib/cookieServer';
import { redirect } from 'next/navigation';

export default function Category() {
  async function handleRegisterCategory(formData: FormData) {
    'use server';

    const name = formData.get('name');

    if (name === '') return;

    const token = await getCookieServer();

    try {
      await api.post(
        '/category',
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      return;
    }

    redirect('/dashboard');
  }

  return (
    <main className={styles.categoryContainer}>
      <h1>Nova Categoria</h1>

      <form className={styles.categoryForm} action={handleRegisterCategory}>
        <input
          type="text"
          name="name"
          placeholder="Nome da categoria, ex: Pizzas"
          required
          className={styles.input}
          style={{ height: '45px' }}
        />

        <Button message="Cadastrar" />
      </form>
    </main>
  );
}
