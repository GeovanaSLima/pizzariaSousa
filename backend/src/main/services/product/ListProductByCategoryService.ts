import prismaClient from '@/prisma';

interface ProductByCategoryRequest {
  category_id: string;
}

class ListProductByCategoryService {
  async execute({ category_id }: ProductByCategoryRequest) {
    const productsByCategory = await prismaClient.product.findMany({
      where: { category_id },
    });

    return productsByCategory;
  }
}

export { ListProductByCategoryService };
