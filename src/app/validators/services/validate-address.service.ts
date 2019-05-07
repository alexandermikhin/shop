import { Injectable } from '@angular/core';
import { JsonServerClientService } from 'src/app/core/services/json-server-client.service';

@Injectable()
export class ValidateAddressService {
  constructor(private jsonServerClient: JsonServerClientService) {}

  async validate(address: string): Promise<boolean> {
    const settings = await this.jsonServerClient
      .get<string[]>('settings')
      .toPromise()
      .catch(this.handleError);

    const addresses: string[] = settings.addresses;

    return addresses.includes(address);
  }

  private handleError(error: { message?: string }): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
