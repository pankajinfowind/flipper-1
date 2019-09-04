import {Observable} from 'rxjs/internal/Observable';
import {PaginationResponse} from './pagination-response';

export interface PaginatedBackendResponse<T> extends Observable<PaginationResponse<T>> {}
