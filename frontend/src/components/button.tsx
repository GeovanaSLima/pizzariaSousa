'use client';

import styles from './components.module.scss';
import { useFormStatus } from 'react-dom';

export function Button({ message }: { message: string }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={styles.button}>
      {pending ? 'Carregando...' : message}
    </button>
  );
}
