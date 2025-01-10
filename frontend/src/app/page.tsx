import Link from 'next/link';
import styles from './page.module.scss';
import logoImg from '/public/logo.svg';
import Image from 'next/image';
import { api } from '@/services/api';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function Home() {
  async function handleLogin(formData: FormData) {
    'use server';

    const email = formData.get('email');
    const password = formData.get('password');

    if (email === '' || password === '') {
      return;
    }

    try {
      const response = await api.post('/session', {
        email,
        password,
      });

      if (!response.data.token) {
        return;
      }

      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      (await cookies()).set('session', response.data.token, {
        expires: expiresAt,
        path: '/',
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
      });

      console.log(response.data);
    } catch (err) {
      console.log(err);
      return;
    }

    redirect('/dashboard');
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image
          src={logoImg}
          alt="Logo Pizzaria Sousa"
          className={styles.logo}
        />

        <section className={styles.login}>
          <form action={handleLogin}>
            <input
              type="email"
              required
              name="email"
              placeholder="Digite seu e-mail..."
              className={styles.input}
            />
            <input
              type="password"
              required
              name="password"
              placeholder="**************"
              className={styles.input}
            />

            <button type="submit">Acessar</button>
          </form>

          <Link href="/signup" className={styles.registerText}>
            Não possui uma conta? Cadastre-se
          </Link>
        </section>
      </div>
    </>
  );
}
