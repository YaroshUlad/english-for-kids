import {instance} from '../../api/config/api-config';
import {FullCategoryType, ResponseType} from './categories-reducer';

export const categoriesApi = {
	fetchCategories() {
		return instance.get<ResponseType>('');
	},
	fetchWords(id: number) {
		return instance.get<FullCategoryType>(`/${id}`);
	}
};