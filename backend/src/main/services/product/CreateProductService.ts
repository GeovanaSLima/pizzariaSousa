import prismaClient from '@/prisma';

interface ProductRequest {
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
}

class CreateProductService {
  async execute({
    name,
    price,
    description,
    banner,
    category_id,
  }: ProductRequest) {
    const requiredFields = { name, price, description, banner, category_id };
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    const normalizedName = name.toLowerCase();
    const normalizedDescription = description.toLowerCase();

    const productAlreadyExists = await prismaClient.product.findFirst({
      where: { name: normalizedName },
    });

    if (productAlreadyExists) {
      throw new Error('Product already exists');
    }

    const product = await prismaClient.product.create({
      data: {
        name: normalizedName,
        price,
        description: normalizedDescription,
        banner,
        category_id,
      },
    });

    return product;
  }
}

export { CreateProductService };
