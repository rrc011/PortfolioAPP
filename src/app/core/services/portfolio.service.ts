import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseApiService} from '@helpers/base-api-service';
import {environment} from 'src/environments/environment';
import {PortfolioDto} from '../../core/models/portfolio';
import {endpoints} from '../constants/endpoints.constants';
import {Responses} from '../models/responses';
import {SingleResponse} from '../models/single-response';

@Injectable({
	providedIn: 'root',
})
export class PortfolioService extends BaseApiService<PortfolioDto> {
	constructor(public http: HttpClient) {
		super(http);
	}

	getDefaultService<PortfolioDto>(): Promise<PortfolioDto> {
		return this.get<PortfolioDto>(
			`${environment.apiUrl}${endpoints.portfolio}/getAllWithoutPagination/${endpoints.default_user}`
		).toPromise();
	}

	getAll(page: number, size: number): Promise<SingleResponse> {
		return this.get<SingleResponse>(
			`${environment.apiUrl}${endpoints.portfolio}/getAll?size=${size}&page=${page}`
		).toPromise();
	}

	getAllWithoutPagination(userId: string): Promise<SingleResponse> {
		return this.get<SingleResponse>(
			`${environment.apiUrl}${endpoints.portfolio}/getAllWithoutPagination/${userId}`
		).toPromise();
	}

	create(model: PortfolioDto): Promise<Responses[]> {
		return this.post(`${environment.apiUrl}${endpoints.portfolio}`, model).toPromise();
	}

	update(id: string, model: PortfolioDto): Promise<Responses[]> {
		return this.put(`${environment.apiUrl}${endpoints.portfolio}/${id}`, model).toPromise();
	}

	hardDelete(id: string): Promise<Responses[]> {
		return this.delete(`${environment.apiUrl}${endpoints.portfolio}/${id}`).toPromise();
	}
}
