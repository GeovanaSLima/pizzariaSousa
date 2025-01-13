'use client';

import { use } from 'react';
import { RefreshCw } from 'lucide-react';
import styles from './components.module.scss';
import { OrderProps } from '@/lib/order.type';
import { OrderDetail } from './modal';
import { OrderContext } from '@/providers/order';

interface Props {
  orders: OrderProps[];
}

export function Orders({ orders }: Props) {
  const { isOpen, onRequestOpen } = use(OrderContext);

  return (
    <>
      <main className={styles.orderContainer}>
        <section className={styles.orderContainerHeader}>
          <h1>Pedidos</h1>

          <button>
            <RefreshCw size={24} color="#3fffa3" />
          </button>
        </section>

        <section className={styles.listOrders}>
          {orders.map((order) => (
            <button
              key={order.id}
              className={styles.orderItem}
              onClick={async () => await onRequestOpen(order.id)}
            >
              <div className={styles.tag}></div>
              <span>Mesa {order.table}</span>
            </button>
          ))}
        </section>
      </main>

      {isOpen && <OrderDetail />}
    </>
  );
}
