import prismaClient from '../../prisma';

interface CategoryRequest {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    if (name === '') {
      throw new Error('Category Name is required');
    }

    const normalizedName = name.toLowerCase();

    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: {
        name: normalizedName,
      },
    });

    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }

    const category = await prismaClient.category.create({
      data: {
        name: normalizedName,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return category;
  }
}

export { CreateCategoryService };
