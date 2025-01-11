import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.scss';
import logoImg from '/public/logo.svg';
import { api } from '@/services/api';
import { redirect } from 'next/navigation';
import { Button } from '@/components/button';

export default function SignUp() {
  async function handleRegister(formData: FormData) {
    'use server';

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    if (name === '' || email === '' || password === '') {
      console.log('Preencha todos os campos');
      return;
    }

    try {
      await api.post('/users', {
        name,
        email,
        password,
      });
    } catch (err) {
      console.log(err);
    }

    redirect('/');
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
          <h1>Criando sua Conta</h1>
          <form action={handleRegister}>
            <input
              type="text"
              required
              name="name"
              placeholder="Digite seu nome..."
              className={styles.input}
            />
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

            <Button message="Cadastrar" />
          </form>

          <Link href="/register" className={styles.registerText}>
            Já possui uma conta? Faço o login
          </Link>
        </section>
      </div>
    </>
  );
}
