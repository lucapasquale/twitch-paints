import * as pluralize from 'pluralize'
import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm'
import { snakeCase } from 'typeorm/util/StringUtils'

export class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  public tableName(className: string, customName: string): string {
    const snakeName = snakeCase(className)
    return customName ? customName : pluralize(snakeName)
  }

  public columnName(propertyName: string, customName: string): string {
    return customName ? customName : snakeCase(propertyName)
  }

  public relationName(propertyName: string): string {
    return snakeCase(propertyName)
  }

  public joinColumnName(relationName: string, referencedColumnName: string): string {
    const defaultValue = super.joinColumnName(relationName, referencedColumnName)
    return snakeCase(defaultValue)
  }
}
