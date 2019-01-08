import {Observable} from 'rxjs';

type Generic<T extends {}> = T & {
    status: any
};

export interface BackendResponse<T> extends Observable<Generic<T>> {}
