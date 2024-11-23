import {DotaHero, DotaHeroModel} from '../../models/DotaHero';
import {APIClient} from '../APIClient';

export class DotaHeroAPI {
  public static async getHeroStats(): Promise<DotaHero[]> {
    const apiPath = '/api/heroStats';
    const response = await APIClient.instance.get(apiPath);
    return response.data.map((heroData: any) =>
      DotaHeroModel.fromJson(heroData),
    );
  }
}

export function convertKeysToCamelCase<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToCamelCase(item)) as unknown as T;
  } else if (obj !== null && obj !== undefined && typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const camelKey = toCamelCase(key);
        newObj[camelKey] = convertKeysToCamelCase(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}

function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (match, p1) => p1.toUpperCase());
}
