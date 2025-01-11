import styles from '@/app/page.module.scss';
import { Form } from '../_components/form';

export default function Product() {
  return (
    <main className={styles.categoryContainer}>
      <h1>Novo Produto</h1>

      <Form />
    </main>
  );
}
