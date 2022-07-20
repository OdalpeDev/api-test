import { Injectable } from '@nestjs/common';
import { Iuser } from 'src/core/domain/users/user.interface';

@Injectable()
export abstract class IusersDbDriver {
  /**
   *
   * @param filter
   */
  abstract getTotal(filter: any): Promise<number>;

  /**
   *
   * @param page
   * @param limit
   * @param filter
   * @param projection
   */
  abstract getAll(
    page: number,
    limit: number,
    filter: any,
    projection?: any,
    sort?: any,
  ): Promise<any[]>;

  /**
   *
   * @param filter
   * @param projection
   */
  abstract getByEmail(email: string): Promise<Iuser>;

  /**
   *
   * @param data
   */
  abstract register(data: any): Promise<any>;

  /**
   * @param id
   * @param data
   */
  abstract update(id: any, data: any): Promise<any>;
}
