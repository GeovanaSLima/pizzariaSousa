'use client';

import { UploadCloud } from 'lucide-react';
import styles from '@/app/page.module.scss';
import { Button } from '@/components/button';
import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';

interface CategoryProps {
  id: string;
  name: string;
}

interface Props {
  categories: CategoryProps[];
}

export function Form({ categories }: Props) {
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

  async function handleRegisterProduct(formData: FormData) {
    const categoryIndex = formData.get('category');
    const name = formData.get('name');
    const description = formData.get('description');
    const price = formData.get('price');

    if (!categoryIndex || !name || !description || !price || !image) return;

    const data = new FormData();

    data.append('name', name);
    data.append('price', price);
    data.append('description', description);
    data.append('category_id', categories[Number(categoryIndex)].id);
    data.append('file', image);

    const token = await getCookieClient();

    await api
      .post('/product', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('Produto cadastrado com sucesso');
  }

  return (
    <main className={styles.categoryContainer}>
      <h1>Novo Produto</h1>
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
          {categories.map((category, index) => (
            <option key={category.id} value={index}>
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </option>
          ))}
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
          name="price"
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
    </main>
  );
}
