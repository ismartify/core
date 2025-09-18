import { ISmartifyArkStore } from "./core";

export class ISmartifyArkJsonSchema extends ISmartifyArkStore {
    constructor(arktype: any) {
        super(arktype);
    }

    /**
     * 将 arktype schema 转换为 JSON Schema
     * 使用 arktype 原生的 toJsonSchema() 方法
     * @param key 可选的特定键，如果不提供则转换所有定义的 schema
     * @param options 可选的转换选项，传递给 arktype 的 toJsonSchema 方法
     * @returns JSON Schema 对象
     */
    toJSONSchema(key?: string, options?: any): any {
        const { schema: schemas } = this.raw();
        
        if (key) {
            // 转换特定键的 schema
            const arkSchema = schemas.get(key);
            if (!arkSchema) {
                throw new Error(`Schema not found for key: ${key}`);
            }
            
            // 使用 arktype 原生的 toJsonSchema 方法
            try {
                return arkSchema.toJsonSchema(options);
            } catch (error) {
                console.warn(`Failed to convert schema for key "${key}" using arktype native method:`, error);
                // 如果原生方法失败，返回基础类型信息
                return {
                    type: "string",
                    description: `Schema for ${key} (conversion failed)`
                };
            }
        } else {
            // 转换所有 schema 为嵌套对象结构
            const jsonSchema: any = {
                type: "object",
                properties: {},
                additionalProperties: false
            };

            for (const [schemaKey, arkSchema] of schemas.entries()) {
                try {
                    const keyPath = schemaKey.split('.');
                    const schemaResult = arkSchema.toJsonSchema(options);
                    this.#setNestedProperty(jsonSchema.properties, keyPath, schemaResult);
                } catch (error) {
                    console.warn(`Failed to convert schema for key "${schemaKey}":`, error);
                    // 如果转换失败，设置一个基础的 schema
                    const keyPath = schemaKey.split('.');
                    this.#setNestedProperty(jsonSchema.properties, keyPath, {
                        type: "string",
                        description: `Schema for ${schemaKey} (conversion failed)`
                    });
                }
            }

            return jsonSchema;
        }
    }

    /**
     * 在嵌套对象中设置属性
     * @private
     */
    #setNestedProperty(obj: any, path: string[], value: any): void {
        let current = obj;
        
        for (let i = 0; i < path.length - 1; i++) {
            const key = path[i];
            if (!current[key]) {
                current[key] = {
                    type: "object",
                    properties: {},
                    additionalProperties: false
                };
            }
            current = current[key].properties;
        }
        
        current[path[path.length - 1]] = value;
    }

    /**
     * 创建复合 schema 并转换为 JSON Schema
     * @param schemaDefinition arktype schema 定义对象
     * @param options 可选的转换选项
     * @returns JSON Schema 对象
     */
    createCompositeSchema(schemaDefinition: any, options?: any): any {
        try {
            const arktype = this.getArkType();
            const compositeSchema = arktype(schemaDefinition);
            return compositeSchema.toJsonSchema(options);
        } catch (error: any) {
            console.error('Failed to create composite schema:', error);
            throw new Error(`Failed to create composite schema: ${error?.message || 'Unknown error'}`);
        }
    }

    /**
     * 获取完整的 JSON Schema，包含元数据
     * @param title 可选的 schema 标题
     * @param description 可选的 schema 描述
     * @param options 可选的转换选项
     * @returns 完整的 JSON Schema 对象
     */
    getFullJSONSchema(title?: string, description?: string, options?: any): any {
        const schema = this.toJSONSchema(undefined, options);
        
        return {
            $schema: "https://json-schema.org/draft/2020-12/schema",
            $id: "https://ismartify.com/schemas/arkstore",
            title: title || "ISmartify ArkStore Schema",
            description: description || "Generated JSON Schema from ISmartify ArkStore definitions",
            ...schema
        };
    }

    /**
     * 导出 JSON Schema 为字符串
     * @param pretty 是否格式化输出
     * @param options 可选的转换选项
     * @returns JSON Schema 字符串
     */
    exportJSONSchema(pretty: boolean = true, options?: any): string {
        const schema = this.getFullJSONSchema(undefined, undefined, options);
        return pretty ? JSON.stringify(schema, null, 2) : JSON.stringify(schema);
    }

}
