import {AppConstants} from '../constants/AppConstants';
import {convertKeysToCamelCase} from '../core/api/DotaHeroAPI';

export enum DotaHeroAttribute {
  Strength = 'str',
  Agility = 'agi',
  Intelligence = 'int',
  Universal = 'all',
}

export const DotaHeroAttributeUtils = {
  getTitle(attribute: DotaHeroAttribute): string {
    switch (attribute) {
      case DotaHeroAttribute.Strength:
        return 'Strength';
      case DotaHeroAttribute.Agility:
        return 'Agility';
      case DotaHeroAttribute.Intelligence:
        return 'Intelligence';
      case DotaHeroAttribute.Universal:
        return 'Universal';
      default:
        return '';
    }
  },

  // getIcon(attribute: DotaHeroAttribute): any {
  //   switch (attribute) {
  //     case DotaHeroAttribute.Strength:
  //       return require('@assets/images/hero_strength.png');
  //     case DotaHeroAttribute.Agility:
  //       return require('@assets/images/hero_agility.png');
  //     case DotaHeroAttribute.Intelligence:
  //       return require('@assets/images/hero_intelligence.png');
  //     case DotaHeroAttribute.Universal:
  //       return require('@assets/images/hero_universal.png');
  //     default:
  //       return null;
  //   }
  // },
};

export enum DotaHeroAttackType {
  Melee = 'Melee',
  Ranged = 'Ranged',
}

export enum DotaHeroRole {
  Carry = 'Carry',
  Support = 'Support',
  Nuker = 'Nuker',
  Disabler = 'Disabler',
  Jungler = 'Jungler',
  Durable = 'Durable',
  Escape = 'Escape',
  Pusher = 'Pusher',
  Initiator = 'Initiator',
}

export interface DotaHero {
  id?: number;
  name?: string;
  localizedName?: string;
  primaryAttr?: DotaHeroAttribute;
  attackType?: DotaHeroAttackType;
  roles?: DotaHeroRole[];
  img?: string;
  icon?: string;
  baseHealth?: number;
  baseHealthRegen?: number;
  baseMana?: number;
  baseManaRegen?: number;
  baseArmor?: number;
  baseMr?: number;
  baseAttackMin?: number;
  baseAttackMax?: number;
  baseStr?: number;
  baseAgi?: number;
  baseInt?: number;
  strGain?: number;
  agiGain?: number;
  intGain?: number;
  attackRange?: number;
  projectileSpeed?: number;
  attackRate?: number;
  baseAttackTime?: number;
  attackPoint?: number;
  moveSpeed?: number;
  turnRate?: number;
  cmEnabled?: boolean;
  legs?: number;
  dayVision?: number;
  nightVision?: number;
}

export class DotaHeroModel {
  static fromJson(json: any): DotaHero {
    const camelCaseJson = convertKeysToCamelCase(json);

    return {
      ...camelCaseJson,
      primaryAttr: toEnumValue(DotaHeroAttribute, camelCaseJson.primaryAttr),
      attackType: toEnumValue(DotaHeroAttackType, camelCaseJson.attackType),
      roles: camelCaseJson.roles
        ? camelCaseJson.roles.map((role: string) =>
            toEnumValue(DotaHeroRole, role),
          )
        : [],
    };
  }

  static toJson(hero: DotaHero): any {
    return {
      ...hero,
      primaryAttr: hero.primaryAttr?.toString(),
      attackType: hero.attackType?.toString(),
      roles: hero.roles?.map(role => role.toString()),
    };
  }

  static potraitImageUrl(hero: DotaHero): string {
    const path = hero.img?.replace(
      '/apps/dota2/images/dota_react/heroes/',
      '/apps/dota2/videos/dota_react/heroes/renders/',
    );
    return `${AppConstants.imageBaseUrl}${path ?? ''}`;
  }

  static potraitVideoUrl(hero: DotaHero): string {
    return this.potraitImageUrl(hero).replace('.png', '.webm');
  }

  static imageUrl(hero: DotaHero): string {
    return `${AppConstants.imageBaseUrl}${hero.img ?? ''}`;
  }

  static health(hero: DotaHero): number {
    return (hero.baseHealth ?? 0) + (hero.baseStr ?? 0) * 20;
  }

  static healthRegen(hero: DotaHero): number {
    return (hero.baseHealthRegen ?? 0) + (hero.baseStr ?? 0) * 0.1;
  }

  static mana(hero: DotaHero): number {
    return (hero.baseMana ?? 0) + (hero.baseInt ?? 0) * 12;
  }

  static manaRegen(hero: DotaHero): number {
    return (hero.baseManaRegen ?? 0) + (hero.baseInt ?? 0) * 0.05;
  }

  static armor(hero: DotaHero): number {
    return (hero.baseArmor ?? 0) + (hero.baseAgi ?? 0) * 0.167;
  }

  static attackMin(hero: DotaHero): number {
    switch (hero.primaryAttr) {
      case DotaHeroAttribute.Strength:
        return (hero.baseAttackMin ?? 0) + (hero.baseStr ?? 0);
      case DotaHeroAttribute.Agility:
        return (hero.baseAttackMin ?? 0) + (hero.baseAgi ?? 0);
      case DotaHeroAttribute.Intelligence:
        return (hero.baseAttackMin ?? 0) + (hero.baseInt ?? 0);
      case DotaHeroAttribute.Universal:
        return (
          (hero.baseAttackMin ?? 0) +
          (hero.baseStr ?? 0) * 0.6 +
          (hero.baseAgi ?? 0) * 0.6 +
          (hero.baseInt ?? 0) * 0.6
        );
      default:
        return hero.baseAttackMin ?? 0;
    }
  }

  static attackMax(hero: DotaHero): number {
    switch (hero.primaryAttr) {
      case DotaHeroAttribute.Strength:
        return (hero.baseAttackMax ?? 0) + (hero.baseStr ?? 0);
      case DotaHeroAttribute.Agility:
        return (hero.baseAttackMax ?? 0) + (hero.baseAgi ?? 0);
      case DotaHeroAttribute.Intelligence:
        return (hero.baseAttackMax ?? 0) + (hero.baseInt ?? 0);
      case DotaHeroAttribute.Universal:
        return (
          (hero.baseAttackMax ?? 0) +
          (hero.baseStr ?? 0) * 0.6 +
          (hero.baseAgi ?? 0) * 0.6 +
          (hero.baseInt ?? 0) * 0.6
        );
      default:
        return hero.baseAttackMax ?? 0;
    }
  }
}

function toEnumValue<T extends object>(
  enumObj: T,
  str: string | null,
): T[keyof T] | null {
  if (str == null) return null;
  const enumValues = Object.values(enumObj) as T[keyof T][];
  if (enumValues.includes(str as T[keyof T])) {
    return str as T[keyof T];
  }
  return null;
}
