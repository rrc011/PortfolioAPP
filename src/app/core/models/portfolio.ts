export interface IPortfolioDto {
	_id: string;
	title: string;
	description: string;
	url: string;
	img: string;
	userId: string;
}

export class PortfolioDto implements IPortfolioDto {
	_id: string;
	title!: string;
	description!: string;
	url!: string;
	img!: string;
	userId!: string;

	constructor(data?: IPortfolioDto) {
		if (data) {
			for (var property in data) {
				if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
			}
		}
	}

	init(_data?: any) {
		if (_data) {
			this._id = _data['_id'];
			this.title = _data['title'];
			this.description = _data['description'];
			this.url = _data['url'];
			this.img = _data['img'];
			this.userId = _data['userId'];
		}
	}

	static fromJS(data: any): PortfolioDto {
		data = typeof data === 'object' ? data : {};
		let result = new PortfolioDto();
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
		data = typeof data === 'object' ? data : {};
		data['_id'] = this._id;
		data['title'] = this.title;
		data['description'] = this.description;
		data['url'] = this.url;
		data['img'] = this.img;
		data['userId'] = this.userId;
		return data;
	}

	clone(): PortfolioDto {
		const json = this.toJSON();
		let result = new PortfolioDto();
		result.init(json);
		return result;
	}
}
