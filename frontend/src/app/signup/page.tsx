import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.scss';
import logoImg from '/public/logo.svg';

export default function SignUp() {
  return (
    <>
      <div className={styles.containerCenter}>
        <Image
          src={logoImg}
          alt="Logo Pizzaria Sousa"
          className={styles.logo}
        />

        <section className={styles.login}>
          <h1>Crie sua Conta</h1>
          <form>
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

            <button type="submit">Acessar</button>
          </form>

          <Link href="/register" className={styles.registerText}>
            Já possui uma conta? Faço o login
          </Link>
        </section>
      </div>
    </>
  );
}
