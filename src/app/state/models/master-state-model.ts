
import { Category } from '../../admin/master/categories/api/category';
import { Item } from '../../admin/master/items/api/item';
import { User } from '../../common/core/types/models/User';

export interface MasterStateModel {
    categories: Category[];
    items: Item[];
    loading: boolean;
    currentUser: User|null;
}

export const VIEW_MODE_KEY = 'bedesk.viewMode';
