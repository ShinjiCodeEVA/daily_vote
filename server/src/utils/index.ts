export function snakeToCamel(data: any) {
    const camel: any = {};

    for (const key in data) {
        let camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
        camel[camelKey] = data[key];
       
    }

    return camel;
}