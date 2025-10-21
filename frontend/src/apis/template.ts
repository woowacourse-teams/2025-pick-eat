import { joinAsPath } from '@utils/createUrl';

import { FoodCategory } from '@constants/foodCategory';

import { useQuery } from '@tanstack/react-query';

import { apiClient, BASE_URL_VERSION } from './apiClient';

type TemplateResponse = {
  id: number;
  name: string;
  category: FoodCategory;
  pictureUrl: string;
  roadAddressName: string;
  tags: string[];
  wishListId: number;
  placeUrl: string | null;
};

type TemplateList = {
  id: number;
  name: string;
  category: FoodCategory;
  pictureUrls: string[];
  roadAddressName: string;
  tags: string[];
  wishlistId: number;
  placeUrl: string | null;
};

const convertResponseToTemplateList = (data: TemplateResponse[]) => {
  return data.map(d => ({
    id: d.id,
    name: d.name,
    category: d.category,
    pictureUrls: [d.pictureUrl],
    roadAddressName: d.roadAddressName,
    tags: d.tags,
    wishlistId: d.wishListId,
    placeUrl: d.placeUrl ? d.placeUrl.toString() : null,
  }));
};

const BASE_PATH = 'templates';

const template = {
  getTemplate: async (templateId: number): Promise<TemplateList[]> => {
    const url = joinAsPath(
      BASE_URL_VERSION[1],
      BASE_PATH,
      `${templateId}`,
      'wishes'
    );
    const response = await apiClient.get<TemplateResponse[]>(url);
    if (response) return convertResponseToTemplateList(response);
    return [];
  },
};

export const templateQuery = {
  useGetTemplate: (templateId: number) => {
    return useQuery<TemplateList[]>({
      queryKey: ['templates', templateId],
      queryFn: () => template.getTemplate(templateId),
      staleTime: Infinity,
      gcTime: 1000 * 60 * 60 * 24,
    });
  },
};
