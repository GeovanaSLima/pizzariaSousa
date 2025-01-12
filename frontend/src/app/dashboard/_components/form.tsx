'use client';

import { UploadCloud } from 'lucide-react';
import styles from '@/app/page.module.scss';
import { Button } from '@/components/button';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
import { toast, Toaster } from 'sonner';

interface CategoryProps {
  id: string;
  name: string;
}

interface Props {
  categories: CategoryProps[];
}

export function Form({ categories }: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState('');

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        toast.warning('Tipo de arquivo não suportado.');
        return;
      }

      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }

  async function handleRegisterProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const categoryIndex = formData.get('category');
    const name = formData.get('name');
    const description = formData.get('description');
    const price = formData.get('price');

    if (!categoryIndex || !name || !description || !price || !image) {
      toast.warning('Preencha todos os campos!');
      return;
    }

    const data = new FormData();
    data.append('name', name as string);
    data.append('price', price as string);
    data.append('description', description as string);
    data.append('category_id', categories[Number(categoryIndex)].id);
    data.append('file', image);

    try {
      const token = await getCookieClient();

      await api.post('/product', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Produto cadastrado com sucesso!');
      form.reset();
      setImage(null);
      setPreviewImage('');
    } catch (error) {
      toast.error('Erro ao cadastrar produto.');
    }
  }

  return (
    <main className={styles.categoryContainer}>
      <h1>Novo Produto</h1>
      <form className={styles.categoryForm} onSubmit={handleRegisterProduct}>
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={34} color="#fff" />
          </span>

          <input
            type="file"
            accept="image/png, image/jpeg"
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
              {category.name
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Digite o nome do produto..."
          className={styles.input}
        />

        <input
          type="text"
          name="price"
          placeholder="Preço do produto..."
          className={styles.input}
        />

        <textarea
          name="description"
          placeholder="Digite a descrição do produto..."
          className={styles.input}
        />
        <Button message="Cadastrar Produto" />
      </form>
    </main>
  );
}
