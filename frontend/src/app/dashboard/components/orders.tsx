import { RefreshCw } from 'lucide-react';
import styles from './components.module.scss';

export function Orders() {
  return (
    <main className={styles.orderContainer}>
      <section className={styles.orderContainerHeader}>
        <h1>Pedidos</h1>

        <button>
          <RefreshCw size={24} color="#3fffa3" />
        </button>
      </section>

      <section className={styles.listOrders}>
        <button className={styles.orderItem}>
          <div className={styles.tag}></div>
          <span>Mesa 10</span>
        </button>

        <button className={styles.orderItem}>
          <div className={styles.tag}></div>
          <span>Mesa 13</span>
        </button>
      </section>
    </main>
  );
}
