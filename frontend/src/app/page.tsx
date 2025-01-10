import Link from 'next/link';
import styles from './page.module.scss';
import logoImg from '/public/logo.svg';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Pizzaria Sousa" width={500} />

        <section className={styles.login}>
          <form>
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
            Não possui uma conta? Cadastre-se
          </Link>
        </section>
      </div>
    </>
  );
}
