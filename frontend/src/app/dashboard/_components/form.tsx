'use client';

import { UploadCloud } from 'lucide-react';
import styles from '@/app/page.module.scss';
import { Button } from '@/components/button';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';

export function Form() {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState('');

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type !== 'image/jpeg' && image.type !== 'image/png') {
        console.log('Tipo de arquivo não suportado');
        return;
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  }

  async function handleRegisterProduct() {
    alert('test');
  }

  return (
    <form action={handleRegisterProduct} className={styles.categoryForm}>
      <label className={styles.labelImage}>
        <span>
          <UploadCloud size={34} color="#fff" />
        </span>

        <input
          type="file"
          accept="image/png, image/jpeg"
          required
          onChange={handleFile}
        />

        {previewImage && (
          <Image
            alt="Preview da Imagem"
            src={previewImage}
            className={styles.productPreview}
            fill={true}
            quality={100}
            priority={true}
          />
        )}
      </label>

      <select name="category" className={styles.input}>
        <option key={1} value={1}>
          Teste
        </option>
      </select>

      <input
        type="text"
        name="name"
        placeholder="Digite o nome do produto..."
        required
        className={styles.input}
      />

      <input
        type="text"
        name="name"
        placeholder="Preço do produto..."
        required
        className={styles.input}
      />

      <textarea
        name="description"
        placeholder="Digite a descrição do produto..."
        required
        className={styles.input}
      />
      <Button message="Cadastrar Produto" />
    </form>
  );
}
