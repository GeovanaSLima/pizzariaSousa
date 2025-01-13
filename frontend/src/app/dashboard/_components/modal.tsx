import { X } from 'lucide-react';
import styles from './components.module.scss';
import { OrderContext } from '@/providers/order';
import { use } from 'react';
import { calculateTotal, capitalize, wordToWordCapitalize } from '@/lib/utils';

export function OrderDetail() {
  const { onRequestClose, order, finishOrder } = use(OrderContext);

  async function handlCloseOrder() {
    await finishOrder(order[0].order.id);
  }

  return (
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <button
          className={styles.dialogBack}
          aria-label="Fechar"
          onClick={onRequestClose}
        >
          <X size={20} color="#fff" />
        </button>

        <article className={styles.contentContainer}>
          <h2>Detalhes do Pedido</h2>

          <span className={styles.table}>
            Mesa <b>{order[0].order.table}</b>
          </span>

          {order[0].order.name && (
            <span className={styles.name}>
              Nome da mesa: <b>{order[0].order.name}</b>
            </span>
          )}

          {order.map((item) => (
            <section className={styles.modalItem} key={item.id}>
              <span>
                Qtd: {item.amount} -{' '}
                <b>{wordToWordCapitalize(item.product.name)}</b> - R${' '}
                {item.product.price}
              </span>
              <span className={styles.modalDescription}>
                {capitalize(item.product.description)}
              </span>
            </section>
          ))}

          <h3 className={styles.total}>
            Valor Total: R$ {calculateTotal(order)}
          </h3>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className={styles.orderButton} onClick={handlCloseOrder}>
              Concluir Pedido
            </button>
          </div>
        </article>
      </section>
    </dialog>
  );
}
